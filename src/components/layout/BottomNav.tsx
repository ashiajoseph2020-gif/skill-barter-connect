import React from 'react';
import { Home, Search, MessageCircle, BarChart2, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}

function NavItem({ icon: Icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-1 w-full h-full transition-colors",
        active ? "text-primary" : "text-muted-foreground"
      )}
    >
      <Icon className="w-6 h-6" />
      <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
    </button>
  );
}

interface BottomNavProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export function BottomNav({ currentTab, setTab }: BottomNavProps) {
  const items = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'explore', icon: Search, label: 'Explore' },
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-background border-t border-border flex items-center justify-around pb-safe">
      {items.map((item) => (
        <NavItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          active={currentTab === item.id}
          onClick={() => setTab(item.id)}
        />
      ))}
    </nav>
  );
}
