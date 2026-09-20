import React, { useState, useEffect, useMemo, useRef } from 'react';
import { NEPAL_DESTINATIONS } from '../data/nepalDestinations';
import { Destination, VibeType } from '../types/travel';
import { GPSLocation, calculateDistanceKm, getGoogleMapsRouteUrl } from '../services/gpsService';
import { fetchRealtimeWeather, RealtimeWeather } from '../services/weatherService';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  MapPin, 
  Compass, 
  CloudSun, 
  Bookmark, 
  Check, 
  Flame, 
  Navigation,
  Volume2,
  Dices,
  Shuffle,
  ArrowUpDown,
  Mountain,
  X,
  Crosshair,
  Calendar,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { playSensorySound } from '../services/audioSynth';

interface VibeFinderProps {
  userLocation: GPSLocation | null;
  onSelectOnMap: (dest: Destination) => void;
  onNavigateToTab: (tab: string) => void;
}

export const VibeFinder: React.FC<VibeFinderProps> = ({
  userLocation,
  onSelectOnMap,
  onNavigateToTab,
}) => {
  const [selectedVibe, setSelectedVibe] = useState<VibeType>('calm');
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [sortOrder, setSortOrder] = useState<'nearest' | 'farthest' | 'best_month' | 'default'>('nearest');
  const [originMode, setOriginMode] = useState<'user' | 'kathmandu' | 'pokhara'>(
    userLocation ? 'user' : 'kathmandu'
  );
  const [thrillSubFilter, setThrillSubFilter] = useState<'all' | 'rock_climbing' | 'canyoning_water' | 'air_bungee'>('all');
  
  // Random Destination Picker State
  const [randomModalOpen, setRandomModalOpen] = useState<boolean>(false);
  const [randomPlace, setRandomPlace] = useState<Destination | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [randomRollingName, setRandomRollingName] = useState<string>('');

  const [weatherData, setWeatherData] = useState<Record<string, RealtimeWeather>>({});
  const [loadingWeather, setLoadingWeather] = useState<boolean>(false);
  const { toggleSaveDestination, isSavedDestination } = useAuth();
  const cardListRef = useRef<HTMLDivElement>(null);

  // Reference origin coordinates for distance calculations
  const activeOrigin = useMemo(() => {
    if (originMode === 'user' && userLocation) {
      return { lat: userLocation.lat, lng: userLocation.lng, label: 'My GPS Location' };
    }
    if (originMode === 'pokhara') {
      return { lat: 28.2096, lng: 83.9595, label: 'Pokhara Lakeside' };
    }
    return { lat: 27.7172, lng: 85.3240, label: 'Kathmandu Valley' };
  }, [originMode, userLocation]);

  const vibesConfig: { type: VibeType; label: string; icon: string; tagline: string; specialNote: string }[] = [
    {
      type: 'calm',
      label: 'Calm & Serene',
      icon: '🕊️',
      tagline: 'Spiritual pilgrimage sites, quiet lakesides, & tranquil meditation ridges',
      specialNote: 'Tailored for slow introspection: features serene Tibetan Buddhist gompas, peaceful wooden rowboats on Begnas, and secluded rhododendron ridges.'
    },
    {
      type: 'thrill',
      label: 'High Thrill & Adrenaline',
      icon: '⚡🧗',
      tagline: 'Natural Rock Climbing Crags, 228m Bungee, Class V Whitewater & Waterfall Canyoning',
      specialNote: 'Adrenaline rushes through bolted natural limestone crags at Hattiban & Nagarjun, 55m cliffs at Bimalnagar, and deep Himalayan river gorges.'
    },
    {
      type: 'cultural',
      label: 'Ancient Heritage',
      icon: '🏛️',
      tagline: 'Living medieval Newari courtyards, clay sky-caves & sacred Mithila temples',
      specialNote: 'Deep immersion into indigenous stone kingdoms, sacred palace architecture, monastic rituals, and master artisan cooperatives.'
    },
    {
      type: 'nature',
      label: 'Wild Nature & Fauna',
      icon: '🌿',
      tagline: 'Untamed Bengal tiger reserves, glacial lakes & virgin cloud forests',
      specialNote: 'Pure acoustic silence, walking tiger safaris in Bardia, and high-altitude wetland ecosystems.'
    },
    {
      type: 'foodie',
      label: 'Culinary & Local Flavors',
      icon: '🍲',
      tagline: 'Authentic Thakali Dal Bhat, Newari wood-press feasts, apple orchards & Mithila sweets',
      specialNote: 'Savor organic mountain orchards in Marpha, clay-oven Choila in medieval Kirtipur, and fresh buffalo curd with clover honey.'
    }
  ];

  // Helper to check if a destination is a rock climbing spot
  const isRockClimbingSpot = (dest: Destination) => {
    const text = (dest.name + ' ' + dest.shortDesc + ' ' + (dest.highlight || '')).toLowerCase();
    return text.includes('rock climb') || text.includes('climbing') || dest.id.includes('climbing') || dest.id.includes('rock-wall');
  };

  // Helper to check if a destination is water/canyoning
  const isWaterCanyoningSpot = (dest: Destination) => {
    const text = (dest.name + ' ' + dest.shortDesc + ' ' + (dest.highlight || '')).toLowerCase();
    return text.includes('canyon') || text.includes('raft') || text.includes('whitewater') || text.includes('river');
  };

  // Helper to check if a destination is air/bungee/heights
  const isAirBungeeSpot = (dest: Destination) => {
    const text = (dest.name + ' ' + dest.shortDesc + ' ' + (dest.highlight || '')).toLowerCase();
    return text.includes('bungee') || text.includes('paraglid') || text.includes('ridge') || text.includes('cable car');
  };

  // Fetch real-time weather for matching destinations
  useEffect(() => {
    let isMounted = true;
    async function loadWeather() {
      setLoadingWeather(true);
      const results: Record<string, RealtimeWeather> = {};
      const relevant = NEPAL_DESTINATIONS.filter((d) => d.vibes.includes(selectedVibe));
      for (const dest of relevant.slice(0, 6)) {
        try {
          const w = await fetchRealtimeWeather(dest.coordinates.lat, dest.coordinates.lng, dest.name);
          results[dest.id] = w;
        } catch {
          // ignore
        }
      }
      if (isMounted) {
        setWeatherData(results);
        setLoadingWeather(false);
      }
    }
    loadWeather();
    return () => {
      isMounted = false;
    };
  }, [selectedVibe]);

  // Filter and sort destinations
  const processedDestinations = useMemo(() => {
    let list = NEPAL_DESTINATIONS.filter((d) => d.vibes.includes(selectedVibe));

    // Thrill sub-filter
    if (selectedVibe === 'thrill') {
      if (thrillSubFilter === 'rock_climbing') {
        list = list.filter((d) => isRockClimbingSpot(d));
      } else if (thrillSubFilter === 'canyoning_water') {
        list = list.filter((d) => isWaterCanyoningSpot(d));
      } else if (thrillSubFilter === 'air_bungee') {
        list = list.filter((d) => isAirBungeeSpot(d));
      }
    }

    // Attach calculated distance
    const withDistance = list.map((dest) => {
      const distanceKm = calculateDistanceKm(
        activeOrigin.lat,
        activeOrigin.lng,
        dest.coordinates.lat,
        dest.coordinates.lng
      );
      return {
        ...dest,
        distanceKm,
        isClimbing: isRockClimbingSpot(dest)
      };
    });

    // Apply Sorting
    if (sortOrder === 'nearest') {
      withDistance.sort((a, b) => a.distanceKm - b.distanceKm);
    } else if (sortOrder === 'farthest') {
      withDistance.sort((a, b) => b.distanceKm - a.distanceKm);
    } else if (sortOrder === 'best_month') {
      withDistance.sort((a, b) => {
        const aBest = a.bestMonths.includes(selectedMonth) ? 2 : a.shoulderMonths.includes(selectedMonth) ? 1 : 0;
        const bBest = b.bestMonths.includes(selectedMonth) ? 2 : b.shoulderMonths.includes(selectedMonth) ? 1 : 0;
        return bBest - aBest;
      });
    }

    return withDistance;
  }, [selectedVibe, thrillSubFilter, activeOrigin, sortOrder, selectedMonth]);

  // Pick Random Destination Feature
  const handlePickRandom = (scope: 'vibe' | 'all' = 'vibe') => {
    const pool = scope === 'vibe' 
      ? NEPAL_DESTINATIONS.filter((d) => d.vibes.includes(selectedVibe))
      : NEPAL_DESTINATIONS;

    if (pool.length === 0) return;

    setIsRolling(true);
    setRandomModalOpen(true);
    playSensorySound('mountain_wind');

    let count = 0;
    const interval = setInterval(() => {
      const tempPick = pool[Math.floor(Math.random() * pool.length)];
      setRandomRollingName(tempPick.name);
      count++;
      if (count >= 8) {
        clearInterval(interval);
        const finalPick = pool[Math.floor(Math.random() * pool.length)];
        setRandomPlace(finalPick);
        setIsRolling(false);
        playSensorySound(finalPick.sensory.soundType);
      }
    }, 60);
  };

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  return (
    <div className="space-y-6">
      {/* Hero Mood Selector */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mood & Climate Intelligence</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              How do you want Nepal to feel right now?
            </h1>
            <p className="text-stone-300 text-sm mt-2">
              Filter by emotion rather than region. Discover rock climbing cliffs, quiet Buddhist ridges, or medieval feasts sorted by nearest proximity.
            </p>
          </div>

          {/* Feature: Pick Random Destination Button */}
          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2">
            <button
              onClick={() => handlePickRandom('vibe')}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition transform active:scale-95 border border-amber-300"
              title="Surprise me with a serendipitous destination matching your vibe"
            >
              <Dices className="w-4 h-4 animate-spin-slow" />
              <span>Pick a Random Place 🎲</span>
            </button>
            <button
              onClick={() => handlePickRandom('all')}
              className="inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-white text-[11px] font-medium border border-stone-700/80 transition"
              title="Choose completely at random across all 35+ Nepal destinations"
            >
              <Shuffle className="w-3.5 h-3.5 text-amber-400" />
              <span>Surprise Across All Nepal</span>
            </button>
          </div>
        </div>

        {/* Vibe Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 mt-6">
          {vibesConfig.map((v) => {
            const isSelected = selectedVibe === v.type;
            return (
              <button
                key={v.type}
                onClick={() => setSelectedVibe(v.type)}
                className={`flex flex-col text-left p-3.5 rounded-xl border transition relative overflow-hidden ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-lg shadow-amber-500/20 font-medium scale-[1.02]'
                    : 'bg-stone-800/80 hover:bg-stone-800 text-stone-200 border-stone-700/80 hover:border-stone-600'
                }`}
              >
                <div className="text-2xl mb-1.5">{v.icon}</div>
                <div className="font-bold text-xs sm:text-sm leading-tight">{v.label}</div>
                <div className={`text-[11px] line-clamp-2 mt-1 leading-snug ${isSelected ? 'text-stone-950/90 font-medium' : 'text-stone-400'}`}>
                  {v.tagline}
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-stone-950"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Highlight Banner / Special Tagline */}
        <div className="mt-4 p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 text-xs text-stone-300 flex items-start space-x-3">
          <div className="p-1 rounded bg-amber-500/20 text-amber-400 mt-0.5 shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <strong className="text-white block font-medium mb-0.5">
              {vibesConfig.find((v) => v.type === selectedVibe)?.tagline}
            </strong>
            <span className="leading-relaxed text-stone-300">{vibesConfig.find((v) => v.type === selectedVibe)?.specialNote}</span>
          </div>
        </div>

        {/* High Thrill & Adrenaline Sub-Filter Bar (Rock Climbing, Canyoning, Bungee) */}
        {selectedVibe === 'thrill' && (
          <div className="mt-4 p-3 bg-stone-950/90 border border-amber-500/30 rounded-xl flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center space-x-1.5 text-xs text-amber-300 font-bold">
              <Mountain className="w-4 h-4 text-amber-400" />
              <span>Adrenaline Focus:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setThrillSubFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  thrillSubFilter === 'all'
                    ? 'bg-stone-700 text-white shadow-sm'
                    : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                All Thrills
              </button>
              <button
                onClick={() => setThrillSubFilter('rock_climbing')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                  thrillSubFilter === 'rock_climbing'
                    ? 'bg-amber-500 text-stone-950 shadow-md ring-1 ring-amber-300'
                    : 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30'
                }`}
              >
                <span>🧗 Rock Climbing Natural Crags</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-stone-950/40 text-amber-200 font-mono">
                  4 Crags
                </span>
              </button>
              <button
                onClick={() => setThrillSubFilter('canyoning_water')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  thrillSubFilter === 'canyoning_water'
                    ? 'bg-stone-700 text-white shadow-sm'
                    : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                🌊 Canyoning &amp; Whitewater
              </button>
              <button
                onClick={() => setThrillSubFilter('air_bungee')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  thrillSubFilter === 'air_bungee'
                    ? 'bg-stone-700 text-white shadow-sm'
                    : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                ⚡ 228m Bungee &amp; Air
              </button>
            </div>
          </div>
        )}

        {/* Controls Bar: Distance Origin, Nearest-to-Farthest Sorting & Month */}
        <div className="mt-5 pt-4 border-t border-stone-800/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs">
          {/* Proximity & Origin Reference */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-stone-400 font-semibold flex items-center gap-1">
              <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
              <span>Measure Distance From:</span>
            </span>
            <div className="flex flex-wrap items-center gap-1">
              {userLocation && (
                <button
                  onClick={() => setOriginMode('user')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition flex items-center space-x-1 ${
                    originMode === 'user'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  <Navigation className="w-3 h-3" />
                  <span>My Live GPS</span>
                </button>
              )}
              <button
                onClick={() => setOriginMode('kathmandu')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  originMode === 'kathmandu'
                    ? 'bg-stone-700 text-white shadow-sm font-bold border border-stone-600'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                Kathmandu Valley
              </button>
              <button
                onClick={() => setOriginMode('pokhara')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  originMode === 'pokhara'
                    ? 'bg-stone-700 text-white shadow-sm font-bold border border-stone-600'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                Pokhara Lakeside
              </button>
            </div>
          </div>

          {/* Sort Controls (Nearest to Farthest) */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-stone-400 font-semibold flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
              <span>Sort By:</span>
            </span>
            <div className="flex flex-wrap items-center gap-1">
              <button
                onClick={() => setSortOrder('nearest')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center space-x-1 ${
                  sortOrder === 'nearest'
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <span>Nearest to Farthest 🧭</span>
              </button>
              <button
                onClick={() => setSortOrder('farthest')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  sortOrder === 'farthest'
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                Farthest First
              </button>
              <button
                onClick={() => setSortOrder('best_month')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition flex items-center space-x-1 ${
                  sortOrder === 'best_month'
                    ? 'bg-stone-700 text-white font-bold shadow-sm'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <span>Best Season 🌟</span>
              </button>
            </div>
          </div>

          {/* Month selector */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-stone-400 font-medium shrink-0 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-stone-400" />
              <span>Month:</span>
            </span>
            <div className="flex gap-1">
              {months.map((m, idx) => {
                const monthNum = idx + 1;
                const isSelected = selectedMonth === monthNum;
                return (
                  <button
                    key={m}
                    onClick={() => setSelectedMonth(monthNum)}
                    className={`px-2 py-0.5 rounded text-[11px] transition ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950 font-extrabold'
                        : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Destination Recommendation Cards */}
      <div ref={cardListRef} className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <h2 className="text-base font-bold text-stone-100 flex items-center gap-2">
              <span>Recommended for {selectedVibe.toUpperCase()} mood</span>
              <span className="px-2 py-0.5 rounded-full bg-stone-800 text-amber-400 font-mono text-xs font-bold">
                {processedDestinations.length} places
              </span>
            </h2>
            {sortOrder === 'nearest' && (
              <span className="text-xs text-emerald-400 font-medium bg-emerald-950/40 border border-emerald-800/50 px-2 py-0.5 rounded-md">
                Sorted Nearest &rarr; Farthest from {activeOrigin.label}
              </span>
            )}
          </div>

          {loadingWeather && (
            <span className="text-xs text-amber-400 animate-pulse flex items-center gap-1">
              <CloudSun className="w-3.5 h-3.5" />
              Refreshing live meteorological telemetry...
            </span>
          )}
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {processedDestinations.map((dest, idx) => {
            const weather = weatherData[dest.id];
            const isSaved = isSavedDestination(dest.id);
            const isBestMonth = dest.bestMonths.includes(selectedMonth);
            const isShoulderMonth = dest.shoulderMonths.includes(selectedMonth);
            const isClimbing = dest.isClimbing;

            return (
              <div
                key={dest.id}
                className={`bg-stone-900 border rounded-2xl p-5 shadow-lg flex flex-col justify-between transition group relative ${
                  isClimbing
                    ? 'border-amber-500/40 hover:border-amber-400/80 bg-gradient-to-b from-stone-900 to-stone-925'
                    : 'border-stone-800 hover:border-stone-700'
                }`}
              >
                <div>
                  {/* Top Ranking & Climbing Badges */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {sortOrder === 'nearest' && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold flex items-center gap-1">
                          <span>#{idx + 1} Nearest</span>
                          <span>({dest.distanceKm} km)</span>
                        </span>
                      )}
                      {isClimbing && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/50 text-[10px] font-black flex items-center gap-1">
                          <span>🧗 Natural Rock Climbing Crag</span>
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => toggleSaveDestination(dest.id)}
                      title={isSaved ? 'Saved to Passport' : 'Save to Favorites'}
                      className={`p-1.5 rounded-xl border transition shrink-0 ${
                        isSaved
                          ? 'bg-amber-500 text-stone-950 border-amber-400'
                          : 'bg-stone-800 text-stone-400 border-stone-700 hover:text-white'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Place Title & Altitude */}
                  <div className="mb-2.5">
                    <div className="text-xs text-amber-400/90 font-medium">{dest.region} &bull; {dest.altitude}m alt</div>
                    <h3 className="text-lg font-extrabold text-white group-hover:text-amber-400 transition leading-snug">
                      {dest.name}
                    </h3>
                    <div className="text-xs text-stone-400 font-serif">{dest.nepaliName}</div>
                  </div>

                  {/* Distance from Selected Origin */}
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-stone-800/90 text-stone-300 text-xs mb-3 border border-stone-700/60">
                    <Navigation className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>
                      <strong className="text-emerald-400">{dest.distanceKm} km</strong> from {activeOrigin.label}
                    </span>
                  </div>

                  {/* Short description */}
                  <p className="text-xs text-stone-300 leading-relaxed mb-4">
                    {dest.shortDesc}
                  </p>

                  {/* Highlight Quote if available */}
                  {dest.highlight && (
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 mb-3 flex items-start space-x-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                      <span className="leading-snug">{dest.highlight}</span>
                    </div>
                  )}

                  {/* Real-time Weather Telemetry Card */}
                  {weather ? (
                    <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800/80 mb-3 text-xs space-y-1">
                      <div className="flex items-center justify-between text-stone-300">
                        <span className="flex items-center gap-1.5 text-stone-200 font-semibold">
                          <CloudSun className="w-4 h-4 text-amber-400" />
                          Live: {weather.temperature}°C ({weather.condition})
                        </span>
                        <span className="text-[10px] text-stone-400">Wind: {weather.windSpeed} km/h</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-800/60">
                        <span className="text-stone-400">Trekking / Climbing Safety:</span>
                        <span className={`font-semibold ${
                          weather.trekkingSafety.includes('Safe') ? 'text-emerald-400' : 'text-amber-400'
                        }`}>
                          {weather.trekkingSafety}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2 rounded-lg bg-stone-950/40 border border-stone-800/40 mb-3 text-[11px] text-stone-400 flex items-center gap-1.5">
                      <CloudSun className="w-3.5 h-3.5 text-amber-500/80" />
                      <span>{dest.weatherSummary}</span>
                    </div>
                  )}

                  {/* Month suitability indicator */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-stone-400 font-medium">Month ({months[selectedMonth - 1]}):</span>
                      <span className={`font-semibold ${
                        isBestMonth ? 'text-emerald-400' : isShoulderMonth ? 'text-amber-400' : 'text-stone-400'
                      }`}>
                        {isBestMonth ? '🌟 Prime Peak Season' : isShoulderMonth ? '🍁 Sweet-Spot Shoulder' : 'Off-peak / Quiet'}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-400 bg-stone-800/40 p-2 rounded border border-stone-800 leading-snug">
                      💡 {dest.sweetSpotReason}
                    </div>
                  </div>

                  {/* Anti-Guide Swap Summary */}
                  <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-900/30 text-xs text-stone-300 space-y-1 mb-4">
                    <div className="text-red-400 font-semibold flex items-center gap-1">
                      <span>❌ Skip:</span>
                      <span className="text-stone-300 font-normal">{dest.famousRouteTrap}</span>
                    </div>
                    <div className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span>✨ Do:</span>
                      <span className="text-stone-200 font-normal">{dest.offBeatenSwap}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center space-x-1.5 pt-3 border-t border-stone-800">
                  <button
                    onClick={() => onSelectOnMap(dest)}
                    className="flex-1 py-2 px-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-semibold transition flex items-center justify-center space-x-1 border border-stone-700"
                    title="Trace route and view on interactive live map"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Live Map</span>
                  </button>

                  <a
                    href={getGoogleMapsRouteUrl(
                      dest.coordinates.lat,
                      dest.coordinates.lng,
                      dest.name,
                      activeOrigin.lat,
                      activeOrigin.lng,
                      'driving'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition flex items-center justify-center space-x-1 shadow-md shadow-emerald-950/40 border border-emerald-500/40"
                    title="Direct to Google Maps with turn-by-turn driving route"
                  >
                    <Navigation className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-emerald-200 shrink-0 opacity-80" />
                  </a>

                  <button
                    onClick={() => {
                      playSensorySound(dest.sensory.soundType);
                    }}
                    title={`Listen to ambient soundscape (${dest.sensory.soundType.replace('_', ' ')})`}
                    className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 border border-stone-700 transition shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RANDOM DESTINATION SPOTLIGHT MODAL */}
      {randomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-stone-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden">
            {/* Top decorative glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Close Button */}
            <button
              onClick={() => setRandomModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white transition z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Rolling Animation State */}
            {isRolling ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-3xl animate-bounce">
                  🎲
                </div>
                <div className="text-stone-400 text-xs font-medium uppercase tracking-wider">
                  Rolling Serendipity Engine...
                </div>
                <div className="text-xl font-black text-white font-mono h-8 flex items-center">
                  {randomRollingName || 'Consulting Himalayan ridges...'}
                </div>
                <p className="text-stone-400 text-xs max-w-xs">
                  Selecting a surprise destination with ideal weather and unforgettable character.
                </p>
              </div>
            ) : randomPlace ? (
              <div className="space-y-4">
                {/* Header Tag */}
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Serendipity Picked For You!</span>
                </div>

                {/* Place Heading */}
                <div>
                  <div className="text-xs text-amber-400 font-semibold">{randomPlace.region} &bull; {randomPlace.altitude}m alt</div>
                  <h3 className="text-2xl font-black text-white leading-tight mt-0.5">
                    {randomPlace.name}
                  </h3>
                  <div className="text-xs text-stone-400 font-serif">{randomPlace.nepaliName}</div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-stone-800 text-emerald-400 text-xs font-semibold">
                    <Navigation className="w-3 h-3" />
                    <span>
                      {calculateDistanceKm(activeOrigin.lat, activeOrigin.lng, randomPlace.coordinates.lat, randomPlace.coordinates.lng)} km from {activeOrigin.label}
                    </span>
                  </div>
                  {isRockClimbingSpot(randomPlace) && (
                    <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                      <span>🧗 Rock Climbing Crag</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-stone-200 leading-relaxed bg-stone-950/60 p-3 rounded-xl border border-stone-800">
                  {randomPlace.shortDesc}
                </p>

                {/* Sweet Spot Reason */}
                <div className="text-xs text-stone-300 bg-stone-800/50 p-2.5 rounded-lg border border-stone-700/60">
                  <span className="text-amber-400 font-bold block mb-0.5">💡 Why Visit:</span>
                  <span>{randomPlace.sweetSpotReason}</span>
                </div>

                {/* Anti-Guide Tip */}
                <div className="text-xs bg-red-950/20 border border-red-900/30 p-2.5 rounded-lg text-stone-300">
                  <strong className="text-emerald-400 block mb-0.5">✨ Local Recommendation:</strong>
                  <span>{randomPlace.offBeatenSwap}</span>
                </div>

                {/* Action Buttons with Direct Google Maps Route */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                  <button
                    onClick={() => {
                      setRandomModalOpen(false);
                      onSelectOnMap(randomPlace);
                    }}
                    className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs transition flex items-center justify-center space-x-1.5 border border-stone-700"
                  >
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>Trace on Live Map</span>
                  </button>

                  <a
                    href={getGoogleMapsRouteUrl(
                      randomPlace.coordinates.lat,
                      randomPlace.coordinates.lng,
                      randomPlace.name,
                      activeOrigin.lat,
                      activeOrigin.lng,
                      'driving'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs transition flex items-center justify-center space-x-1.5 shadow-lg shadow-emerald-950/50 border border-emerald-500/50"
                  >
                    <Navigation className="w-4 h-4 text-emerald-200" />
                    <span>Direct to Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => playSensorySound(randomPlace.sensory.soundType)}
                    className="w-full sm:w-auto py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 font-semibold text-xs transition flex items-center justify-center space-x-1 border border-stone-700"
                    title="Play ambient soundscape"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="sm:hidden">Soundscape</span>
                  </button>

                  <button
                    onClick={() => handlePickRandom('vibe')}
                    className="w-full sm:w-auto py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs transition flex items-center justify-center space-x-1 border border-stone-700"
                    title="Roll again for another spot"
                  >
                    <Dices className="w-4 h-4 text-amber-400" />
                    <span className="sm:hidden">Roll Again</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
