import React, { useState } from 'react';
import { SLOW_TRAVEL_LISTINGS, PURPOSE_ROUTES } from '../data/nicheTravel';
import { NEPAL_DESTINATIONS } from '../data/nepalDestinations';
import { Radio, Wifi, Home, HeartHandshake, Compass, Check, AlertCircle, Accessibility, Utensils } from 'lucide-react';

interface NicheAnglesProps {
  currency: 'NPR' | 'USD' | 'EUR' | 'GBP' | 'INR';
}

export const NicheAngles: React.FC<NicheAnglesProps> = ({ currency }) => {
  const [activeTab, setActiveTab] = useState<'slow' | 'purpose' | 'accessibility'>('slow');

  const rates: Record<string, number> = {
    NPR: 1,
    USD: 0.0075,
    EUR: 0.0069,
    GBP: 0.0059,
    INR: 0.625
  };

  const formatPrice = (npr: number) => {
    const val = npr * rates[currency];
    const symbols: Record<string, string> = { NPR: 'रु ', USD: '$', EUR: '€', GBP: '£', INR: '₹' };
    return `${symbols[currency]}${Math.round(val).toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Radio className="w-3.5 h-3.5" />
            <span>Deeper Travel Horizons</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Niche Perspectives &amp; Slow Travel
          </h1>
          <p className="text-stone-300 text-sm mt-2">
            Move past standard 7-day tour packages. Discover verified monthly stays with fiber optic broadband, purposeful thematic journeys, and comprehensive accessibility &amp; dietary audits.
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-stone-800">
          <button
            onClick={() => setActiveTab('slow')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'slow' ? 'bg-amber-500 text-stone-950 shadow-md' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Slow Travel &amp; Extended Stay ({SLOW_TRAVEL_LISTINGS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('purpose')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'purpose' ? 'bg-amber-500 text-stone-950 shadow-md' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Travel With a Purpose ({PURPOSE_ROUTES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('accessibility')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'accessibility' ? 'bg-amber-500 text-stone-950 shadow-md' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <Accessibility className="w-4 h-4" />
            <span>Accessibility &amp; Dietary Audits</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Slow Travel */}
      {activeTab === 'slow' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Verified 1 to 3 months long-stay residences with high-speed internet</span>
            <span>Remote work &amp; village immersion</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SLOW_TRAVEL_LISTINGS.map((spot) => (
              <div
                key={spot.id}
                className="bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                        {spot.stayType}
                      </span>
                      <h2 className="text-base font-bold text-white">{spot.title}</h2>
                      <div className="text-xs text-stone-400">{spot.location}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-bold text-emerald-400">
                        {formatPrice(spot.monthlyNPR)}
                      </div>
                      <span className="text-[10px] text-stone-400">per month</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-xs bg-stone-950 p-2.5 rounded-xl border border-stone-800 my-3">
                    <div className="flex items-center space-x-1.5 text-stone-200">
                      <Wifi className="w-4 h-4 text-emerald-400" />
                      <span>{spot.internetSpeedMbps} Mbps Fiber</span>
                    </div>
                    <span className="text-stone-600">|</span>
                    <div className="flex items-center space-x-1.5 text-stone-200">
                      <HeartHandshake className="w-4 h-4 text-amber-400" />
                      <span>{spot.volunteeringAvailable ? 'Volunteering Optional' : 'Pure Residency'}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-stone-300">
                    <span className="text-[11px] font-semibold text-stone-400 block mb-1">Monthly Perks:</span>
                    {spot.perks.map((p, idx) => (
                      <div key={idx} className="flex items-start space-x-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-800 text-right">
                  <button className="px-4 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-semibold border border-stone-700 transition">
                    Inquire for Long-Stay Dates
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Travel With a Purpose */}
      {activeTab === 'purpose' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PURPOSE_ROUTES.map((route) => (
              <div
                key={route.id}
                className="bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl p-5 shadow-lg space-y-3 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {route.theme}
                  </span>
                  <span className="text-xs text-stone-400 font-medium">{route.durationDays} Days Duration</span>
                </div>

                <h2 className="text-base font-bold text-white leading-snug">{route.title}</h2>
                <p className="text-xs text-stone-300 leading-relaxed">{route.routeSummary}</p>

                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-xs space-y-1.5">
                  <span className="text-stone-400 font-semibold block">Thematic Highlights:</span>
                  {route.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start space-x-1.5 text-stone-300">
                      <span className="text-amber-400 font-bold">&bull;</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Accessibility & Dietary */}
      {activeTab === 'accessibility' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300 flex items-center justify-between">
            <span>Verified audits covering wheelchair paths, handrails, step terrain, gluten/dairy dietary access, and altitude advisory</span>
            <span className="text-emerald-400 font-semibold">Nepal Inclusive Travel Standard</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {NEPAL_DESTINATIONS.map((dest) => (
              <div
                key={dest.id}
                className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-lg space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-white">{dest.name}</h2>
                    <div className="text-[11px] text-stone-400">{dest.region} &bull; {dest.altitude}m</div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    dest.accessibility.mobilityRating === 'Good'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : dest.accessibility.mobilityRating === 'Moderate'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}>
                    Mobility: {dest.accessibility.mobilityRating}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 space-y-0.5">
                    <span className="text-amber-400 font-semibold flex items-center gap-1">
                      <Accessibility className="w-3.5 h-3.5" />
                      Terrain &amp; Step Details:
                    </span>
                    <p className="text-stone-300">{dest.accessibility.wheelchairNotes}</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 space-y-0.5">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Utensils className="w-3.5 h-3.5" />
                      Dietary (Vegetarian / Vegan / Celiac):
                    </span>
                    <p className="text-stone-300">{dest.accessibility.dietaryNotes}</p>
                  </div>

                  {dest.accessibility.altitudeWarning && (
                    <div className="p-2 rounded-lg bg-red-950/30 border border-red-900/40 text-red-300 text-[11px] flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Altitude advisory: Over 3,500m. Acclimatization buffer required.</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
