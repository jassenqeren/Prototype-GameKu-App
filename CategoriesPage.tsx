import { useState } from 'react';
import type { Page } from '../App';

interface Props { navigate: (p: Page) => void; goBack: () => void; }

const allGames = [
  { name: 'Free Fire', emoji: '🔥', color: '#EF4444', genre: 'Battle Royale', items: 12 },
  { name: 'Mobile Legends', emoji: '⚔️', color: '#8B5CF6', genre: 'MOBA', items: 8 },
  { name: 'Growtopia', emoji: '🌿', color: '#22C55E', genre: 'Sandbox', items: 6 },
  { name: 'Roblox', emoji: '🟠', color: '#F97316', genre: 'Platform', items: 10 },
  { name: 'PUBG Mobile', emoji: '🎯', color: '#EAB308', genre: 'Battle Royale', items: 7 },
  { name: 'Genshin Impact', emoji: '✨', color: '#06B6D4', genre: 'RPG', items: 9 },
  { name: 'Valorant', emoji: '🔴', color: '#EF4444', genre: 'FPS', items: 5 },
  { name: 'Clash of Clans', emoji: '🏰', color: '#F59E0B', genre: 'Strategy', items: 4 },
  { name: 'Minecraft', emoji: '🧱', color: '#22C55E', genre: 'Sandbox', items: 3 },
  { name: 'League of Legends', emoji: '🦁', color: '#8B5CF6', genre: 'MOBA', items: 6 },
  { name: 'Call of Duty', emoji: '💥', color: '#6B7280', genre: 'FPS', items: 5 },
  { name: 'Fortnite', emoji: '🌀', color: '#06B6D4', genre: 'Battle Royale', items: 8 },
];

const genres = ['Semua', 'Battle Royale', 'MOBA', 'RPG', 'FPS', 'Sandbox', 'Strategy', 'Platform'];

export default function CategoriesPage({ navigate, goBack }: Props) {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('Semua');

  const filtered = allGames.filter(g =>
    (genre === 'Semua' || g.genre === genre) &&
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col pb-8" style={{ minHeight: '812px', background: '#080810' }}>
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-center gap-4 mb-5">
          <button onClick={goBack} className="w-10 h-10 rounded-xl bg-[#10101C] border border-[#1E1E35] flex items-center justify-center text-white">
            ←
          </button>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>SEMUA GAME</h1>
        </div>

        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A4A6A]">🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama game..."
            className="w-full bg-[#10101C] border border-[#1E1E35] rounded-xl pl-11 pr-4 py-3 text-sm text-[#E8E8F0] placeholder:text-[#4A4A6A] outline-none focus:border-[#8B5CF6] transition-colors"
          />
        </div>

        {/* Genre filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {genres.map(g => (
            <button key={g} onClick={() => setGenre(g)}
              className="px-4 py-2 rounded-xl text-sm font-semibold flex-shrink-0 transition-all"
              style={{
                fontFamily: 'Rajdhani',
                background: genre === g ? '#8B5CF6' : '#10101C',
                color: genre === g ? 'white' : '#6B6B8A',
                border: `1px solid ${genre === g ? '#8B5CF6' : '#1E1E35'}`,
                boxShadow: genre === g ? '0 0 15px rgba(139,92,246,0.4)' : 'none'
              }}>
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Game list */}
      <div className="px-5 grid grid-cols-1 gap-3 overflow-y-auto">
        {filtered.map(g => (
          <button key={g.name} onClick={() => navigate('topup')}
            className="gradient-card rounded-2xl p-4 flex items-center gap-4 transition-transform active:scale-98 text-left">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{ background: `${g.color}22`, border: `1.5px solid ${g.color}44` }}>
              {g.emoji}
            </div>
            <div className="flex-1">
              <p className="font-bold text-white text-base" style={{ fontFamily: 'Rajdhani' }}>{g.name}</p>
              <p className="text-xs text-[#6B6B8A]">{g.genre}</p>
              <p className="text-xs mt-1" style={{ color: g.color }}>{g.items} paket tersedia</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="px-3 py-1.5 rounded-lg text-xs font-bold text-white gradient-primary" style={{ fontFamily: 'Rajdhani' }}>
                Top Up
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
