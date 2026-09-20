import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, JournalEntry } from '../types/travel';

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (email: string, name?: string) => void;
  quickLoginAsDemo: (type: 'maya' | 'david' | 'aayush') => void;
  logout: () => void;
  toggleSaveDestination: (id: string) => void;
  isSavedDestination: (id: string) => boolean;
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  deleteJournalEntry: (id: string) => void;
}

const DEMO_USERS: Record<string, UserProfile> = {
  maya: {
    id: 'user-maya',
    name: 'Maya Sherpa',
    email: 'maya.sherpa@khumbu.np',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'local_returnee',
    nationality: 'Nepali (Solukhumbu)',
    travelStyle: 'adventurer',
    badges: ['Himalayan Returnee (Sep 2026)', 'Gokyo Lakes Explorer', 'Verified Anti-Guide Contributor'],
    savedDestinations: ['begnas-lake', 'upper-mustang-lo-manthang'],
    savedRemixes: [],
    offlinePacks: ['everest-offline-pack']
  },
  david: {
    id: 'user-david',
    name: 'David Chen',
    email: 'david.chen@backpacker.org',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'traveler',
    nationality: 'Singaporean',
    travelStyle: 'backpacker',
    badges: ['Slow Nomad', 'Chitwan Wildlife Tracker', 'Tea House Veteran'],
    savedDestinations: ['kopan-monastery', 'godavari-botanical', 'the-cliff-kushma'],
    savedRemixes: [],
    offlinePacks: ['kathmandu-valley-pack']
  },
  aayush: {
    id: 'user-aayush',
    name: 'Aayush Maharjan',
    email: 'aayush@patanheritage.org',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    role: 'local_guide',
    nationality: 'Nepali (Patan)',
    travelStyle: 'cultural_explorer',
    badges: ['Local For A Day Host', 'Newari Architecture Historian', 'Top Host 2026'],
    savedDestinations: ['kopan-monastery'],
    savedRemixes: [],
    offlinePacks: []
  }
};

const INITIAL_JOURNAL: JournalEntry[] = [
  {
    id: 'j-1',
    title: 'Morning Fog Lifting over Begnas Wooden Boats',
    destination: 'Begnas Lake, Kaski',
    date: '2026-09-17',
    notes: 'Rented an old cedar paddle boat for 500 NPR. Watched morning clouds lift off Annapurna II while drinking fresh milk tea from a thermal flask. Total serenity without tourist motorboats.',
    altitude: 650,
    coordinates: { lat: 28.1695, lng: 84.0955 },
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&auto=format&fit=crop&q=80',
    tags: ['Sunrise', 'Begnas', 'Wooden Boats', 'Calm']
  },
  {
    id: 'j-2',
    title: 'Monk Debates at Kopan Courtyard',
    destination: 'Kopan Monastery, Kathmandu',
    date: '2026-09-12',
    notes: 'Novice monks clapping their palms with dynamic fervor to challenge philosophical tenets. The smell of burning juniper and warm lemon tea in the hilltop breeze.',
    altitude: 1600,
    coordinates: { lat: 27.7423, lng: 85.3639 },
    imageUrl: 'https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=600&auto=format&fit=crop&q=80',
    tags: ['Meditation', 'Monks', 'Juniper', 'Kathmandu Rim']
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('nepal_yatri_user');
      return saved ? JSON.parse(saved) : DEMO_USERS.maya;
    } catch {
      return DEMO_USERS.maya;
    }
  });

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem('nepal_yatri_journal');
      return saved ? JSON.parse(saved) : INITIAL_JOURNAL;
    } catch {
      return INITIAL_JOURNAL;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('nepal_yatri_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nepal_yatri_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nepal_yatri_journal', JSON.stringify(journalEntries));
  }, [journalEntries]);

  const login = (email: string, name?: string) => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: name || email.split('@')[0],
      email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
      role: 'traveler',
      nationality: 'International Traveler',
      travelStyle: 'adventurer',
      badges: ['Nepal Explorer 2026', 'Yatri Passport Holder'],
      savedDestinations: ['begnas-lake'],
      savedRemixes: [],
      offlinePacks: []
    };
    setUser(newUser);
  };

  const quickLoginAsDemo = (type: 'maya' | 'david' | 'aayush') => {
    setUser(DEMO_USERS[type]);
  };

  const logout = () => {
    setUser(null);
  };

  const toggleSaveDestination = (id: string) => {
    if (!user) return;
    const current = [...user.savedDestinations];
    const exists = current.includes(id);
    const updated = exists ? current.filter((item) => item !== id) : [...current, id];
    setUser({ ...user, savedDestinations: updated });
  };

  const isSavedDestination = (id: string) => {
    return !!user?.savedDestinations?.includes(id);
  };

  const addJournalEntry = (entry: Omit<JournalEntry, 'id'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: `j-${Date.now()}`
    };
    setJournalEntries((prev) => [newEntry, ...prev]);
  };

  const deleteJournalEntry = (id: string) => {
    setJournalEntries((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        quickLoginAsDemo,
        logout,
        toggleSaveDestination,
        isSavedDestination,
        journalEntries,
        addJournalEntry,
        deleteJournalEntry
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
