import type { Page } from '../App';

interface Props {
  active: Page;
  navigate: (p: Page) => void;
}

const navItems = [
  { id: 'home', label: 'Beranda', icon: HomeIcon },
  { id: 'categories', label: 'Top Up', icon: ZapIcon },
  { id: 'marketplace', label: 'Pasar', icon: ShopIcon },
  { id: 'transactions', label: 'Riwayat', icon: ReceiptIcon },
  { id: 'profile', label: 'Profil', icon: UserIcon },
] as const;

export default function BottomNav({ active, navigate }: Props) {
  return (
    <nav className="absolute bottom-0 left-0 right-0 glass border-t border-[#1E1E35] pb-safe">
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => navigate(id as Page)}
              className="flex flex-col items-center gap-1 px-3 py-1 relative transition-all"
            >
              {isActive && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-[#8B5CF6] neon-purple" />
              )}
              <Icon
                size={22}
                className={isActive ? 'text-[#8B5CF6]' : 'text-[#4A4A6A]'}
                filled={isActive}
              />
              <span
                className="text-[10px] font-semibold"
                style={{ color: isActive ? '#8B5CF6' : '#4A4A6A', fontFamily: 'Rajdhani' }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function HomeIcon({ size, className, filled }: { size: number; className: string; filled: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 9.5L12 3L21 9.5V20C21 20.6 20.6 21 20 21H15V15H9V21H4C3.4 21 3 20.6 3 20V9.5Z"
        fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function ZapIcon({ size, className, filled }: { size: number; className: string; filled: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z"
        fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function ShopIcon({ size, className, filled }: { size: number; className: string; filled: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 6H21L19 16H5L3 6Z" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M3 6L2 3H1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="9" cy="20" r="1.5" fill="currentColor" />
      <circle cx="17" cy="20" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ReceiptIcon({ size, className, filled }: { size: number; className: string; filled: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="2" width="16" height="20" rx="2" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 8H16M8 12H16M8 16H13" stroke={filled ? '#080810' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon({ size, className, filled }: { size: number; className: string; filled: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="8" r="4" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 20C4 16.7 7.6 14 12 14C16.4 14 20 16.7 20 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
