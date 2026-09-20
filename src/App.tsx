import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { LoginModal } from './components/LoginModal';
import { VibeFinder } from './components/VibeFinder';
import { AntiGuides } from './components/AntiGuides';
import { RealTimeNepalMap } from './components/RealTimeNepalMap';
import { TripRemix } from './components/TripRemix';
import { ShoulderSeasonFinder } from './components/ShoulderSeasonFinder';
import { CommunityHub } from './components/CommunityHub';
import { TrueCostCalculator } from './components/TrueCostCalculator';
import { OfflineTripPack } from './components/OfflineTripPack';
import { LivingJournal } from './components/LivingJournal';
import { SensoryGuide } from './components/SensoryGuide';
import { NicheAngles } from './components/NicheAngles';
import { Destination } from './types/travel';
import { GPSLocation, findNearestHub } from './services/gpsService';
import { fetchRealtimeWeather, RealtimeWeather } from './services/weatherService';
import { NEPAL_DESTINATIONS } from './data/nepalDestinations';
import { ShieldCheck, Heart, MapPin, Radio, Compass, AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Travel Mood Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-950 text-stone-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full p-6 rounded-2xl bg-stone-900 border border-stone-800 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white">Travel Mood Ready</h1>
            <p className="text-xs text-stone-400">
              The application encountered a transient view refresh. Click below to reload the travel explorer.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition inline-flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Explorer</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function NepalAppContent() {
  const [activeTab, setActiveTab] = useState<string>('vibes');
  const [userLocation, setUserLocation] = useState<GPSLocation | null>(null);
  const [weather, setWeather] = useState<RealtimeWeather | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(NEPAL_DESTINATIONS[0]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currency, setCurrency] = useState<'NPR' | 'USD' | 'EUR' | 'GBP' | 'INR'>('NPR');

  // GPS Tracking initialization
  const refreshGpsLocation = () => {
    try {
      if (typeof window !== 'undefined' && 'geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            try {
              const nearestHub = findNearestHub(pos.coords.latitude, pos.coords.longitude);
              setUserLocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                accuracy: pos.coords.accuracy,
                altitude: pos.coords.altitude,
                heading: pos.coords.heading,
                speed: pos.coords.speed,
                timestamp: pos.timestamp,
                nearestCityName: nearestHub.name
              });
            } catch {
              setUserLocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                timestamp: pos.timestamp,
                nearestCityName: 'Kathmandu Valley'
              });
            }
          },
          (err) => {
            console.warn('GPS permission or error:', err?.message);
            // Default location: Pokhara Lakeside (lat: 28.2096, lng: 83.9856)
            setUserLocation({
              lat: 28.2096,
              lng: 83.9856,
              timestamp: Date.now(),
              nearestCityName: 'Pokhara Lakeside'
            });
          },
          { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
        );
      } else {
        setUserLocation({
          lat: 28.2096,
          lng: 83.9856,
          timestamp: Date.now(),
          nearestCityName: 'Pokhara Lakeside'
        });
      }
    } catch (e) {
      console.warn('Geolocation invocation caught:', e);
      setUserLocation({
        lat: 28.2096,
        lng: 83.9856,
        timestamp: Date.now(),
        nearestCityName: 'Pokhara Lakeside'
      });
    }
  };

  useEffect(() => {
    refreshGpsLocation();
  }, []);

  // Fetch real-time weather telemetry for primary Nepal hub
  useEffect(() => {
    let isMounted = true;
    async function loadCurrentHubWeather() {
      const lat = userLocation?.lat || 27.7172;
      const lng = userLocation?.lng || 85.3240;
      const cityName = userLocation?.nearestCityName || 'Kathmandu Valley';
      const w = await fetchRealtimeWeather(lat, lng, cityName);
      if (isMounted) {
        setWeather(w);
      }
    }
    loadCurrentHubWeather();
    return () => {
      isMounted = false;
    };
  }, [userLocation]);

  const handleSelectOnMap = (dest: Destination) => {
    setSelectedDestination(dest);
    setActiveTab('map');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        gpsLocation={userLocation}
        onRefreshGps={refreshGpsLocation}
        weather={weather}
        onOpenLogin={() => setIsLoginOpen(true)}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main View Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-6">
        {activeTab === 'vibes' && (
          <VibeFinder
            userLocation={userLocation}
            onSelectOnMap={handleSelectOnMap}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'anti-guides' && <AntiGuides />}

        {activeTab === 'map' && (
          <RealTimeNepalMap
            userLocation={userLocation}
            selectedDestination={selectedDestination}
            onSelectDestination={setSelectedDestination}
            onRefreshGps={refreshGpsLocation}
          />
        )}

        {activeTab === 'trip-remix' && <TripRemix />}

        {activeTab === 'shoulder-season' && <ShoulderSeasonFinder />}

        {activeTab === 'community' && <CommunityHub />}

        {activeTab === 'cost-calc' && (
          <TrueCostCalculator currency={currency} setCurrency={setCurrency} />
        )}

        {activeTab === 'offline-pack' && <OfflineTripPack />}

        {activeTab === 'journal' && <LivingJournal userLocation={userLocation} />}

        {activeTab === 'sensory' && <SensoryGuide />}

        {activeTab === 'niche' && <NicheAngles currency={currency} />}
      </main>

      {/* Login & Passport Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      {/* Footer */}
      <footer className="bg-stone-900 border-t border-stone-800 py-8 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-stone-950 font-bold text-xs">
              🇳🇵
            </div>
            <div>
              <span className="font-bold text-white">Travel Mood</span>
              <p className="text-[11px] text-stone-400">
                Ethical, regret-free, and real-time travel intelligence.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Tourist Police 24/7 Helpline: 1144
            </span>
            <span className="text-stone-600">|</span>
            <span className="flex items-center gap-1 text-amber-400">
              <Radio className="w-3.5 h-3.5" />
              Himalayan Rescue Association: 01-4440292
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <NepalAppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}
