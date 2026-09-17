import { useState, useEffect } from 'react';
import type { Page } from '../App';

interface Props { navigate: (p: Page) => void; goBack: () => void; }

type Status = 'waiting' | 'processing' | 'success' | 'failed';

export default function PaymentPage({ navigate, goBack }: Props) {
  const [status, setStatus] = useState<Status>('waiting');
  const [timeLeft, setTimeLeft] = useState(300); // 5 min
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (status !== 'waiting') return;
    const t = setInterval(() => setTimeLeft(p => {
      if (p <= 1) { clearInterval(t); setStatus('failed'); return 0; }
      return p - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [status]);

  const simulatePay = () => {
    setStatus('processing');
    setTimeout(() => setStatus('success'), 2500);
  };

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const ss = String(timeLeft % 60).padStart(2, '0');

  const vaNumber = '7812 3456 7890 1234';

  const copy = () => {
    navigator.clipboard.writeText(vaNumber.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[812px] px-8 text-center" style={{ background: '#080810' }}>
        <div className="w-28 h-28 rounded-full flex items-center justify-center text-6xl mb-6 animate-float"
          style={{ background: 'rgba(34,197,94,0.15)', border: '2px solid rgba(34,197,94,0.5)', boxShadow: '0 0 40px rgba(34,197,94,0.3)' }}>
          ✅
        </div>
        <h2 className="text-3xl font-black text-[#22C55E] mb-2" style={{ fontFamily: 'Rajdhani', letterSpacing: '2px' }}>BERHASIL!</h2>
        <p className="text-[#8888A8] mb-2">1060 Diamond FF telah dikirim ke</p>
        <p className="text-white font-bold text-lg mb-1" style={{ fontFamily: 'Rajdhani' }}>Ahmad Rizky</p>
        <p className="text-[#6B6B8A] text-sm mb-8">ID: 123456789</p>

        <div className="w-full gradient-card rounded-2xl p-4 mb-6 glow-border-purple text-left">
          <p className="text-[#6B6B8A] text-xs font-semibold mb-3" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>BUKTI TRANSAKSI</p>
          {[
            ['No. Transaksi', '#GK20260917-8821'],
            ['Produk', '1060 Diamond FF'],
            ['Jumlah Bayar', 'Rp 140.000'],
            ['Metode', 'GoPay'],
            ['Waktu', '17 Sep 2026, 14:32'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-1.5 border-b border-[#1E1E35] last:border-0">
              <span className="text-[#6B6B8A] text-xs">{k}</span>
              <span className="text-white text-xs font-semibold" style={{ fontFamily: 'Rajdhani' }}>{v}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3 w-full">
          <button onClick={() => navigate('home')}
            className="flex-1 py-3.5 rounded-xl font-bold text-white"
            style={{ fontFamily: 'Rajdhani', background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', boxShadow: '0 0 20px rgba(139,92,246,0.5)' }}>
            KEMBALI
          </button>
          <button onClick={() => navigate('transactions')}
            className="flex-1 py-3.5 rounded-xl font-bold border border-[#1E1E35] text-[#8888A8]"
            style={{ fontFamily: 'Rajdhani', background: '#10101C' }}>
            RIWAYAT
          </button>
        </div>
      </div>
    );
  }

  if (status === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[812px] px-8 text-center" style={{ background: '#080810' }}>
        <div className="w-24 h-24 rounded-full border-4 border-[#8B5CF6] border-t-transparent animate-spin mb-6" />
        <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Rajdhani', letterSpacing: '2px' }}>MEMPROSES...</h2>
        <p className="text-[#6B6B8A]">Pembayaran sedang diverifikasi</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[812px] px-8 text-center" style={{ background: '#080810' }}>
        <div className="w-28 h-28 rounded-full flex items-center justify-center text-6xl mb-6"
          style={{ background: 'rgba(239,68,68,0.15)', border: '2px solid rgba(239,68,68,0.5)' }}>❌</div>
        <h2 className="text-3xl font-black text-[#EF4444] mb-2" style={{ fontFamily: 'Rajdhani', letterSpacing: '2px' }}>WAKTU HABIS</h2>
        <p className="text-[#8888A8] mb-8">Pesananmu dibatalkan otomatis</p>
        <button onClick={() => navigate('topup')}
          className="w-full py-4 rounded-xl font-bold text-white"
          style={{ fontFamily: 'Rajdhani', background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)' }}>
          COBA LAGI
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-8" style={{ minHeight: '812px', background: '#080810' }}>
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-center gap-4 mb-5">
          <button onClick={goBack} className="w-10 h-10 rounded-xl bg-[#10101C] border border-[#1E1E35] flex items-center justify-center text-white">←</button>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>PEMBAYARAN</h1>
        </div>
      </div>

      <div className="px-5 flex-1 overflow-y-auto">
        {/* Timer */}
        <div className="gradient-card rounded-2xl p-4 mb-4 text-center glow-border-purple">
          <p className="text-[#6B6B8A] text-xs mb-2" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>SELESAIKAN DALAM</p>
          <div className="flex items-center justify-center gap-2">
            {[mm, ss].map((t, i) => (
              <span key={i}>
                <span className="px-4 py-3 rounded-xl text-3xl font-black text-white"
                  style={{ fontFamily: 'Orbitron', background: '#080810', border: '2px solid #8B5CF6', boxShadow: '0 0 15px rgba(139,92,246,0.4)' }}>
                  {t}
                </span>
                {i === 0 && <span className="text-[#8B5CF6] text-2xl mx-1 font-bold">:</span>}
              </span>
            ))}
          </div>
        </div>

        {/* VA Number */}
        <div className="gradient-card rounded-2xl p-5 mb-4 glow-border-cyan">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-[#06B6D422]">🏦</div>
            <div>
              <p className="text-[#6B6B8A] text-xs" style={{ fontFamily: 'Rajdhani' }}>BANK BCA VIRTUAL ACCOUNT</p>
              <p className="text-white font-bold" style={{ fontFamily: 'Rajdhani' }}>Bayar via transfer / ATM / m-banking</p>
            </div>
          </div>

          <div className="bg-[#080810] rounded-xl p-4 border border-[#1E1E35] flex items-center justify-between">
            <span className="text-white text-lg font-bold" style={{ fontFamily: 'Orbitron', letterSpacing: '2px', fontSize: 14 }}>
              {vaNumber}
            </span>
            <button onClick={copy}
              className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95"
              style={{ background: copied ? '#22C55E22' : '#1A1A2E', color: copied ? '#22C55E' : '#8B5CF6', fontFamily: 'Rajdhani', border: `1px solid ${copied ? '#22C55E44' : '#8B5CF644'}` }}>
              {copied ? '✓ SALIN' : 'SALIN'}
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="gradient-card rounded-2xl p-4 mb-4">
          <p className="text-[#6B6B8A] text-xs font-semibold mb-3" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>DETAIL PEMBAYARAN</p>
          {[
            ['Produk', '1060 Diamond FF'],
            ['Total Bayar', 'Rp 140.000'],
            ['Metode', 'BCA Virtual Account'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-2 border-b border-[#1E1E35] last:border-0">
              <span className="text-[#6B6B8A] text-sm">{k}</span>
              <span className="text-white text-sm font-bold" style={{ fontFamily: 'Rajdhani' }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Panduan */}
        <div className="gradient-card rounded-xl p-4 border border-[#F59E0B33] mb-4">
          <p className="text-[#F59E0B] text-sm font-bold mb-3" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>PANDUAN PEMBAYARAN BCA</p>
          {['Buka aplikasi BCA mobile / ATM', 'Pilih Transfer → Virtual Account', 'Masukkan nomor VA di atas', 'Konfirmasi pembayaran', 'Diamond akan masuk otomatis'].map((s, i) => (
            <div key={i} className="flex items-start gap-3 mb-2">
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white flex-shrink-0"
                style={{ background: '#F59E0B', fontFamily: 'Orbitron' }}>{i + 1}</span>
              <p className="text-[#8888A8] text-sm">{s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Simulate button for demo */}
      <div className="px-5 pt-4 pb-8">
        <button onClick={simulatePay}
          className="w-full py-4 rounded-xl font-bold text-white text-lg transition-all active:scale-95"
          style={{ fontFamily: 'Rajdhani', letterSpacing: '1px', background: 'linear-gradient(135deg, #22C55E, #16A34A)', boxShadow: '0 0 25px rgba(34,197,94,0.4)' }}>
          SIMULASI BAYAR ✓
        </button>
      </div>
    </div>
  );
}
