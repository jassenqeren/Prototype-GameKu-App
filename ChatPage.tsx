import { useState, useRef, useEffect } from 'react';
import type { Page } from '../App';

interface Props { navigate: (p: Page) => void; goBack: () => void; }

interface Msg { id: number; text: string; from: 'me' | 'them'; time: string; }

const conversations = [
  { id: 1, name: 'BossML_Jaya', last: 'Oke gan, transfer aja ke rekening...', time: '14:32', unread: 2, emoji: '⚔️', color: '#8B5CF6' },
  { id: 2, name: 'GrowKing_ID', last: 'Siap, DL udah ditransfer!', time: '12:15', unread: 0, emoji: '🌿', color: '#22C55E' },
  { id: 3, name: 'FFPro_Sultan', last: 'Harga bisa nego kah gan?', time: 'Kemarin', unread: 1, emoji: '🔥', color: '#EF4444' },
  { id: 4, name: 'Support GameKu', last: 'Transaksi kamu sudah kami proses.', time: 'Kemarin', unread: 0, emoji: '🎮', color: '#8B5CF6' },
];

const initMessages: Msg[] = [
  { id: 1, text: 'Halo gan, mau tanya soal akun ML yang dijual', from: 'me', time: '14:20' },
  { id: 2, text: 'Halo! Iya gan ada apa?', from: 'them', time: '14:21' },
  { id: 3, text: 'Season berapa ranknya? Dan udah link email belum?', from: 'me', time: '14:22' },
  { id: 4, text: 'Season 30, rank Epic III. Udah link email baru, siap pakai. Bisa saya kasih screenshot kalau mau lihat lebih detail', from: 'them', time: '14:23' },
  { id: 5, text: 'Oke deh gan, harga bisa nego dikit?', from: 'me', time: '14:30' },
  { id: 6, text: 'Oke gan, transfer aja ke rekening saya atau bisa pakai sistem escrow GameKu biar lebih aman 🔒', from: 'them', time: '14:32' },
];

export default function ChatPage({ navigate, goBack }: Props) {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [messages, setMessages] = useState<Msg[]>(initMessages);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeChat]);

  const send = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    setMessages(m => [...m, { id: Date.now(), text: input.trim(), from: 'me', time }]);
    setInput('');
    setTimeout(() => {
      setMessages(m => [...m, { id: Date.now() + 1, text: 'Oke gan, nanti saya konfirmasi segera! 👍', from: 'them', time }]);
    }, 1200);
  };

  const active = conversations.find(c => c.id === activeChat);

  if (activeChat && active) {
    return (
      <div className="flex flex-col" style={{ height: '812px', background: '#080810' }}>
        {/* Chat header */}
        <div className="px-5 pt-14 pb-4 glass border-b border-[#1E1E35]">
          <div className="flex items-center gap-3">
            <button onClick={() => setActiveChat(null)} className="w-10 h-10 rounded-xl bg-[#10101C] border border-[#1E1E35] flex items-center justify-center text-white">←</button>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: `${active.color}22` }}>
              {active.emoji}
            </div>
            <div>
              <p className="font-bold text-white" style={{ fontFamily: 'Rajdhani' }}>{active.name}</p>
              <p className="text-[#22C55E] text-xs">● Online</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-[78%]">
                <div
                  className="px-4 py-3 rounded-2xl text-sm leading-relaxed"
                  style={{
                    background: msg.from === 'me' ? '#8B5CF6' : '#10101C',
                    color: 'white',
                    borderRadius: msg.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    border: msg.from === 'them' ? '1px solid #1E1E35' : 'none',
                    boxShadow: msg.from === 'me' ? '0 0 15px rgba(139,92,246,0.3)' : 'none'
                  }}>
                  {msg.text}
                </div>
                <p className={`text-[10px] text-[#4A4A6A] mt-1 ${msg.from === 'me' ? 'text-right' : 'text-left'}`}>{msg.time}</p>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-5 pb-8 pt-3 glass border-t border-[#1E1E35]">
          <div className="flex gap-3 items-end">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ketik pesan..."
              className="flex-1 bg-[#10101C] border border-[#1E1E35] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#4A4A6A] outline-none focus:border-[#8B5CF6] transition-colors resize-none"
            />
            <button
              onClick={send}
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform active:scale-90"
              style={{ background: input.trim() ? 'linear-gradient(135deg, #8B5CF6, #6D28D9)' : '#1A1A2E', boxShadow: input.trim() ? '0 0 20px rgba(139,92,246,0.5)' : 'none' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-24" style={{ minHeight: '812px', background: '#080810' }}>
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-xl font-bold text-white mb-5" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>PESAN</h1>

        <div className="relative mb-4">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A4A6A]">🔍</span>
          <input
            placeholder="Cari percakapan..."
            className="w-full bg-[#10101C] border border-[#1E1E35] rounded-xl pl-11 pr-4 py-3 text-sm text-[#E8E8F0] placeholder:text-[#4A4A6A] outline-none focus:border-[#8B5CF6] transition-colors"
          />
        </div>
      </div>

      <div className="px-5 flex flex-col gap-2">
        {conversations.map(c => (
          <button key={c.id} onClick={() => setActiveChat(c.id)}
            className="gradient-card rounded-2xl p-4 flex items-center gap-4 text-left transition-all active:scale-98 w-full">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: `${c.color}22`, border: `1px solid ${c.color}33` }}>
                {c.emoji}
              </div>
              {c.unread > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#EF4444] text-white text-xs flex items-center justify-center font-bold"
                  style={{ fontFamily: 'Orbitron', fontSize: 10 }}>
                  {c.unread}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-bold text-white" style={{ fontFamily: 'Rajdhani' }}>{c.name}</p>
                <p className="text-[#4A4A6A] text-xs">{c.time}</p>
              </div>
              <p className="text-[#6B6B8A] text-sm truncate mt-0.5">{c.last}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
