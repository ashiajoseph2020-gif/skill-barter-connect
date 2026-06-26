import { useState, useEffect } from 'react';
import { UserProfile, ExchangeSession, Match } from '../types';

const INITIAL_PROFILE: UserProfile = {
  name: '',
  state: '',
  town: '',
  address: '',
  whatsapp: '',
  skillsToTeach: [],
  skillsToLearn: [],
  bio: '',
};

const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    whatsapp: '+2348012345678',
    skillsToTeach: ['React Development', 'UI Design'],
    skillsToLearn: ['Public Speaking', 'Cooking'],
  },
  {
    id: '2',
    name: 'Michael Chen',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    whatsapp: '+2348022345678',
    skillsToTeach: ['Cooking', 'Photography'],
    skillsToLearn: ['React Development', 'Guitar'],
  },
  {
    id: '3',
    name: 'Aisha Bello',
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
    whatsapp: '+2348032345678',
    skillsToTeach: ['Public Speaking', 'Writing'],
    skillsToLearn: ['UI Design', 'Photography'],
  },
];

export function useSkillCurrency() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('sc_profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  const [exchanges, setExchanges] = useState<ExchangeSession[]>(() => {
    const saved = localStorage.getItem('sc_exchanges');
    return saved ? JSON.parse(saved) : [];
  });

  const [isOnboarded, setIsOnboarded] = useState(() => {
    return localStorage.getItem('sc_onboarded') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('sc_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('sc_exchanges', JSON.stringify(exchanges));
  }, [exchanges]);

  useEffect(() => {
    localStorage.setItem('sc_onboarded', String(isOnboarded));
  }, [isOnboarded]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const completeOnboarding = () => {
    setIsOnboarded(true);
  };

  const addExchange = (exchange: ExchangeSession) => {
    setExchanges((prev) => [...prev, exchange]);
  };

  const getMatches = () => {
    return MOCK_MATCHES.filter((m) => {
      const teachesWhatIWant = m.skillsToTeach.some((s) =>
        profile.skillsToLearn.includes(s)
      );
      const learnsWhatITeach = m.skillsToLearn.some((s) =>
        profile.skillsToTeach.includes(s)
      );
      return teachesWhatIWant || learnsWhatITeach;
    });
  };

  return {
    profile,
    updateProfile,
    exchanges,
    addExchange,
    isOnboarded,
    completeOnboarding,
    matches: getMatches(),
  };
}
