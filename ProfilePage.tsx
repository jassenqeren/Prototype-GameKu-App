import { useState } from 'react';
import type { Page } from '../App';

interface Props { navigate: (p: Page) => void; goBack: () => void; }

export default function ProfilePage({ navigate, goBack }: Props) {
  const [tab, setTab] = useState<'profil' | 'pengaturan'>('profil');

  const stats = [
    { label: 'Transaksi', value: '24', color: '#8B5CF6' },
    { label: 'Terjual', value: '7', color: '#06B6D4' },
    { label: 'Rating', value: '4.9', color: '#F59E0B' },
  ];

  const menuItems = [
    { icon: '👤', label: 'Edit Profil', desc: 'Ubah nama, foto, dan info', color: '#8B5CF6' },
    { icon: '🔔', label: 'Notifikasi', desc: 'Kelola pengaturan notifikasi', color: '#06B6D4' },
    { icon: '🔒', label: 'Keamanan', desc: 'Password, 2FA, PIN', color: '#22C55E' },
    { icon: '💳', label: 'Metode Pembayaran', desc: 'Kelola dompet dan bank', color: '#F59E0B' },
    { icon: '🎟️', label: 'Voucher & Promo', desc: '3 voucher tersedia', color: '#EF4444' },
    { icon: '📋', label: 'Syarat & Ketentuan', desc: 'Legal dan kebijakan privasi', color: '#6B7280' },
    { icon: '🎧', label: 'Bantuan & Support', desc: 'FAQ dan live chat CS', color: '#8B5CF6' },
  ];

  return (
    <div className="flex flex-col pb-24" style={{ minHeight: '812px', background: '#080810' }}>
      {/* Header BG */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #1A0A2E 0%, #0A1020 100%)' }} />
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-20 blur-3xl"
          style={{ background: '#8B5CF6', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-15 blur-3xl"
          style={{ background: '#06B6D4', transform: 'translate(-30%, 30%)' }} />

        <div className="relative px-5 pt-14 pb-8">
          {/* Avatar + name */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl overflow-hidden neon-purple" style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}>
                <div className="w-full h-full flex items-center justify-center text-4xl font-black text-white"
                  style={{ fontFamily: 'Orbitron' }}>A</div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#22C55E] border-2 border-[#080810] flex items-center justify-center">
                <span style={{ fontSize: 10 }}>✓</span>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-black text-white" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>Ahmad Rizky</h2>
              <p className="text-[#8888A8] text-sm">@ahmadrizky_gamer</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded-lg text-xs font-bold"
                  style={{ background: 'rgba(139,92,246,0.2)', color: '#8B5CF6', fontFamily: 'Rajdhani' }}>
                  ⭐ TRUSTED SELLER
                </span>
              </div>
            </div>
          </div>

          {/* Saldo */}
          <div className="gradient-card rounded-2xl p-4 glow-border-purple mb-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[#6B6B8A] text-xs" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>SALDO GAMEKU</p>
                <p className="text-2xl font-black text-white" style={{ fontFamily: 'Rajdhani' }}>Rp 250.000</p>
              </div>
              <button className="px-4 py-2.5 rounded-xl font-bold text-white text-sm gradient-primary"
                style={{ fontFamily: 'Rajdhani', boxShadow: '0 0 15px rgba(139,92,246,0.4)' }}>
                Top Up
              </button>
            </div>
            <div className="flex gap-2 pt-3 border-t border-[#1E1E35]">
              <button className="flex-1 py-2 rounded-xl border border-[#1E1E35] text-[#8888A8] text-sm font-semibold"
                style={{ fontFamily: 'Rajdhani', background: '#080810' }}>
                💸 Tarik Dana
              </button>
              <button className="flex-1 py-2 rounded-xl border border-[#1E1E35] text-[#8888A8] text-sm font-semibold"
                style={{ fontFamily: 'Rajdhani', background: '#080810' }}>
                📊 Mutasi
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map(s => (
              <div key={s.label} className="gradient-card rounded-xl p-3 text-center"
                style={{ border: `1px solid ${s.color}33` }}>
                <p className="text-xl font-black" style={{ color: s.color, fontFamily: 'Orbitron', fontSize: 20 }}>{s.value}</p>
                <p className="text-[10px] text-[#6B6B8A] mt-0.5" style={{ fontFamily: 'Rajdhani' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab */}
      <div className="px-5 mt-4 mb-4">
        <div className="flex bg-[#10101C] rounded-xl p-1">
          {(['profil', 'pengaturan'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all capitalize"
              style={{
                fontFamily: 'Rajdhani', letterSpacing: '1px',
                background: tab === t ? '#8B5CF6' : 'transparent',
                color: tab === t ? 'white' : '#6B6B8A',
                boxShadow: tab === t ? '0 0 15px rgba(139,92,246,0.4)' : 'none'
              }}>
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {tab === 'profil' && (
        <div className="px-5 overflow-y-auto">
          {/* Recent Transactions */}
          <p className="text-[#6B6B8A] text-xs font-semibold mb-3" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>TRANSAKSI TERBARU</p>
          <div className="flex flex-col gap-2 mb-4">
            {[
              { emoji: '🔥', name: '1060 Diamond FF', price: 'Rp 140.000', date: '17 Sep', status: 'berhasil', color: '#22C55E' },
              { emoji: '⚔️', name: '570 Diamond ML', price: 'Rp 90.000', date: '16 Sep', status: 'diproses', color: '#06B6D4' },
            ].map(t => (
              <div key={t.name} className="gradient-card rounded-xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-[#1A1A2E]">{t.emoji}</div>
                <div className="flex-1">
                  <p className="text-white text-sm font-semibold" style={{ fontFamily: 'Rajdhani' }}>{t.name}</p>
                  <p className="text-[#6B6B8A] text-xs">{t.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm" style={{ color: '#8B5CF6', fontFamily: 'Rajdhani' }}>{t.price}</p>
                  <span className="text-xs font-semibold" style={{ color: t.color }}>{t.status}</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('transactions')}
            className="w-full py-3 rounded-xl border border-[#1E1E35] text-[#8888A8] text-sm font-bold mb-4"
            style={{ fontFamily: 'Rajdhani', background: '#10101C' }}>
            LIHAT SEMUA RIWAYAT
          </button>

          {/* Voucher */}
          <p className="text-[#6B6B8A] text-xs font-semibold mb-3" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>VOUCHERKU</p>
          <div className="gradient-card rounded-xl p-4 border border-[#F59E0B33] mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#F59E0B] font-bold" style={{ fontFamily: 'Rajdhani' }}>🎟️ GAMEKU50</p>
                <p className="text-[#8888A8] text-xs mt-0.5">Hemat Rp 15.000 untuk transaksi min. Rp 100K</p>
                <p className="text-[#4A4A6A] text-xs mt-1">Berlaku hingga 30 Sep 2026</p>
              </div>
              <button className="px-3 py-2 rounded-xl text-xs font-bold"
                style={{ background: 'rgba(245,158,11,0.2)', color: '#F59E0B', fontFamily: 'Rajdhani', border: '1px solid rgba(245,158,11,0.4)' }}>
                PAKAI
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === 'pengaturan' && (
        <div className="px-5 flex flex-col gap-2 overflow-y-auto">
          {menuItems.map(item => (
            <button key={item.label}
              className="gradient-card rounded-xl p-4 flex items-center gap-4 text-left transition-all active:scale-98 w-full">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                style={{ background: `${item.color}22` }}>
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="font-bold text-white text-sm" style={{ fontFamily: 'Rajdhani' }}>{item.label}</p>
                <p className="text-[#6B6B8A] text-xs mt-0.5">{item.desc}</p>
              </div>
              <span className="text-[#4A4A6A]">›</span>
            </button>
          ))}

          <button className="w-full mt-4 py-4 rounded-xl font-bold border border-[#EF444444] text-[#EF4444] transition-all active:scale-95"
            style={{ fontFamily: 'Rajdhani', background: 'rgba(239,68,68,0.1)', letterSpacing: '1px' }}>
            🚪 KELUAR
          </button>

          <div className="text-center py-4">
            <p className="text-[#3A3A5A] text-xs" style={{ fontFamily: 'Orbitron', fontSize: 10 }}>GAMEKU v2.0.1</p>
            <p className="text-[#3A3A5A] text-xs mt-1">© 2026 GameKu Indonesia</p>
          </div>
        </div>
      )}
    </div>
  );
}
