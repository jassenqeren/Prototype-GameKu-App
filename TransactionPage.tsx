import { useState } from 'react';
import type { Page } from '../App';

interface Props { navigate: (p: Page) => void; goBack: () => void; }

type TStatus = 'berhasil' | 'diproses' | 'pending' | 'gagal';

const transactions = [
  { id: '#GK-8821', game: 'Free Fire', item: '1060 Diamond FF', price: 'Rp 140.000', date: '17 Sep 2026', status: 'berhasil' as TStatus, emoji: '🔥' },
  { id: '#GK-8820', game: 'Mobile Legends', item: '570 Diamond ML', price: 'Rp 90.000', date: '16 Sep 2026', status: 'diproses' as TStatus, emoji: '⚔️' },
  { id: '#GK-8819', game: 'Roblox', item: '800 Robux', price: 'Rp 113.000', date: '15 Sep 2026', status: 'berhasil' as TStatus, emoji: '🟠' },
  { id: '#GK-8818', game: 'Marketplace', item: 'Akun ML Season 30 - Epic', price: 'Rp 450.000', date: '14 Sep 2026', status: 'pending' as TStatus, emoji: '🛒' },
  { id: '#GK-8817', game: 'Growtopia', item: '10 Diamond Lock', price: 'Rp 55.000', date: '12 Sep 2026', status: 'berhasil' as TStatus, emoji: '🌿' },
  { id: '#GK-8816', game: 'PUBG Mobile', item: '600 UC', price: 'Rp 99.000', date: '10 Sep 2026', status: 'gagal' as TStatus, emoji: '🎯' },
];

const statusConfig: Record<TStatus, { label: string; color: string; bg: string }> = {
  berhasil: { label: 'BERHASIL', color: '#22C55E', bg: 'rgba(34,197,94,0.15)' },
  diproses: { label: 'DIPROSES', color: '#06B6D4', bg: 'rgba(6,182,212,0.15)' },
  pending: { label: 'PENDING', color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  gagal: { label: 'GAGAL', color: '#EF4444', bg: 'rgba(239,68,68,0.15)' },
};

const filters: TStatus[] = ['berhasil', 'diproses', 'pending', 'gagal'];

export default function TransactionPage({ navigate, goBack }: Props) {
  const [filter, setFilter] = useState<TStatus | 'semua'>('semua');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === 'semua' ? transactions : transactions.filter(t => t.status === filter);

  return (
    <div className="flex flex-col pb-24" style={{ minHeight: '812px', background: '#080810' }}>
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-xl font-bold text-white mb-5" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>RIWAYAT TRANSAKSI</h1>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { label: 'Berhasil', count: 3, color: '#22C55E' },
            { label: 'Diproses', count: 1, color: '#06B6D4' },
            { label: 'Gagal', count: 1, color: '#EF4444' },
          ].map(s => (
            <div key={s.label} className="gradient-card rounded-xl p-3 text-center"
              style={{ border: `1px solid ${s.color}33` }}>
              <p className="text-2xl font-black" style={{ color: s.color, fontFamily: 'Orbitron' }}>{s.count}</p>
              <p className="text-[10px] text-[#6B6B8A]" style={{ fontFamily: 'Rajdhani' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {(['semua', ...filters] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-xl text-xs font-bold flex-shrink-0 transition-all"
              style={{
                fontFamily: 'Rajdhani',
                background: filter === f ? (f === 'semua' ? '#8B5CF6' : statusConfig[f as TStatus]?.color || '#8B5CF6') : '#10101C',
                color: filter === f ? 'white' : '#6B6B8A',
                border: `1px solid ${filter === f ? 'transparent' : '#1E1E35'}`,
                letterSpacing: '0.5px'
              }}>
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction list */}
      <div className="px-5 flex flex-col gap-3 overflow-y-auto">
        {filtered.map(tx => {
          const sc = statusConfig[tx.status];
          const isOpen = expanded === tx.id;
          return (
            <button key={tx.id} onClick={() => setExpanded(isOpen ? null : tx.id)}
              className="gradient-card rounded-2xl p-4 text-left transition-all active:scale-98 w-full"
              style={{ border: `1px solid ${isOpen ? sc.color + '44' : '#1E1E35'}` }}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: sc.bg }}>
                  {tx.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-white text-sm leading-tight" style={{ fontFamily: 'Rajdhani' }}>{tx.item}</p>
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold flex-shrink-0"
                      style={{ background: sc.bg, color: sc.color, fontFamily: 'Rajdhani' }}>
                      {sc.label}
                    </span>
                  </div>
                  <p className="text-[#6B6B8A] text-xs">{tx.game}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-[#4A4A6A]">{tx.date}</p>
                    <p className="font-black text-sm" style={{ color: '#8B5CF6', fontFamily: 'Orbitron', fontSize: 12 }}>{tx.price}</p>
                  </div>
                </div>
              </div>

              {isOpen && (
                <div className="mt-4 pt-4 border-t border-[#1E1E35]">
                  {[
                    ['ID Transaksi', tx.id],
                    ['Status', statusConfig[tx.status].label],
                    ['Harga', tx.price],
                    ['Tanggal', tx.date],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between py-1.5">
                      <span className="text-[#6B6B8A] text-xs">{k}</span>
                      <span className="text-white text-xs font-semibold" style={{ fontFamily: 'Rajdhani' }}>{v}</span>
                    </div>
                  ))}
                  {tx.status === 'berhasil' && (
                    <button className="w-full mt-3 py-2.5 rounded-xl text-sm font-bold border border-[#8B5CF644] text-[#8B5CF6] bg-[#8B5CF611]"
                      style={{ fontFamily: 'Rajdhani' }}>
                      UNDUH INVOICE
                    </button>
                  )}
                  {tx.status === 'gagal' && (
                    <button onClick={(e) => { e.stopPropagation(); navigate('topup'); }}
                      className="w-full mt-3 py-2.5 rounded-xl text-sm font-bold text-white gradient-primary"
                      style={{ fontFamily: 'Rajdhani' }}>
                      COBA LAGI
                    </button>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
