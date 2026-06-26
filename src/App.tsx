import React, { useState } from 'react';
import { BottomNav } from './components/layout/BottomNav';
import { Onboarding } from './components/profile/Onboarding';
import { Dashboard } from './components/dashboard/Dashboard';
import { Explore } from './components/explore/Explore';
import { ChatList } from './components/chat/ChatList';
import { ProfileView } from './components/profile/ProfileView';
import { useSkillCurrency } from './hooks/use-skill-currency';
import { Toaster } from 'sonner';

function App() {
  const { isOnboarded, completeOnboarding } = useSkillCurrency();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isOnboarded) {
    return (
      <main className="min-h-screen bg-background">
        <Onboarding onComplete={completeOnboarding} />
        <Toaster position="top-center" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="max-w-md mx-auto min-h-screen bg-card shadow-xl overflow-hidden relative border-x border-border">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'explore' && <Explore />}
        {activeTab === 'chat' && <ChatList />}
        {activeTab === 'profile' && <ProfileView />}
        
        <BottomNav currentTab={activeTab} setTab={setActiveTab} />
      </div>
      <Toaster position="top-center" />
    </main>
  );
}

export default App;
