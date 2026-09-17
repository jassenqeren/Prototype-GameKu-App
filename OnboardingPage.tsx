import { useState } from 'react';

interface Props { onDone: () => void; }

const slides = [
  {
    icon: '⚡',
    title: 'Top Up Instan',
    desc: 'Diamond, Robux, Gold — semua bisa di-top up dalam hitungan detik. Proses otomatis 24/7.',
    color: '#8B5CF6',
  },
  {
    icon: '🛒',
    title: 'Marketplace Game',
    desc: 'Beli & jual akun, item, dan skin game favoritmu dengan aman dan terpercaya.',
    color: '#06B6D4',
  },
  {
    icon: '🔒',
    title: 'Transaksi Aman',
    desc: 'Dilindungi sistem escrow. Uang ditahan hingga item benar-benar kamu terima.',
    color: '#F59E0B',
  },
];

export default function OnboardingPage({ onDone }: Props) {
  const [idx, setIdx] = useState(0);

  const next = () => {
    if (idx < slides.length - 1) setIdx(idx + 1);
    else onDone();
  };

  const slide = slides[idx];

  return (
    <div className="flex flex-col min-h-[812px] relative overflow-hidden" style={{ background: '#080810' }}>
      {/* BG glow */}
      <div className="absolute inset-0 opacity-20 blur-3xl" style={{
        background: `radial-gradient(circle at 50% 40%, ${slide.color} 0%, transparent 60%)`,
        transition: 'all 0.5s ease'
      }} />

      <div className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: 'linear-gradient(rgba(139,92,246,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.2) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

      {/* Skip button */}
      <button onClick={onDone} className="absolute top-14 right-6 text-[#4A4A6A] text-sm z-10"
        style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>
        LEWATI
      </button>

      {/* Content */}
      <div className="flex flex-col items-center justify-center flex-1 px-8 z-10">
        {/* Icon */}
        <div
          className="w-32 h-32 rounded-3xl flex items-center justify-center text-6xl mb-10 animate-float"
          style={{ background: `${slide.color}22`, border: `2px solid ${slide.color}66`, boxShadow: `0 0 40px ${slide.color}33` }}
        >
          {slide.icon}
        </div>

        <h2 className="text-3xl font-bold text-center mb-4 animate-slide-up"
          style={{ fontFamily: 'Rajdhani', color: slide.color, letterSpacing: '1px' }}>
          {slide.title}
        </h2>
        <p className="text-[#8888A8] text-center text-base leading-relaxed animate-slide-up">
          {slide.desc}
        </p>
      </div>

      {/* Dots + Button */}
      <div className="px-8 pb-16 z-10">
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === idx ? 24 : 8,
                height: 8,
                background: i === idx ? slide.color : '#1E1E35'
              }} />
          ))}
        </div>

        <button
          onClick={next}
          className="w-full py-4 rounded-xl font-bold text-white text-lg transition-transform active:scale-95"
          style={{
            fontFamily: 'Rajdhani',
            letterSpacing: '1px',
            background: `linear-gradient(135deg, ${slide.color}, ${slide.color}99)`,
            boxShadow: `0 0 30px ${slide.color}55`
          }}
        >
          {idx < slides.length - 1 ? 'LANJUT' : 'MULAI SEKARANG'}
        </button>
      </div>
    </div>
  );
}
