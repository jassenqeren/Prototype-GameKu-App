import { useState } from 'react';
import SplashScreen from './pages/SplashScreen';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import TopUpPage from './pages/TopUpPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import TransactionPage from './pages/TransactionPage';
import MarketplacePage from './pages/MarketplacePage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import BottomNav from './components/BottomNav';

export type Page =
  | 'splash'
  | 'onboarding'
  | 'home'
  | 'categories'
  | 'topup'
  | 'checkout'
  | 'payment'
  | 'transactions'
  | 'marketplace'
  | 'chat'
  | 'profile';

export default function App() {
  const [page, setPage] = useState<Page>('splash');
  const [pageStack, setPageStack] = useState<Page[]>([]);

  const navigate = (to: Page) => {
    setPageStack(prev => [...prev, page]);
    setPage(to);
  };

  const goBack = () => {
    setPageStack(prev => {
      const next = [...prev];
      const last = next.pop();
      if (last) setPage(last);
      return next;
    });
  };

  const showNav = ['home', 'marketplace', 'transactions', 'chat', 'profile'].includes(page);

  return (
    <div className="flex items-start justify-center min-h-screen bg-[#04040A]">
      <div className="page-container relative" style={{ minHeight: '812px' }}>
        {page === 'splash' && <SplashScreen onDone={() => setPage('onboarding')} />}
        {page === 'onboarding' && <OnboardingPage onDone={() => setPage('home')} />}
        {page === 'home' && <HomePage navigate={navigate} />}
        {page === 'categories' && <CategoriesPage navigate={navigate} goBack={goBack} />}
        {page === 'topup' && <TopUpPage navigate={navigate} goBack={goBack} />}
        {page === 'checkout' && <CheckoutPage navigate={navigate} goBack={goBack} />}
        {page === 'payment' && <PaymentPage navigate={navigate} goBack={goBack} />}
        {page === 'transactions' && <TransactionPage navigate={navigate} goBack={goBack} />}
        {page === 'marketplace' && <MarketplacePage navigate={navigate} goBack={goBack} />}
        {page === 'chat' && <ChatPage navigate={navigate} goBack={goBack} />}
        {page === 'profile' && <ProfilePage navigate={navigate} goBack={goBack} />}

        {showNav && (
          <BottomNav active={page as any} navigate={navigate} />
        )}
      </div>
    </div>
  );
}
