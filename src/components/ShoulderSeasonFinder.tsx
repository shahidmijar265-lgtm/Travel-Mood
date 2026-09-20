import React, { useState } from 'react';
import { CloudSun, DollarSign, Users, Sparkles, TrendingUp, Info } from 'lucide-react';

interface DestinationSeasonData {
  id: string;
  name: string;
  region: string;
  summary: string;
  sweetSpotMonths: string[];
  monthsData: {
    month: string;
    weatherScore: number; // 1-10
    priceScore: number; // 1-10 (10 = cheapest, 1 = peak expensive)
    crowdScore: number; // 1-10 (10 = empty, 1 = jammed)
    overallIndex: number;
    verdict: 'Peak' | 'Sweet Spot' | 'Chilly' | 'Monsoon' | 'Off-Peak';
    tip: string;
  }[];
}

const SEASON_DATA: DestinationSeasonData[] = [
  {
    id: 'annapurna-pokhara',
    name: 'Annapurna & Pokhara Valley',
    region: 'Central Mid-Hills',
    summary: 'While Oct-Nov is packed and Mar-Apr is busy with trekkers, late February and late November offer crystal skies, 40% cheaper lodges, and quiet trails.',
    sweetSpotMonths: ['Feb', 'Nov'],
    monthsData: [
      { month: 'Jan', weatherScore: 6, priceScore: 9, crowdScore: 9, overallIndex: 8.0, verdict: 'Chilly', tip: 'Cold nights, but empty trails and crystal mornings.' },
      { month: 'Feb', weatherScore: 8, priceScore: 8, crowdScore: 9, overallIndex: 8.4, verdict: 'Sweet Spot', tip: 'Sun warms up, blooming rhododendrons start, zero crowd.' },
      { month: 'Mar', weatherScore: 9, priceScore: 6, crowdScore: 5, overallIndex: 6.6, verdict: 'Peak', tip: 'Peak trekking season begins; rhododendrons at full bloom.' },
      { month: 'Apr', weatherScore: 8, priceScore: 5, crowdScore: 4, overallIndex: 5.6, verdict: 'Peak', tip: 'Warm afternoons, haze in valleys, high prices.' },
      { month: 'May', weatherScore: 7, priceScore: 8, crowdScore: 8, overallIndex: 7.6, verdict: 'Off-Peak', tip: 'Pre-monsoon heat, quiet lodges, mountain cloud build-up.' },
      { month: 'Jun', weatherScore: 4, priceScore: 10, crowdScore: 10, overallIndex: 8.0, verdict: 'Monsoon', tip: 'Leeches on trails, heavy rain, lush green rice terraces.' },
      { month: 'Jul', weatherScore: 3, priceScore: 10, crowdScore: 10, overallIndex: 7.6, verdict: 'Monsoon', tip: 'Peak monsoon; high risk of highway landslides.' },
      { month: 'Aug', weatherScore: 3, priceScore: 10, crowdScore: 10, overallIndex: 7.6, verdict: 'Monsoon', tip: 'Monsoon clearing late in month; rivers roar.' },
      { month: 'Sep', weatherScore: 7, priceScore: 7, crowdScore: 7, overallIndex: 7.0, verdict: 'Sweet Spot', tip: 'Post-monsoon freshness, lush hills, clear air returning.' },
      { month: 'Oct', weatherScore: 10, priceScore: 3, crowdScore: 2, overallIndex: 5.0, verdict: 'Peak', tip: 'Flawless views, but trail queues and full tea houses.' },
      { month: 'Nov', weatherScore: 9, priceScore: 7, crowdScore: 8, overallIndex: 8.0, verdict: 'Sweet Spot', tip: 'Deep blue skies, crisp weather, 70% fewer trekkers than Oct.' },
      { month: 'Dec', weatherScore: 7, priceScore: 9, crowdScore: 9, overallIndex: 8.3, verdict: 'Chilly', tip: 'Crisp sunny days, chilly nights, bargain rates.' }
    ]
  },
  {
    id: 'upper-mustang',
    name: 'Upper Mustang (Rain Shadow)',
    region: 'Trans-Himalayan Plateau',
    summary: 'The great geographical anomaly! Sitting behind the 8,000m Annapurna barrier, Mustang receives zero monsoon rain in July-August, making summer the perfect sweet spot.',
    sweetSpotMonths: ['Jun', 'Jul', 'Aug'],
    monthsData: [
      { month: 'Jan', weatherScore: 3, priceScore: 8, crowdScore: 10, overallIndex: 7.0, verdict: 'Chilly', tip: 'Deep sub-zero freeze; locals migrate down to Pokhara.' },
      { month: 'Feb', weatherScore: 4, priceScore: 8, crowdScore: 10, overallIndex: 7.3, verdict: 'Chilly', tip: 'Still freezing with occasional snow on high passes.' },
      { month: 'Mar', weatherScore: 6, priceScore: 7, crowdScore: 9, overallIndex: 7.3, verdict: 'Off-Peak', tip: 'Locals return; lodges open; windy afternoons.' },
      { month: 'Apr', weatherScore: 8, priceScore: 6, crowdScore: 7, overallIndex: 7.0, verdict: 'Peak', tip: 'Pleasant daytime trekking; spring festivals.' },
      { month: 'May', weatherScore: 9, priceScore: 4, crowdScore: 4, overallIndex: 5.6, verdict: 'Peak', tip: 'Tiji Festival in Lo Manthang; fully booked lodges.' },
      { month: 'Jun', weatherScore: 9, priceScore: 8, crowdScore: 8, overallIndex: 8.3, verdict: 'Sweet Spot', tip: 'Dry high desert weather, barley fields bright green.' },
      { month: 'Jul', weatherScore: 9, priceScore: 9, crowdScore: 9, overallIndex: 9.0, verdict: 'Sweet Spot', tip: 'Zero rain while rest of Nepal is soaked! Absolute solitude.' },
      { month: 'Aug', weatherScore: 9, priceScore: 9, crowdScore: 9, overallIndex: 9.0, verdict: 'Sweet Spot', tip: 'Apple orchards fruit; warm daytime temperatures.' },
      { month: 'Sep', weatherScore: 9, priceScore: 7, crowdScore: 7, overallIndex: 7.6, verdict: 'Sweet Spot', tip: 'Golden harvest time; dry desert winds.' },
      { month: 'Oct', weatherScore: 9, priceScore: 4, crowdScore: 4, overallIndex: 5.6, verdict: 'Peak', tip: 'High season; jeep tracks busy with tour groups.' },
      { month: 'Nov', weatherScore: 7, priceScore: 7, crowdScore: 8, overallIndex: 7.3, verdict: 'Off-Peak', tip: 'Temperatures drop sharply after sunset.' },
      { month: 'Dec', weatherScore: 4, priceScore: 8, crowdScore: 10, overallIndex: 7.3, verdict: 'Chilly', tip: 'Winter sets in, passes can freeze.' }
    ]
  },
  {
    id: 'everest-khumbu',
    name: 'Everest / Khumbu Region',
    region: 'High Himalaya',
    summary: 'Avoid the October stampede of 1,000 hikers per day on the Lukla trail. Late November or early December gives pure crystal views and warm woodstoves in half-empty lodges.',
    sweetSpotMonths: ['Nov', 'Dec', 'May'],
    monthsData: [
      { month: 'Jan', weatherScore: 4, priceScore: 9, crowdScore: 10, overallIndex: 7.6, verdict: 'Chilly', tip: 'Extremely cold (-20°C at night), but stunning emptiness.' },
      { month: 'Feb', weatherScore: 5, priceScore: 9, crowdScore: 9, overallIndex: 7.6, verdict: 'Chilly', tip: 'Winter sun on south faces; warm down jacket essential.' },
      { month: 'Mar', weatherScore: 8, priceScore: 6, crowdScore: 6, overallIndex: 6.6, verdict: 'Peak', tip: 'Spring mountaineering expeditions arriving.' },
      { month: 'Apr', weatherScore: 9, priceScore: 4, crowdScore: 3, overallIndex: 5.3, verdict: 'Peak', tip: 'Base camp bustling with summit teams and helicopters.' },
      { month: 'May', weatherScore: 8, priceScore: 7, crowdScore: 6, overallIndex: 7.0, verdict: 'Sweet Spot', tip: 'Summit window opens; warmer nights at high altitude.' },
      { month: 'Jun', weatherScore: 4, priceScore: 10, crowdScore: 10, overallIndex: 8.0, verdict: 'Monsoon', tip: 'Flights to Lukla regularly cancelled due to cloud base.' },
      { month: 'Jul', weatherScore: 2, priceScore: 10, crowdScore: 10, overallIndex: 7.3, verdict: 'Monsoon', tip: 'Lukla airport shut for days; wet slippery trails.' },
      { month: 'Aug', weatherScore: 3, priceScore: 10, crowdScore: 10, overallIndex: 7.6, verdict: 'Monsoon', tip: 'Heavy mountain mists, high altitude pastures bloom.' },
      { month: 'Sep', weatherScore: 7, priceScore: 6, crowdScore: 6, overallIndex: 6.3, verdict: 'Off-Peak', tip: 'End of monsoon; early autumn views emerging.' },
      { month: 'Oct', weatherScore: 10, priceScore: 2, crowdScore: 1, overallIndex: 4.3, verdict: 'Peak', tip: 'Maximum crowds; dining halls packed shoulder-to-shoulder.' },
      { month: 'Nov', weatherScore: 9, priceScore: 7, crowdScore: 7, overallIndex: 7.6, verdict: 'Sweet Spot', tip: 'Clearest air of the year; crowd thins dramatically.' },
      { month: 'Dec', weatherScore: 7, priceScore: 8, crowdScore: 9, overallIndex: 8.0, verdict: 'Sweet Spot', tip: 'Cold nights, but sunny days and zero flight delays.' }
    ]
  }
];

export const ShoulderSeasonFinder: React.FC = () => {
  const [selectedDestId, setSelectedDestId] = useState('annapurna-pokhara');
  const currentDest = SEASON_DATA.find((d) => d.id === selectedDestId) || SEASON_DATA[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Travel Sweet-Spot Index</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Shoulder Season Finder
        </h1>
        <p className="text-stone-300 text-sm mt-2 max-w-3xl">
          Don&rsquo;t get caught in the October crowd squeeze or pay double for tea house beds. Discover the golden windows where weather is decent, accommodation prices are low, and trails are peacefully thin.
        </p>

        {/* Destination selector tabs */}
        <div className="flex flex-wrap gap-2 mt-5">
          {SEASON_DATA.map((dest) => (
            <button
              key={dest.id}
              onClick={() => setSelectedDestId(dest.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                selectedDestId === dest.id
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white border border-stone-700'
              }`}
            >
              {dest.name}
            </button>
          ))}
        </div>
      </div>

      {/* Destination Overview Card */}
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-stone-300 flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 mt-0.5">
          <Info className="w-4 h-4" />
        </div>
        <div>
          <strong className="text-white block font-semibold mb-1">
            {currentDest.name} Analysis &bull; Recommended Sweet Spot Months:{' '}
            <span className="text-emerald-400">{currentDest.sweetSpotMonths.join(', ')}</span>
          </strong>
          <span>{currentDest.summary}</span>
        </div>
      </div>

      {/* Month-by-Month Matrix */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-stone-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>12-Month Sweet Spot Matrix (Scores out of 10)</span>
          </h2>
          <div className="flex items-center space-x-3 text-xs text-stone-400">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Sweet Spot</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Peak / Crowded</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-950 text-stone-400 uppercase tracking-wider font-semibold border-b border-stone-800">
              <tr>
                <th className="py-3 px-4">Month</th>
                <th className="py-3 px-3">Verdict</th>
                <th className="py-3 px-3">Weather</th>
                <th className="py-3 px-3">Low Prices</th>
                <th className="py-3 px-3">Low Crowds</th>
                <th className="py-3 px-3">Sweet Spot Index</th>
                <th className="py-3 px-4">Insider Strategy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800 text-stone-200">
              {currentDest.monthsData.map((m) => {
                const isSweetSpot = m.verdict === 'Sweet Spot';
                return (
                  <tr
                    key={m.month}
                    className={`transition hover:bg-stone-800/40 ${
                      isSweetSpot ? 'bg-emerald-950/20 font-medium' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-bold text-white">
                      {m.month}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        m.verdict === 'Sweet Spot'
                          ? 'bg-emerald-500 text-stone-950'
                          : m.verdict === 'Peak'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : m.verdict === 'Monsoon'
                          ? 'bg-blue-950 text-blue-300 border border-blue-800'
                          : 'bg-stone-800 text-stone-400'
                      }`}>
                        {m.verdict}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center space-x-1.5">
                        <div className="w-12 bg-stone-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-amber-400 h-full rounded-full"
                            style={{ width: `${m.weatherScore * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-stone-300">{m.weatherScore}/10</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center space-x-1.5">
                        <div className="w-12 bg-stone-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-emerald-400 h-full rounded-full"
                            style={{ width: `${m.priceScore * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-stone-300">{m.priceScore}/10</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center space-x-1.5">
                        <div className="w-12 bg-stone-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-blue-400 h-full rounded-full"
                            style={{ width: `${m.crowdScore * 10}%` }}
                          ></div>
                        </div>
                        <span className="text-stone-300">{m.crowdScore}/10</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`text-sm font-extrabold ${
                        isSweetSpot ? 'text-emerald-400' : 'text-stone-300'
                      }`}>
                        {m.overallIndex.toFixed(1)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-400 max-w-xs text-[11px]">
                      {m.tip}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
