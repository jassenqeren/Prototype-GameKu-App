import { useState } from 'react';
import type { Page } from '../App';

interface Props { navigate: (p: Page) => void; }

const banners = [
  { label: 'FLASH SALE', title: 'Diamond FF\n50% OFF', sub: 'Hanya hari ini!', color: '#8B5CF6', emoji: '💎' },
  { label: 'PROMO', title: 'Robux\nBonus +20%', sub: 'Min. transaksi 50K', color: '#06B6D4', emoji: '🟠' },
  { label: 'BARU', title: 'Jual Item\nGenshin Impact', sub: 'Paling murah se-Indo', color: '#F59E0B', emoji: '⚔️' },
];

const games = [
  { name: 'Free Fire', emoji: '🔥', color: '#EF4444', players: '12.4M' },
  { name: 'Mobile Legends', emoji: '⚔️', color: '#8B5CF6', players: '9.8M' },
  { name: 'Growtopia', emoji: '🌿', color: '#22C55E', players: '3.2M' },
  { name: 'Roblox', emoji: '🟠', color: '#F97316', players: '7.5M' },
  { name: 'PUBG Mobile', emoji: '🎯', color: '#EAB308', players: '5.1M' },
  { name: 'Genshin', emoji: '✨', color: '#06B6D4', players: '4.3M' },
  { name: 'Valorant', emoji: '🔴', color: '#EF4444', players: '2.8M' },
  { name: 'Lainnya', emoji: '🎮', color: '#6B7280', players: '' },
];

const featured = [
  { game: 'Free Fire', item: '1000 Diamond FF', price: 'Rp 145.000', ori: 'Rp 185.000', emoji: '💎', color: '#EF4444', disc: '21%' },
  { game: 'Mobile Legends', item: '570 Diamond ML', price: 'Rp 90.000', ori: 'Rp 115.000', emoji: '⚔️', color: '#8B5CF6', disc: '22%' },
  { game: 'Roblox', item: '1000 Robux', price: 'Rp 130.000', ori: 'Rp 160.000', emoji: '🟠', color: '#F97316', disc: '18%' },
  { game: 'Growtopia', item: '10 Diamond Lock', price: 'Rp 55.000', ori: 'Rp 70.000', emoji: '🌿', color: '#22C55E', disc: '21%' },
];

export default function HomePage({ navigate }: Props) {
  const [bannerIdx, setBannerIdx] = useState(0);
  const [search, setSearch] = useState('');

  const banner = banners[bannerIdx];

  return (
    <div className="flex flex-col pb-24 overflow-y-auto" style={{ minHeight: '812px', background: '#080810' }}>
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[#6B6B8A] text-xs" style={{ fontFamily: 'Rajdhani', letterSpacing: '2px' }}>SELAMAT DATANG</p>
            <h1 className="text-2xl font-black neon-text-purple" style={{ fontFamily: 'Orbitron' }}>GAMEKU</h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-xl glow-border-purple flex items-center justify-center relative">
              <span className="text-lg">🔔</span>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#EF4444]" />
            </button>
            <button onClick={() => navigate('profile')} className="w-10 h-10 rounded-xl overflow-hidden glow-border-cyan">
              <div className="w-full h-full gradient-primary flex items-center justify-center text-white font-bold" style={{ fontFamily: 'Orbitron', fontSize: 14 }}>A</div>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A4A6A]">🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari game, top up, item..."
            className="w-full bg-[#10101C] border border-[#1E1E35] rounded-xl pl-11 pr-4 py-3 text-sm text-[#E8E8F0] placeholder:text-[#4A4A6A] outline-none focus:border-[#8B5CF6] transition-colors"
            style={{ fontFamily: 'Nunito' }}
          />
        </div>
      </div>

      {/* Saldo strip */}
      <div className="mx-5 mb-5">
        <div className="gradient-card rounded-2xl p-4 glow-border-purple flex items-center justify-between">
          <div>
            <p className="text-[#6B6B8A] text-xs" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>SALDO GAMEKU</p>
            <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Rajdhani' }}>Rp 250.000</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg gradient-primary text-white text-sm font-bold" style={{ fontFamily: 'Rajdhani' }}>
              Top Up
            </button>
            <button className="px-4 py-2 rounded-lg bg-[#1A1A2E] border border-[#1E1E35] text-[#8888A8] text-sm" style={{ fontFamily: 'Rajdhani' }}>
              Tarik
            </button>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="px-5 mb-6">
        <div
          className="rounded-2xl p-5 relative overflow-hidden cursor-pointer"
          style={{ background: `linear-gradient(135deg, ${banner.color}33 0%, ${banner.color}11 100%)`, border: `1px solid ${banner.color}44` }}
          onClick={() => navigate('topup')}
        >
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-6xl opacity-30 animate-float">{banner.emoji}</div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2"
            style={{ background: `${banner.color}33`, color: banner.color, fontFamily: 'Rajdhani', letterSpacing: '1px' }}>
            {banner.label}
          </span>
          <h3 className="text-xl font-bold text-white whitespace-pre-line leading-tight" style={{ fontFamily: 'Rajdhani' }}>{banner.title}</h3>
          <p className="text-sm mt-1" style={{ color: `${banner.color}CC` }}>{banner.sub}</p>
          <div className="mt-3 flex gap-2">
            <button className="px-4 py-2 rounded-lg text-sm font-bold text-white transition-transform active:scale-95"
              style={{ background: banner.color, fontFamily: 'Rajdhani', boxShadow: `0 0 15px ${banner.color}66` }}>
              BELI SEKARANG
            </button>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-3">
          {banners.map((_, i) => (
            <button key={i} onClick={() => setBannerIdx(i)}
              className="rounded-full transition-all"
              style={{ width: i === bannerIdx ? 20 : 6, height: 6, background: i === bannerIdx ? banner.color : '#1E1E35' }} />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <div className="px-5 flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>KATEGORI GAME</h2>
          <button onClick={() => navigate('categories')} className="text-[#8B5CF6] text-sm" style={{ fontFamily: 'Rajdhani' }}>Lihat Semua</button>
        </div>
        <div className="flex gap-3 px-5 overflow-x-auto scrollbar-hide">
          {games.map((g) => (
            <button
              key={g.name}
              onClick={() => navigate('topup')}
              className="flex flex-col items-center gap-2 flex-shrink-0 transition-transform active:scale-95"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: `${g.color}22`, border: `1.5px solid ${g.color}55` }}>
                {g.emoji}
              </div>
              <span className="text-[11px] text-center text-[#8888A8] w-16 leading-tight" style={{ fontFamily: 'Rajdhani' }}>
                {g.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Top Up', icon: '⚡', color: '#8B5CF6', page: 'topup' as Page },
            { label: 'Beli Item', icon: '🛒', color: '#06B6D4', page: 'marketplace' as Page },
            { label: 'Jual Item', icon: '💰', color: '#F59E0B', page: 'marketplace' as Page },
            { label: 'Riwayat', icon: '📋', color: '#22C55E', page: 'transactions' as Page },
          ].map(q => (
            <button key={q.label} onClick={() => navigate(q.page)}
              className="flex flex-col items-center gap-2 p-3 rounded-xl transition-transform active:scale-95"
              style={{ background: `${q.color}15`, border: `1px solid ${q.color}33` }}>
              <span className="text-2xl">{q.icon}</span>
              <span className="text-[11px] font-semibold" style={{ fontFamily: 'Rajdhani', color: q.color }}>{q.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>PRODUK TERLARIS</h2>
          <button className="text-[#8B5CF6] text-sm" style={{ fontFamily: 'Rajdhani' }}>Lihat Semua</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featured.map((f) => (
            <button key={f.item} onClick={() => navigate('topup')}
              className="gradient-card rounded-2xl p-4 text-left transition-transform active:scale-95 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-3xl flex items-center justify-center text-2xl"
                style={{ background: `${f.color}22` }}>
                {f.emoji}
              </div>
              <span className="inline-block px-2 py-0.5 rounded-lg text-xs font-bold mb-2"
                style={{ background: `${f.color}22`, color: f.color, fontFamily: 'Rajdhani' }}>
                -{f.disc}
              </span>
              <p className="text-[#6B6B8A] text-xs" style={{ fontFamily: 'Rajdhani' }}>{f.game}</p>
              <p className="text-sm font-bold text-white mt-0.5 leading-tight" style={{ fontFamily: 'Rajdhani' }}>{f.item}</p>
              <p className="text-base font-black mt-2" style={{ color: f.color, fontFamily: 'Orbitron', fontSize: 13 }}>{f.price}</p>
              <p className="text-xs line-through text-[#4A4A6A]">{f.ori}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Flash Sale */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[#EF4444] text-lg">⚡</span>
            <h2 className="text-lg font-bold text-white" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>FLASH SALE</h2>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[#8888A8] text-xs" style={{ fontFamily: 'Rajdhani' }}>Berakhir:</span>
            {['02', '34', '17'].map((t, i) => (
              <span key={i}>
                <span className="px-2 py-1 rounded-lg bg-[#EF4444] text-white text-xs font-bold" style={{ fontFamily: 'Orbitron' }}>{t}</span>
                {i < 2 && <span className="text-[#EF4444] text-xs mx-0.5 font-bold">:</span>}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {[
            { game: 'PUBG', item: '600 UC', price: 'Rp 99K', color: '#EAB308', emoji: '🎯', disc: '30%' },
            { game: 'Valorant', item: '1000 VP', price: 'Rp 155K', color: '#EF4444', emoji: '🔴', disc: '25%' },
            { game: 'Genshin', item: '6480 Genesis', price: 'Rp 1.1Jt', color: '#06B6D4', emoji: '✨', disc: '15%' },
          ].map(f => (
            <button key={f.item} onClick={() => navigate('topup')}
              className="flex-shrink-0 w-36 gradient-card rounded-2xl p-3 text-left transition-transform active:scale-95">
              <div className="w-full h-20 rounded-xl flex items-center justify-center text-4xl mb-2"
                style={{ background: `${f.color}22` }}>
                {f.emoji}
              </div>
              <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: `${f.color}22`, color: f.color, fontFamily: 'Rajdhani' }}>-{f.disc}</span>
              <p className="text-xs text-[#6B6B8A] mt-1" style={{ fontFamily: 'Rajdhani' }}>{f.game}</p>
              <p className="text-sm font-bold text-white" style={{ fontFamily: 'Rajdhani' }}>{f.item}</p>
              <p className="font-black mt-1" style={{ color: f.color, fontFamily: 'Orbitron', fontSize: 12 }}>{f.price}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
