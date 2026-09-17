import { useState } from 'react';
import type { Page } from '../App';

interface Props { navigate: (p: Page) => void; goBack: () => void; }

const games = [
  { name: 'Free Fire', emoji: '🔥', color: '#EF4444', currency: 'Diamond FF', idLabel: 'ID Player', serverLabel: null },
  { name: 'Mobile Legends', emoji: '⚔️', color: '#8B5CF6', currency: 'Diamond ML', idLabel: 'User ID', serverLabel: 'Zone ID' },
  { name: 'Growtopia', emoji: '🌿', color: '#22C55E', currency: 'Diamond Lock', idLabel: 'GrowID', serverLabel: null },
  { name: 'Roblox', emoji: '🟠', color: '#F97316', currency: 'Robux', idLabel: 'Username Roblox', serverLabel: null },
];

const packages: Record<string, { label: string; amount: string; price: string; bonus?: string }[]> = {
  'Free Fire': [
    { label: '50 💎', amount: '50', price: 'Rp 8.500' },
    { label: '100 💎', amount: '100', price: 'Rp 16.500' },
    { label: '210 💎', amount: '210', price: 'Rp 32.000', bonus: '+10 bonus' },
    { label: '520 💎', amount: '520', price: 'Rp 78.000', bonus: '+20 bonus' },
    { label: '1060 💎', amount: '1060', price: 'Rp 155.000', bonus: '+60 bonus' },
    { label: '2180 💎', amount: '2180', price: 'Rp 310.000', bonus: '+180 bonus' },
  ],
  'Mobile Legends': [
    { label: '17 💠', amount: '17', price: 'Rp 4.500' },
    { label: '86 💠', amount: '86', price: 'Rp 22.000' },
    { label: '172 💠', amount: '172', price: 'Rp 44.000', bonus: '+2 bonus' },
    { label: '257 💠', amount: '257', price: 'Rp 65.000', bonus: '+7 bonus' },
    { label: '570 💠', amount: '570', price: 'Rp 143.000', bonus: '+30 bonus' },
    { label: '1135 💠', amount: '1135', price: 'Rp 280.000', bonus: '+65 bonus' },
  ],
  'Growtopia': [
    { label: '1 🔒', amount: '1', price: 'Rp 6.000' },
    { label: '5 🔒', amount: '5', price: 'Rp 28.000' },
    { label: '10 🔒', amount: '10', price: 'Rp 55.000' },
    { label: '25 🔒', amount: '25', price: 'Rp 130.000', bonus: 'Hemat 10%' },
    { label: '50 🔒', amount: '50', price: 'Rp 250.000', bonus: 'Hemat 17%' },
  ],
  'Roblox': [
    { label: '80 Robux', amount: '80', price: 'Rp 12.000' },
    { label: '160 Robux', amount: '160', price: 'Rp 23.000' },
    { label: '400 Robux', amount: '400', price: 'Rp 57.000' },
    { label: '800 Robux', amount: '800', price: 'Rp 113.000' },
    { label: '2000 Robux', amount: '2000', price: 'Rp 280.000', bonus: 'Premium pilihan' },
  ],
};

const steps = ['Pilih Game', 'Masukkan ID', 'Pilih Nominal', 'Konfirmasi'];

export default function TopUpPage({ navigate, goBack }: Props) {
  const [step, setStep] = useState(0);
  const [selectedGame, setSelectedGame] = useState(0);
  const [userId, setUserId] = useState('');
  const [serverId, setServerId] = useState('');
  const [selectedPkg, setSelectedPkg] = useState<number | null>(null);

  const game = games[selectedGame];
  const pkgs = packages[game.name] || [];

  const next = () => {
    if (step < 3) setStep(s => s + 1);
    else navigate('checkout');
  };

  const canNext = () => {
    if (step === 0) return true;
    if (step === 1) return userId.length >= 3;
    if (step === 2) return selectedPkg !== null;
    return true;
  };

  return (
    <div className="flex flex-col pb-8" style={{ minHeight: '812px', background: '#080810' }}>
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={step > 0 ? () => setStep(s => s - 1) : goBack}
            className="w-10 h-10 rounded-xl bg-[#10101C] border border-[#1E1E35] flex items-center justify-center text-white">
            ←
          </button>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>TOP UP</h1>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    background: i <= step ? '#8B5CF6' : '#1A1A2E',
                    color: i <= step ? 'white' : '#4A4A6A',
                    boxShadow: i === step ? '0 0 15px rgba(139,92,246,0.6)' : 'none',
                    fontFamily: 'Orbitron'
                  }}>
                  {i < step ? '✓' : i + 1}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-0.5 rounded-full"
                  style={{ background: i < step ? '#8B5CF6' : '#1E1E35' }} />
              )}
            </div>
          ))}
        </div>

        <p className="text-[#6B6B8A] text-sm mb-1" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>
          LANGKAH {step + 1} — {steps[step].toUpperCase()}
        </p>
      </div>

      <div className="px-5 flex-1 overflow-y-auto">
        {/* Step 0: Choose Game */}
        {step === 0 && (
          <div className="grid grid-cols-2 gap-3">
            {games.map((g, i) => (
              <button key={g.name} onClick={() => setSelectedGame(i)}
                className="gradient-card rounded-2xl p-4 flex flex-col items-center gap-3 transition-all active:scale-95"
                style={{
                  border: selectedGame === i ? `2px solid ${g.color}` : '1px solid #1E1E35',
                  boxShadow: selectedGame === i ? `0 0 20px ${g.color}44` : 'none'
                }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                  style={{ background: `${g.color}22` }}>
                  {g.emoji}
                </div>
                <div className="text-center">
                  <p className="font-bold text-white text-sm" style={{ fontFamily: 'Rajdhani' }}>{g.name}</p>
                  <p className="text-xs" style={{ color: g.color }}>{g.currency}</p>
                </div>
                {selectedGame === i && (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                    style={{ background: g.color }}>✓</div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Step 1: Enter ID */}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div className="gradient-card rounded-2xl p-4 flex items-center gap-3 glow-border-purple">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: `${game.color}22` }}>
                {game.emoji}
              </div>
              <div>
                <p className="font-bold text-white" style={{ fontFamily: 'Rajdhani' }}>{game.name}</p>
                <p className="text-xs text-[#6B6B8A]">{game.currency}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#8888A8] mb-2" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>
                {game.idLabel.toUpperCase()}
              </label>
              <input
                value={userId}
                onChange={e => setUserId(e.target.value)}
                placeholder={`Masukkan ${game.idLabel}...`}
                className="w-full bg-[#10101C] border border-[#1E1E35] rounded-xl px-4 py-3.5 text-base text-[#E8E8F0] placeholder:text-[#4A4A6A] outline-none focus:border-[#8B5CF6] transition-colors"
              />
            </div>

            {game.serverLabel && (
              <div>
                <label className="block text-sm font-semibold text-[#8888A8] mb-2" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>
                  {game.serverLabel.toUpperCase()}
                </label>
                <input
                  value={serverId}
                  onChange={e => setServerId(e.target.value)}
                  placeholder={`Masukkan ${game.serverLabel}...`}
                  className="w-full bg-[#10101C] border border-[#1E1E35] rounded-xl px-4 py-3.5 text-base text-[#E8E8F0] placeholder:text-[#4A4A6A] outline-none focus:border-[#8B5CF6] transition-colors"
                />
              </div>
            )}

            <div className="gradient-card rounded-xl p-4 border border-[#F59E0B33]">
              <p className="text-[#F59E0B] text-sm font-semibold mb-1" style={{ fontFamily: 'Rajdhani' }}>ℹ️ PETUNJUK</p>
              <p className="text-[#8888A8] text-xs leading-relaxed">
                {game.name === 'Mobile Legends'
                  ? 'Buka ML → tap avatar profil → salin User ID dan Zone ID yang tertera.'
                  : `Buka ${game.name} → masuk ke profil → salin ID yang tertera di layar.`}
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Choose Package */}
        {step === 2 && (
          <div>
            <div className="flex items-center gap-3 gradient-card rounded-xl p-3 mb-4 glow-border-purple">
              <span className="text-xl">{game.emoji}</span>
              <div>
                <p className="text-sm font-bold text-white" style={{ fontFamily: 'Rajdhani' }}>{game.name}</p>
                <p className="text-xs text-[#6B6B8A]">ID: {userId}{serverId ? ` | Server: ${serverId}` : ''}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {pkgs.map((p, i) => (
                <button key={i} onClick={() => setSelectedPkg(i)}
                  className="gradient-card rounded-xl p-4 text-left transition-all active:scale-95 relative"
                  style={{
                    border: selectedPkg === i ? `2px solid ${game.color}` : '1px solid #1E1E35',
                    boxShadow: selectedPkg === i ? `0 0 20px ${game.color}33` : 'none'
                  }}>
                  {p.bonus && (
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-bold text-white"
                      style={{ background: game.color, fontFamily: 'Rajdhani' }}>
                      {p.bonus}
                    </span>
                  )}
                  <p className="font-bold text-white text-sm mb-1" style={{ fontFamily: 'Rajdhani' }}>{p.label}</p>
                  <p className="font-black" style={{ color: game.color, fontFamily: 'Orbitron', fontSize: 13 }}>{p.price}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div className="flex flex-col gap-4">
            <div className="gradient-card rounded-2xl p-5 glow-border-purple">
              <p className="text-[#6B6B8A] text-xs font-semibold mb-4" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>RINGKASAN PESANAN</p>
              {[
                ['Game', game.name],
                ['Item', selectedPkg !== null ? pkgs[selectedPkg].label : ''],
                ['ID Player', userId],
                ...(serverId ? [['Zone ID', serverId] as [string, string]] : []),
                ['Harga', selectedPkg !== null ? pkgs[selectedPkg].price : ''],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2 border-b border-[#1E1E35]">
                  <span className="text-[#6B6B8A] text-sm" style={{ fontFamily: 'Rajdhani' }}>{k}</span>
                  <span className="text-white text-sm font-bold" style={{ fontFamily: 'Rajdhani' }}>{v}</span>
                </div>
              ))}
            </div>

            <div className="gradient-card rounded-xl p-4 border border-[#22C55E33]">
              <p className="text-[#22C55E] text-sm font-bold flex items-center gap-2" style={{ fontFamily: 'Rajdhani' }}>
                <span>✅</span> AKUN DITEMUKAN
              </p>
              <p className="text-[#8888A8] text-xs mt-1">Nama: <span className="text-white">Ahmad Rizky</span></p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Button */}
      <div className="px-5 pt-4 pb-8">
        <button
          onClick={next}
          disabled={!canNext()}
          className="w-full py-4 rounded-xl font-bold text-white text-lg transition-all active:scale-95"
          style={{
            fontFamily: 'Rajdhani',
            letterSpacing: '1px',
            background: canNext() ? `linear-gradient(135deg, #8B5CF6, #6D28D9)` : '#1A1A2E',
            color: canNext() ? 'white' : '#4A4A6A',
            boxShadow: canNext() ? '0 0 25px rgba(139,92,246,0.5)' : 'none'
          }}>
          {step === 3 ? 'LANJUT KE PEMBAYARAN' : 'LANJUT'}
        </button>
      </div>
    </div>
  );
}
