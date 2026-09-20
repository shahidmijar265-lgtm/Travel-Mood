import React, { useState } from 'react';
import { Calculator, DollarSign, Sparkles, Check, AlertCircle, Info } from 'lucide-react';

interface TrueCostCalculatorProps {
  currency: 'NPR' | 'USD' | 'EUR' | 'GBP' | 'INR';
  setCurrency: (c: 'NPR' | 'USD' | 'EUR' | 'GBP' | 'INR') => void;
}

export const TrueCostCalculator: React.FC<TrueCostCalculatorProps> = ({
  currency,
  setCurrency
}) => {
  const [days, setDays] = useState(10);
  const [travelStyle, setTravelStyle] = useState<'backpacker' | 'homestay' | 'comfort'>('homestay');
  const [region, setRegion] = useState<'cities' | 'annapurna' | 'everest' | 'mustang'>('annapurna');
  const [useWaterFilter, setUseWaterFilter] = useState(true);

  // Conversion rates baseline to NPR
  const rates: Record<string, number> = {
    NPR: 1,
    USD: 0.0075,
    EUR: 0.0069,
    GBP: 0.0059,
    INR: 0.625
  };

  const formatPrice = (nprAmount: number) => {
    const converted = nprAmount * rates[currency];
    const symbols: Record<string, string> = {
      NPR: 'रु ',
      USD: '$',
      EUR: '€',
      GBP: '£',
      INR: '₹'
    };
    return `${symbols[currency]}${Math.round(converted).toLocaleString()}`;
  };

  // Cost breakdowns per day in NPR
  const getDailyCosts = () => {
    let lodge = 1200;
    let food = 1500;
    let transport = 800;
    let trekPermits = 0;
    let extras = 600; // hot shower, wifi, device charging

    if (region === 'cities') {
      lodge = travelStyle === 'backpacker' ? 1000 : travelStyle === 'homestay' ? 2500 : 6000;
      food = travelStyle === 'backpacker' ? 1200 : travelStyle === 'homestay' ? 2200 : 4500;
      transport = travelStyle === 'backpacker' ? 400 : 1200;
      extras = 400;
    } else if (region === 'annapurna') {
      lodge = travelStyle === 'backpacker' ? 800 : travelStyle === 'homestay' ? 1500 : 3500;
      food = travelStyle === 'backpacker' ? 2000 : travelStyle === 'homestay' ? 2800 : 4000; // Dal Bhat rises with altitude
      transport = 600;
      trekPermits = 6000 / days; // ACAP + TIMS card amortized
      extras = 900; // hot showers 400 NPR, charging 300 NPR
    } else if (region === 'everest') {
      lodge = travelStyle === 'backpacker' ? 1500 : travelStyle === 'homestay' ? 2500 : 5000;
      food = 3200; // Namche to Gorak Shep food cost
      transport = 45000 / days; // Lukla roundtrip flight amortized
      trekPermits = 7000 / days; // Sagarmatha entry + Khumbu municipality
      extras = 1400; // 500 NPR hot shower, 400 NPR solar charge
    } else if (region === 'mustang') {
      lodge = 2500;
      food = 2500;
      transport = 30000 / days; // 4WD Jeep / flights
      trekPermits = 70000 / days; // $500 special restricted permit
      extras = 800;
    }

    const waterBottleSavings = useWaterFilter ? 400 * days : 0;
    const dailyTotal = lodge + food + transport + trekPermits + extras;
    const tripTotal = dailyTotal * days - waterBottleSavings;

    return { lodge, food, transport, trekPermits, extras, dailyTotal, tripTotal, waterBottleSavings };
  };

  const costs = getDailyCosts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>Realist Budget Simulator</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Nepal True Cost Calculator
        </h1>
        <p className="text-stone-300 text-sm mt-2 max-w-2xl">
          Unlike generic online budget tables that assume $15/day everywhere, we factor in real mountain altitude inflation, daily Dal Bhat plate refills, heating fees, hot shower surcharges, and permit amortization.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column (2 Cols) */}
        <div className="lg:col-span-2 bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-6">
          {/* Days slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-stone-300 mb-2">
              <label>Trip Duration: <strong className="text-amber-400 text-sm">{days} Days</strong></label>
              <span className="text-stone-500">1 to 30 days</span>
            </div>
            <input
              type="range"
              min="3"
              max="30"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Region selector */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
              Travel Geography
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'cities', label: 'Kathmandu & Pokhara', tip: 'Low transport, wide food choice' },
                { id: 'annapurna', label: 'Annapurna Circuit / ABC', tip: 'Medium altitude, affordable lodges' },
                { id: 'everest', label: 'Everest / Khumbu', tip: 'Lukla flights + high pass food' },
                { id: 'mustang', label: 'Upper Mustang', tip: '$500 Special Permit required' }
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRegion(r.id as any)}
                  className={`p-3 rounded-xl border text-left transition ${
                    region === r.id
                      ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow'
                      : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-750'
                  }`}
                >
                  <div className="text-xs font-bold">{r.label}</div>
                  <div className={`text-[10px] mt-1 ${region === r.id ? 'text-stone-900' : 'text-stone-400'}`}>
                    {r.tip}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Travel Style */}
          <div>
            <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-2">
              Lodging &amp; Comfort Style
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'backpacker', label: 'Budget Backpacker', desc: 'Dorms, standard tea house beds, public buses' },
                { id: 'homestay', label: 'Authentic Homestay', desc: 'Private room with local family, farm meals' },
                { id: 'comfort', label: 'Mountain Comfort', desc: 'En-suite heaters, private jeeps & boutique hotels' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setTravelStyle(s.id as any)}
                  className={`p-3 rounded-xl border text-left transition ${
                    travelStyle === s.id
                      ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow'
                      : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-750'
                  }`}
                >
                  <div className="text-xs font-bold">{s.label}</div>
                  <div className={`text-[10px] mt-1 ${travelStyle === s.id ? 'text-stone-900' : 'text-stone-400'}`}>
                    {s.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Money-saving toggle: Water Purification Tablets */}
          <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Use Water Purifier / Aquatabs Filter
              </span>
              <p className="text-[11px] text-stone-400">
                Plastic bottled water costs 150-400 NPR per bottle high in the mountains. A filter saves thousands and protects Himalayan ecology.
              </p>
            </div>
            <button
              onClick={() => setUseWaterFilter(!useWaterFilter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                useWaterFilter ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-stone-400'
              }`}
            >
              {useWaterFilter ? 'Active (Saving)' : 'Disabled'}
            </button>
          </div>
        </div>

        {/* Output Summary Card (1 Col) */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h2 className="text-sm font-bold text-white">Estimated True Cost</h2>
              <span className="text-xs text-stone-400">Currency: {currency}</span>
            </div>

            {/* Big Total Price */}
            <div className="my-4 p-4 rounded-xl bg-stone-950 border border-stone-800 text-center">
              <span className="text-xs text-stone-400 uppercase tracking-wider block">Estimated Total for {days} Days</span>
              <div className="text-3xl font-extrabold text-amber-400 mt-1">
                {formatPrice(costs.tripTotal)}
              </div>
              <div className="text-xs text-emerald-400 mt-1">
                ~ {formatPrice(costs.dailyTotal)} / day average
              </div>
            </div>

            {/* Itemized breakdown */}
            <div className="space-y-2 text-xs divide-y divide-stone-800/60">
              <div className="flex justify-between py-1.5">
                <span className="text-stone-400">Lodge / Homestay:</span>
                <span className="text-stone-200 font-medium">{formatPrice(costs.lodge * days)}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-stone-400">Food &amp; Dal Bhat Refills:</span>
                <span className="text-stone-200 font-medium">{formatPrice(costs.food * days)}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-stone-400">Transfers &amp; Flights:</span>
                <span className="text-stone-200 font-medium">{formatPrice(costs.transport * days)}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-stone-400">Permits (TIMS/ACAP):</span>
                <span className="text-stone-200 font-medium">{formatPrice(costs.trekPermits * days)}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-stone-400">Mountain Extras (Showers/Charging):</span>
                <span className="text-stone-200 font-medium">{formatPrice(costs.extras * days)}</span>
              </div>

              {useWaterFilter && (
                <div className="flex justify-between py-1.5 text-emerald-400 font-bold">
                  <span>Eco Filter Savings:</span>
                  <span>- {formatPrice(costs.waterBottleSavings)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Realistic Price Index Callout */}
          <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 text-[11px] text-stone-300 space-y-1">
            <div className="text-amber-400 font-semibold flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              <span>Realist Price Anchors</span>
            </div>
            <div>&bull; Unlimited Dal Bhat Plate: NPR 250 - 450</div>
            <div>&bull; Hot Gas Shower on Trek: NPR 350 - 500</div>
            <div>&bull; Local SIM Card with 20GB Data: NPR 600</div>
          </div>
        </div>
      </div>
    </div>
  );
};
