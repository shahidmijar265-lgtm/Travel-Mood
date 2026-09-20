import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, LogIn, UserCheck, Shield, Award, Bookmark, Compass, Heart } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { user, isLoggedIn, login, quickLoginAsDemo, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, name || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl text-stone-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/50">
          <div className="flex items-center space-x-2">
            <Compass className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-white">
              {isLoggedIn ? 'Traveler Passport Profile' : isSignUp ? 'Create Yatri Account' : 'Sign in to Nepal Yatri'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoggedIn && user ? (
            /* Logged in Passport View */
            <div className="space-y-5">
              <div className="flex items-center space-x-4 p-4 rounded-xl bg-stone-800/60 border border-stone-700/60">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-amber-500 shadow-md"
                />
                <div>
                  <h3 className="font-bold text-white text-base flex items-center gap-1.5">
                    {user.name}
                    <Shield className="w-4 h-4 text-emerald-400" />
                  </h3>
                  <p className="text-xs text-stone-400">{user.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {user.role === 'local_returnee' ? 'Verified Returnee' : user.role === 'local_guide' ? 'Local Host' : 'Himalayan Explorer'}
                  </span>
                </div>
              </div>

              {/* Passport Badges */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Verified Badges & Status
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {user.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs bg-stone-800 border border-stone-700 text-stone-200"
                    >
                      🏅 {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Saved Items Count */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-3 rounded-lg bg-stone-800/40 border border-stone-700/50">
                  <div className="text-lg font-bold text-amber-400 flex items-center justify-center gap-1">
                    <Bookmark className="w-4 h-4" />
                    {user.savedDestinations.length}
                  </div>
                  <div className="text-[11px] text-stone-400">Saved Destinations</div>
                </div>
                <div className="p-3 rounded-lg bg-stone-800/40 border border-stone-700/50">
                  <div className="text-lg font-bold text-emerald-400 flex items-center justify-center gap-1">
                    <Heart className="w-4 h-4" />
                    {user.offlinePacks.length + 1}
                  </div>
                  <div className="text-[11px] text-stone-400">Offline Packs</div>
                </div>
              </div>

              {/* Quick Persona Switcher for demonstration */}
              <div className="pt-2 border-t border-stone-800">
                <p className="text-[11px] text-stone-400 mb-2">Switch Demo Traveler Persona:</p>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  <button
                    onClick={() => quickLoginAsDemo('maya')}
                    className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-center"
                  >
                    Maya (Returnee)
                  </button>
                  <button
                    onClick={() => quickLoginAsDemo('david')}
                    className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-center"
                  >
                    David (Backpacker)
                  </button>
                  <button
                    onClick={() => quickLoginAsDemo('aayush')}
                    className="p-1.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-center"
                  >
                    Aayush (Patan Host)
                  </button>
                </div>
              </div>

              {/* Logout button */}
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full py-2 px-4 rounded-xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800 text-xs font-semibold transition"
              >
                Sign Out of Current Device
              </button>
            </div>
          ) : (
            /* Login / Signup Form */
            <div className="space-y-4">
              <p className="text-xs text-stone-400">
                Log in to sync your saved itineraries, contribute regret-free reviews, bookmark offline trip packs, and connect with returnees.
              </p>

              {/* Demo 1-Click Login Bar */}
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/50 space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  Instant Quick Login (Demo Travelers):
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    onClick={() => {
                      quickLoginAsDemo('maya');
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 border border-amber-700/50 text-amber-200 font-medium text-center transition"
                  >
                    🏔️ Maya (Returnee)
                  </button>
                  <button
                    onClick={() => {
                      quickLoginAsDemo('david');
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 border border-amber-700/50 text-amber-200 font-medium text-center transition"
                  >
                    🎒 David (Traveler)
                  </button>
                  <button
                    onClick={() => {
                      quickLoginAsDemo('aayush');
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 border border-amber-700/50 text-amber-200 font-medium text-center transition"
                  >
                    🏛️ Aayush (Local)
                  </button>
                </div>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-stone-800"></div>
                <span className="flex-shrink mx-3 text-stone-500 text-[11px] uppercase">Or with email</span>
                <div className="flex-grow border-t border-stone-800"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {isSignUp && (
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tenzing Norgay"
                      className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-300 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded-xl text-sm transition shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{isSignUp ? 'Create Traveler Account' : 'Sign In'}</span>
                </button>
              </form>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-xs text-amber-400 hover:text-amber-300 underline"
                >
                  {isSignUp ? 'Already have an account? Sign In' : 'First time traveler in Nepal? Register here'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
