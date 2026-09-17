import { useState } from 'react';
import type { Page } from '../App';

interface Props { navigate: (p: Page) => void; goBack: () => void; }

const listings = [
  {
    id: 1, type: 'akun', game: 'Mobile Legends', title: 'Akun ML Season 30 — Epic Rank', price: 'Rp 450.000',
    seller: 'BossML_Jaya', rating: 4.9, sold: 12, emoji: '⚔️', color: '#8B5CF6',
    tags: ['Epic', 'S30', '82 Skin'], verified: true,
    desc: 'Akun ML season 30 dengan rank Epic III. Total 82 skin termasuk Collector. Belum pernah kena banned.'
  },
  {
    id: 2, type: 'item', game: 'Growtopia', title: '50 Diamond Lock + Bonus Noclip', price: 'Rp 285.000',
    seller: 'GrowKing_ID', rating: 4.7, sold: 38, emoji: '🌿', color: '#22C55E',
    tags: ['DL', 'Noclip', 'Rare'], verified: true,
    desc: '50 DL siap transfer ke GrowID kamu. Include noclip rare untuk 1 world. Proses 5 menit.'
  },
  {
    id: 3, type: 'akun', game: 'Free Fire', title: 'Akun FF Heroic — 200+ Bundle', price: 'Rp 620.000',
    seller: 'FFPro_Sultan', rating: 4.8, sold: 7, emoji: '🔥', color: '#EF4444',
    tags: ['Heroic', '200+ Bundle', 'OG Username'], verified: false,
    desc: 'Akun FF rank Heroic season terbaru. 200+ bundle langka termasuk Golden Falcon. Username OG.'
  },
  {
    id: 4, type: 'item', game: 'Roblox', title: 'Limiteds Roblox — Clockwork\'s Shades', price: 'Rp 1.200.000',
    seller: 'RobloxTrader_Anon', rating: 4.6, sold: 3, emoji: '🟠', color: '#F97316',
    tags: ['Limited', 'Rare', 'OG'], verified: true,
    desc: 'Clockwork\'s Shades original. Salah satu item limited paling ikonik. Harga bisa nego.'
  },
  {
    id: 5, type: 'akun', game: 'Genshin Impact', title: 'Akun Genshin AR 55 — Raiden + Hu Tao', price: 'Rp 890.000',
    seller: 'Teyvat_Seller', rating: 5.0, sold: 5, emoji: '✨', color: '#06B6D4',
    tags: ['AR55', 'C1 Raiden', 'C2 Hu Tao'], verified: true,
    desc: 'AR55, C1 Raiden Shogun, C2 Hu Tao. Semua karakter 5-star tersedia. Sudah link di email baru.'
  },
];

const gameFilters = ['Semua', 'Mobile Legends', 'Free Fire', 'Roblox', 'Growtopia', 'Genshin'];
const typeFilters = ['Semua', 'Akun', 'Item'];

export default function MarketplacePage({ navigate, goBack }: Props) {
  const [gameFilter, setGameFilter] = useState('Semua');
  const [typeFilter, setTypeFilter] = useState('Semua');
  const [tab, setTab] = useState<'beli' | 'jual'>('beli');
  const [selectedItem, setSelectedItem] = useState<typeof listings[0] | null>(null);

  const filtered = listings.filter(l =>
    (gameFilter === 'Semua' || l.game === gameFilter) &&
    (typeFilter === 'Semua' || l.type === typeFilter.toLowerCase())
  );

  if (selectedItem) {
    return (
      <div className="flex flex-col pb-8" style={{ minHeight: '812px', background: '#080810' }}>
        <div className="px-5 pt-14 pb-4">
          <div className="flex items-center gap-4 mb-5">
            <button onClick={() => setSelectedItem(null)} className="w-10 h-10 rounded-xl bg-[#10101C] border border-[#1E1E35] flex items-center justify-center text-white">←</button>
            <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>DETAIL PRODUK</h1>
          </div>
        </div>

        <div className="px-5 overflow-y-auto flex-1">
          {/* Image placeholder */}
          <div className="w-full h-44 rounded-2xl flex items-center justify-center text-7xl mb-4"
            style={{ background: `${selectedItem.color}15`, border: `1px solid ${selectedItem.color}33` }}>
            {selectedItem.emoji}
          </div>

          {/* Tags */}
          <div className="flex gap-2 mb-3 flex-wrap">
            {selectedItem.tags.map(t => (
              <span key={t} className="px-3 py-1 rounded-xl text-xs font-bold"
                style={{ background: `${selectedItem.color}22`, color: selectedItem.color, fontFamily: 'Rajdhani' }}>
                {t}
              </span>
            ))}
          </div>

          <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Rajdhani' }}>{selectedItem.title}</h2>
          <p className="text-[#6B6B8A] text-sm mb-4">{selectedItem.game}</p>

          <p className="text-3xl font-black mb-4" style={{ color: selectedItem.color, fontFamily: 'Orbitron', fontSize: 22 }}>
            {selectedItem.price}
          </p>

          {/* Seller */}
          <div className="gradient-card rounded-xl p-4 mb-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl gradient-primary">👤</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-bold text-white" style={{ fontFamily: 'Rajdhani' }}>{selectedItem.seller}</p>
                {selectedItem.verified && <span className="text-[#06B6D4] text-sm">✓</span>}
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-[#F59E0B] text-sm">⭐ {selectedItem.rating}</span>
                <span className="text-[#6B6B8A] text-xs">{selectedItem.sold} terjual</span>
              </div>
            </div>
            <button onClick={() => navigate('chat')}
              className="px-3 py-2 rounded-xl text-sm font-bold border border-[#1E1E35] text-[#8888A8]"
              style={{ fontFamily: 'Rajdhani', background: '#10101C' }}>
              💬 Chat
            </button>
          </div>

          {/* Description */}
          <div className="gradient-card rounded-xl p-4 mb-4">
            <p className="text-[#6B6B8A] text-xs font-semibold mb-2" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>DESKRIPSI</p>
            <p className="text-[#C8C8E0] text-sm leading-relaxed">{selectedItem.desc}</p>
          </div>

          <div className="gradient-card rounded-xl p-4 border border-[#22C55E33] mb-4">
            <p className="text-[#22C55E] text-sm font-bold mb-1" style={{ fontFamily: 'Rajdhani' }}>🔒 DILINDUNGI ESCROW</p>
            <p className="text-[#8888A8] text-xs">Uang kamu aman. Dana ditahan hingga kamu konfirmasi item diterima.</p>
          </div>
        </div>

        <div className="px-5 pt-4 pb-8">
          <button className="w-full py-4 rounded-xl font-bold text-white text-lg transition-all active:scale-95"
            style={{ fontFamily: 'Rajdhani', letterSpacing: '1px', background: `linear-gradient(135deg, ${selectedItem.color}, ${selectedItem.color}99)`, boxShadow: `0 0 25px ${selectedItem.color}44` }}>
            BELI SEKARANG
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-24" style={{ minHeight: '812px', background: '#080810' }}>
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>MARKETPLACE</h1>

        {/* Tab */}
        <div className="flex bg-[#10101C] rounded-xl p-1 mb-4">
          {(['beli', 'jual'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="flex-1 py-2.5 rounded-xl font-bold text-sm transition-all"
              style={{
                fontFamily: 'Rajdhani', letterSpacing: '1px',
                background: tab === t ? '#8B5CF6' : 'transparent',
                color: tab === t ? 'white' : '#6B6B8A',
                boxShadow: tab === t ? '0 0 15px rgba(139,92,246,0.4)' : 'none'
              }}>
              {t === 'beli' ? '🛒 BELI' : '💰 JUAL'}
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <div className="flex gap-2 mb-3">
          {typeFilters.map(f => (
            <button key={f} onClick={() => setTypeFilter(f)}
              className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                fontFamily: 'Rajdhani',
                background: typeFilter === f ? '#1A1A2E' : '#10101C',
                color: typeFilter === f ? '#8B5CF6' : '#4A4A6A',
                border: `1px solid ${typeFilter === f ? '#8B5CF644' : '#1E1E35'}`
              }}>
              {f}
            </button>
          ))}
        </div>

        {/* Game filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {gameFilters.map(f => (
            <button key={f} onClick={() => setGameFilter(f)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold flex-shrink-0 transition-all"
              style={{
                fontFamily: 'Rajdhani',
                background: gameFilter === f ? '#8B5CF6' : '#10101C',
                color: gameFilter === f ? 'white' : '#6B6B8A',
                border: `1px solid ${gameFilter === f ? '#8B5CF6' : '#1E1E35'}`
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {tab === 'beli' ? (
        <div className="px-5 flex flex-col gap-3 overflow-y-auto">
          {filtered.map(item => (
            <button key={item.id} onClick={() => setSelectedItem(item)}
              className="gradient-card rounded-2xl p-4 text-left transition-all active:scale-98 w-full">
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: `${item.color}22`, border: `1px solid ${item.color}33` }}>
                  {item.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-bold text-white text-sm leading-tight" style={{ fontFamily: 'Rajdhani' }}>{item.title}</p>
                    {item.verified && <span className="text-[#06B6D4] text-sm flex-shrink-0">✓</span>}
                  </div>
                  <p className="text-[#6B6B8A] text-xs mb-2">{item.game}</p>
                  <div className="flex gap-1 flex-wrap mb-2">
                    {item.tags.slice(0, 2).map(t => (
                      <span key={t} className="px-2 py-0.5 rounded text-[10px] font-semibold"
                        style={{ background: `${item.color}22`, color: item.color, fontFamily: 'Rajdhani' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-black" style={{ color: item.color, fontFamily: 'Orbitron', fontSize: 13 }}>{item.price}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[#F59E0B] text-xs">⭐ {item.rating}</span>
                        <span className="text-[#4A4A6A] text-xs">{item.sold} sold</span>
                      </div>
                    </div>
                    <span className="px-3 py-1.5 rounded-xl text-xs font-bold text-white gradient-primary" style={{ fontFamily: 'Rajdhani' }}>Beli</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="px-5 overflow-y-auto">
          <div className="gradient-card rounded-2xl p-5 mb-4 border border-[#8B5CF644]">
            <p className="text-white font-bold mb-1" style={{ fontFamily: 'Rajdhani' }}>📤 JUAL ITEM / AKUNMU</p>
            <p className="text-[#8888A8] text-sm mb-4">Buat listing baru dan jangkau ribuan pembeli aktif.</p>
            <button className="w-full py-3 rounded-xl font-bold text-white gradient-primary" style={{ fontFamily: 'Rajdhani', boxShadow: '0 0 20px rgba(139,92,246,0.4)' }}>
              + BUAT LISTING BARU
            </button>
          </div>

          <p className="text-[#6B6B8A] text-xs font-semibold mb-3" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>LISTING AKTIFMU</p>
          <div className="gradient-card rounded-xl p-8 text-center border border-dashed border-[#1E1E35]">
            <p className="text-4xl mb-3">📦</p>
            <p className="text-[#4A4A6A] text-sm">Belum ada listing aktif</p>
            <p className="text-[#3A3A5A] text-xs mt-1">Mulai jual item atau akunmu sekarang</p>
          </div>
        </div>
      )}
    </div>
  );
}
