
import React, { useState, useEffect } from 'react';
import { AppRoute, SubscriptionStatus } from './types';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const [subscription, setSubscription] = useState<SubscriptionStatus>('none');

  // Simple Hash Routing Logic
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as AppRoute;
      if (Object.values(AppRoute).includes(hash)) {
        setCurrentRoute(hash);
      } else {
        setCurrentRoute(AppRoute.HOME);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSubscribe = (status: SubscriptionStatus) => {
    setSubscription(status);
    window.location.hash = AppRoute.CHAT;
  };

  const renderContent = () => {
    switch (currentRoute) {
      case AppRoute.HOME:
        return <Home onNavigate={(route) => window.location.hash = route} onSubscribe={handleSubscribe} />;
      case AppRoute.CHAT:
        return <Chat isPremium={subscription !== 'none'} />;
      default:
        return <Home onNavigate={(route) => window.location.hash = route} onSubscribe={handleSubscribe} />;
    }
  };

  return (
    <Layout currentRoute={currentRoute} isPremium={subscription !== 'none'}>
      {renderContent()}
    </Layout>
  );
};

export default App;
