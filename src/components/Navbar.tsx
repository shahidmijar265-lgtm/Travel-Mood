import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Compass, 
  MapPin, 
  CloudSun, 
  ShieldAlert, 
  User, 
  Sparkles, 
  Radio, 
  BookOpen, 
  Users, 
  Calculator, 
  Download, 
  Volume2, 
  Feather
} from 'lucide-react';
import { GPSLocation } from '../services/gpsService';
import { RealtimeWeather } from '../services/weatherService';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  gpsLocation: GPSLocation | null;
  onRefreshGps: () => void;
  weather: RealtimeWeather | null;
  onOpenLogin: () => void;
  currency: 'NPR' | 'USD' | 'EUR' | 'GBP' | 'INR';
  setCurrency: (c: 'NPR' | 'USD' | 'EUR' | 'GBP' | 'INR') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  gpsLocation,
  onRefreshGps,
  weather,
  onOpenLogin,
  currency,
  setCurrency,
}) => {
  const { user, isLoggedIn } = useAuth();

  const navItems = [
    { id: 'vibes', label: 'Vibe Finder', icon: Sparkles },
    { id: 'anti-guides', label: 'Regret-Free Guides', icon: BookOpen },
    { id: 'map', label: 'Live Map & Transit', icon: MapPin },
    { id: 'trip-remix', label: 'Trip Remix', icon: Compass },
    { id: 'shoulder-season', label: 'Shoulder Season', icon: CloudSun },
    { id: 'community', label: 'Community & Returnees', icon: Users },
    { id: 'cost-calc', label: 'Cost Calculator', icon: Calculator },
    { id: 'offline-pack', label: 'Offline Pack', icon: Download },
    { id: 'journal', label: 'Living Journal', icon: Feather },
    { id: 'sensory', label: 'Sensory Guide', icon: Volume2 },
    { id: 'niche', label: 'Slow Travel & Purpose', icon: Radio },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100">
      {/* Top utility ticker bar */}
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between text-xs border-b border-stone-800/60 text-stone-300 gap-2">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
            Nepal Real-Time Network
          </span>

          {/* Live Weather status */}
          {weather && (
            <div className="hidden sm:flex items-center space-x-1.5 text-stone-300">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              <span>{weather.locationName}: <strong className="text-white">{weather.temperature}°C</strong>, {weather.condition}</span>
              <span className="text-stone-500">|</span>
              <span className="text-emerald-400">{weather.trekkingSafety}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {/* GPS Quick status */}
          <button 
            onClick={onRefreshGps}
            title="Click to update your real GPS coordinates"
            className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 transition"
          >
            <Radio className="w-3 h-3 text-amber-400 animate-pulse" />
            <span>
              {gpsLocation 
                ? `GPS Active (${gpsLocation.lat.toFixed(2)}°, ${gpsLocation.lng.toFixed(2)}°)` 
                : 'Enable GPS'}
            </span>
          </button>

          {/* Currency Switcher */}
          <div className="flex items-center space-x-1 bg-stone-800/80 px-2 py-0.5 rounded border border-stone-700">
            <span className="text-stone-400">Curr:</span>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value as any)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="NPR" className="bg-stone-900">NPR (रु)</option>
              <option value="USD" className="bg-stone-900">USD ($)</option>
              <option value="EUR" className="bg-stone-900">EUR (€)</option>
              <option value="GBP" className="bg-stone-900">GBP (£)</option>
              <option value="INR" className="bg-stone-900">INR (₹)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('vibes')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-rose-600 to-amber-500 p-0.5 shadow-lg shadow-amber-900/30 flex items-center justify-center">
            <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
              <Compass className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold tracking-tight text-white">Travel Mood</span>
            </div>
          </div>
        </div>

        {/* User / Login Trigger */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenLogin}
            className="flex items-center space-x-2 bg-stone-800/80 hover:bg-stone-800 text-stone-200 hover:text-white px-3 py-1.5 rounded-lg border border-stone-700 transition"
          >
            {isLoggedIn && user ? (
              <>
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-6 h-6 rounded-full object-cover border border-amber-500/50" 
                />
                <span className="text-xs font-medium max-w-[120px] truncate">{user.name}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </>
            ) : (
              <>
                <User className="w-4 h-4 text-stone-400" />
                <span className="text-xs font-medium">Login / Sign In</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Scrollable Bar */}
      <nav className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar border-t border-stone-800/60">
        <div className="flex items-center space-x-1 py-1.5 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-sm shadow-amber-500/20 font-semibold'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
