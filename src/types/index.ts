export interface UserProfile {
  name: string;
  photo?: string;
  state: string;
  town: string;
  address: string;
  whatsapp: string;
  skillsToTeach: string[];
  skillsToLearn: string[];
  bio: string;
}

export interface ExchangeSession {
  id: string;
  partnerName: string;
  skill: string;
  date: string;
  type: 'teaching' | 'learning';
  status: 'scheduled' | 'completed';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export interface Match {
  id: string;
  name: string;
  photo: string;
  whatsapp: string;
  skillsToTeach: string[];
  skillsToLearn: string[];
  distance?: string;
}
