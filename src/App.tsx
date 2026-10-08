import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { NotificationToast } from './components/NotificationToast';
import { AuthModal } from './components/AuthModal';
import { InfoModal } from './components/InfoModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartCheckoutPage } from './pages/CartCheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { ProfilePage } from './pages/ProfilePage';

const AppContent: React.FC = () => {
  const { activePage } = useStore();

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'cart':
      case 'checkout':
        return <CartCheckoutPage />;
      case 'order-success':
        return <OrderSuccessPage />;
      case 'profile':
      case 'favorites':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff] text-[#131b2e] font-sans antialiased selection:bg-blue-100 selection:text-blue-900" dir="rtl">
      {/* Toast Notifications */}
      <NotificationToast />

      {/* Global Modals */}
      <AuthModal />
      <InfoModal />

      {/* Main Header */}
      <Header />

      {/* Active Main View */}
      <main className="flex-1 w-full">{renderCurrentPage()}</main>

      {/* Main Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
