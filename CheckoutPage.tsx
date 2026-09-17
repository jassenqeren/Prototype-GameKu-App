import { useState } from 'react';
import type { Page } from '../App';

interface Props { navigate: (p: Page) => void; goBack: () => void; }

const methods = [
  {
    group: 'E-Wallet',
    options: [
      { id: 'gopay', name: 'GoPay', emoji: '💚', fee: 'Gratis', color: '#22C55E' },
      { id: 'ovo', name: 'OVO', emoji: '💜', fee: 'Gratis', color: '#8B5CF6' },
      { id: 'dana', name: 'DANA', emoji: '💙', fee: 'Gratis', color: '#06B6D4' },
      { id: 'shopeepay', name: 'ShopeePay', emoji: '🧡', fee: 'Gratis', color: '#F97316' },
    ]
  },
  {
    group: 'Transfer Bank',
    options: [
      { id: 'bca', name: 'BCA Virtual Account', emoji: '🏦', fee: 'Rp 2.500', color: '#06B6D4' },
      { id: 'bni', name: 'BNI Virtual Account', emoji: '🏦', fee: 'Rp 2.500', color: '#F97316' },
      { id: 'bri', name: 'BRI Virtual Account', emoji: '🏦', fee: 'Rp 2.500', color: '#EF4444' },
      { id: 'mandiri', name: 'Mandiri Virtual Account', emoji: '🏦', fee: 'Rp 2.500', color: '#EAB308' },
    ]
  },
  {
    group: 'Lainnya',
    options: [
      { id: 'qris', name: 'QRIS', emoji: '📱', fee: '0.7%', color: '#8B5CF6' },
      { id: 'pulsa', name: 'Pulsa Telkomsel', emoji: '📶', fee: '5%', color: '#EF4444' },
    ]
  },
];

export default function CheckoutPage({ navigate, goBack }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [voucher, setVoucher] = useState('');
  const [voucherApplied, setVoucherApplied] = useState(false);

  const applyVoucher = () => {
    if (voucher.toLowerCase() === 'gameku50') setVoucherApplied(true);
  };

  const subtotal = 155000;
  const discount = voucherApplied ? 15000 : 0;
  const fee = 0;
  const total = subtotal - discount + fee;

  return (
    <div className="flex flex-col pb-8" style={{ minHeight: '812px', background: '#080810' }}>
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-center gap-4 mb-5">
          <button onClick={goBack} className="w-10 h-10 rounded-xl bg-[#10101C] border border-[#1E1E35] flex items-center justify-center text-white">←</button>
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>CHECKOUT</h1>
        </div>
      </div>

      <div className="px-5 flex-1 overflow-y-auto">
        {/* Order summary */}
        <div className="gradient-card rounded-2xl p-4 mb-4 glow-border-purple">
          <p className="text-[#6B6B8A] text-xs font-semibold mb-3" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>DETAIL PESANAN</p>
          <div className="flex items-center gap-3 pb-3 border-b border-[#1E1E35]">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-[#EF444422]">🔥</div>
            <div className="flex-1">
              <p className="font-bold text-white" style={{ fontFamily: 'Rajdhani' }}>1060 Diamond FF</p>
              <p className="text-xs text-[#6B6B8A]">Free Fire • ID: 123456789</p>
            </div>
          </div>
          <div className="pt-3 flex flex-col gap-2">
            {[
              ['Subtotal', `Rp ${subtotal.toLocaleString('id')}`],
              ['Diskon Voucher', discount > 0 ? `-Rp ${discount.toLocaleString('id')}` : '-'],
              ['Biaya Admin', 'Gratis'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <span className="text-[#6B6B8A] text-sm">{k}</span>
                <span className={`text-sm font-semibold ${v.startsWith('-') ? 'text-[#22C55E]' : 'text-white'}`}
                  style={{ fontFamily: 'Rajdhani' }}>{v}</span>
              </div>
            ))}
            <div className="border-t border-[#1E1E35] pt-2 flex justify-between">
              <span className="font-bold text-white" style={{ fontFamily: 'Rajdhani' }}>Total</span>
              <span className="font-black text-lg" style={{ color: '#8B5CF6', fontFamily: 'Orbitron', fontSize: 16 }}>
                Rp {total.toLocaleString('id')}
              </span>
            </div>
          </div>
        </div>

        {/* Voucher */}
        <div className="gradient-card rounded-xl p-4 mb-4 border border-[#F59E0B33]">
          <p className="text-[#F59E0B] text-xs font-semibold mb-2" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>🎟️ VOUCHER / PROMO</p>
          <div className="flex gap-2">
            <input
              value={voucher}
              onChange={e => setVoucher(e.target.value.toUpperCase())}
              placeholder="Masukkan kode voucher..."
              className="flex-1 bg-[#080810] border border-[#1E1E35] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#4A4A6A] outline-none focus:border-[#F59E0B] transition-colors"
              style={{ fontFamily: 'Orbitron', fontSize: 12 }}
            />
            <button onClick={applyVoucher}
              className="px-4 py-2.5 rounded-xl font-bold text-sm text-white"
              style={{ background: '#F59E0B', fontFamily: 'Rajdhani', boxShadow: '0 0 15px rgba(245,158,11,0.4)' }}>
              PAKAI
            </button>
          </div>
          {voucherApplied && (
            <p className="text-[#22C55E] text-xs mt-2 font-semibold" style={{ fontFamily: 'Rajdhani' }}>
              ✅ Hemat Rp 15.000 berhasil diterapkan!
            </p>
          )}
          <p className="text-[#4A4A6A] text-xs mt-1">Coba: GAMEKU50</p>
        </div>

        {/* Payment Methods */}
        <p className="text-white font-bold mb-3" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>METODE PEMBAYARAN</p>
        {methods.map(group => (
          <div key={group.group} className="mb-4">
            <p className="text-[#6B6B8A] text-xs font-semibold mb-2" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>{group.group.toUpperCase()}</p>
            <div className="flex flex-col gap-2">
              {group.options.map(opt => (
                <button key={opt.id} onClick={() => setSelected(opt.id)}
                  className="gradient-card rounded-xl p-4 flex items-center gap-3 transition-all active:scale-98 text-left"
                  style={{
                    border: selected === opt.id ? `2px solid ${opt.color}` : '1px solid #1E1E35',
                    boxShadow: selected === opt.id ? `0 0 15px ${opt.color}33` : 'none'
                  }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: `${opt.color}22` }}>
                    {opt.emoji}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm" style={{ fontFamily: 'Rajdhani' }}>{opt.name}</p>
                    <p className="text-xs" style={{ color: opt.color }}>Biaya: {opt.fee}</p>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: selected === opt.id ? opt.color : '#1E1E35' }}>
                    {selected === opt.id && <div className="w-2.5 h-2.5 rounded-full" style={{ background: opt.color }} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Pay button */}
      <div className="px-5 pt-4 pb-8">
        <button
          onClick={() => selected && navigate('payment')}
          disabled={!selected}
          className="w-full py-4 rounded-xl font-bold text-white text-lg transition-all active:scale-95"
          style={{
            fontFamily: 'Rajdhani',
            letterSpacing: '1px',
            background: selected ? 'linear-gradient(135deg, #8B5CF6, #6D28D9)' : '#1A1A2E',
            color: selected ? 'white' : '#4A4A6A',
            boxShadow: selected ? '0 0 25px rgba(139,92,246,0.5)' : 'none'
          }}>
          BAYAR Rp {total.toLocaleString('id')}
        </button>
      </div>
    </div>
  );
}
