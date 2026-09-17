import { useEffect, useState } from 'react';

interface Props { onDone: () => void; }

export default function SplashScreen({ onDone }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(onDone, 400); return 100; }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[812px] gradient-hero relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

      {/* Glow orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#8B5CF6] opacity-20 blur-3xl" />
      <div className="absolute bottom-32 right-10 w-40 h-40 rounded-full bg-[#06B6D4] opacity-15 blur-3xl" />

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center gap-6 animate-slide-up">
        <div className="w-24 h-24 rounded-2xl gradient-primary neon-purple flex items-center justify-center">
          <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
            <path d="M8 20C8 14 13 9 19 9H33C39 9 44 14 44 20V32C44 38 39 43 33 43H19C13 43 8 38 8 32V20Z" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="1.5" />
            <path d="M18 26H24M21 23V29" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="32" cy="24" r="2" fill="white" />
            <circle cx="37" cy="29" r="2" fill="white" />
            <circle cx="27" cy="29" r="2" fill="rgba(255,255,255,0.5)" />
            <circle cx="32" cy="34" r="2" fill="rgba(255,255,255,0.5)" />
          </svg>
        </div>

        <div className="text-center">
          <h1 className="text-4xl font-black neon-text-purple" style={{ fontFamily: 'Orbitron', letterSpacing: '4px' }}>
            GAMEKU
          </h1>
          <p className="text-[#6B6B8A] text-sm mt-1" style={{ fontFamily: 'Rajdhani', letterSpacing: '3px' }}>
            GAME MARKETPLACE
          </p>
        </div>
      </div>

      {/* Loading bar */}
      <div className="absolute bottom-16 left-8 right-8">
        <div className="h-1 bg-[#1A1A2E] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #8B5CF6, #06B6D4)',
              boxShadow: '0 0 10px rgba(139,92,246,0.8)'
            }}
          />
        </div>
        <p className="text-center text-[#4A4A6A] text-xs mt-3" style={{ fontFamily: 'Rajdhani', letterSpacing: '2px' }}>
          LOADING... {progress}%
        </p>
      </div>
    </div>
  );
}
