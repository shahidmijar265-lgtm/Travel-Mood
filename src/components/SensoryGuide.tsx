import React, { useState } from 'react';
import { NEPAL_DESTINATIONS } from '../data/nepalDestinations';
import { Destination } from '../types/travel';
import { Volume2, Wind, Sparkles, Droplets, Feather } from 'lucide-react';
import { playSensorySound } from '../services/audioSynth';

export const SensoryGuide: React.FC = () => {
  const [selectedDest, setSelectedDest] = useState<Destination>(NEPAL_DESTINATIONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlaySound = (type: any) => {
    setIsPlaying(true);
    playSensorySound(type, 4);
    setTimeout(() => setIsPlaying(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Non-Visual Atmosphere Exploration</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Nepal Sensory Guide
          </h1>
          <p className="text-stone-300 text-sm mt-2">
            Most travel websites show glossy photos. The true spirit of Nepal is non-visual: the deep harmonic resonance of bronze singing bowls, the smell of burning mountain juniper (Sang), the cold spray of glacial rivers, and textures of hand-spun yak wool.
          </p>
        </div>

        {/* Destination selector chips */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-stone-800">
          {NEPAL_DESTINATIONS.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDest(d)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                selectedDest.id === d.id
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700 hover:text-white border border-stone-700'
              }`}
            >
              {d.name}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Destination Sensory Board */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Sensory Profile &bull; {selectedDest.region}
            </span>
            <h2 className="text-xl font-bold text-white mt-0.5">{selectedDest.name}</h2>
            <p className="text-xs text-stone-400">{selectedDest.altitude} meters above sea level</p>
          </div>

          <button
            onClick={() => handlePlaySound(selectedDest.sensory.soundType)}
            disabled={isPlaying}
            className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold text-xs transition flex items-center space-x-2 shadow-lg shadow-amber-500/20 cursor-pointer"
          >
            <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
            <span>{isPlaying ? 'Synthesizing Audio Soundscape...' : 'Play Ambient Soundscape'}</span>
          </button>
        </div>

        {/* 3 Sensory Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Sound */}
          <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Volume2 className="w-4 h-4" />
              <span>Acoustics &amp; Sounds</span>
            </div>
            <p className="text-xs text-stone-200 leading-relaxed">
              {selectedDest.sensory.sound}
            </p>
            <div className="text-[11px] text-stone-500 pt-1">
              Engine sound type: <strong className="text-stone-400">{selectedDest.sensory.soundType.replace('_', ' ')}</strong>
            </div>
          </div>

          {/* Smell */}
          <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
            <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <Wind className="w-4 h-4" />
              <span>Aromas &amp; Mountain Air</span>
            </div>
            <p className="text-xs text-stone-200 leading-relaxed">
              {selectedDest.sensory.smell}
            </p>
            <div className="text-[11px] text-stone-500 pt-1">
              Natural atmospheric terpenes
            </div>
          </div>

          {/* Texture */}
          <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
            <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Feather className="w-4 h-4" />
              <span>Tactile Sensations</span>
            </div>
            <p className="text-xs text-stone-200 leading-relaxed">
              {selectedDest.sensory.texture}
            </p>
            <div className="text-[11px] text-stone-500 pt-1">
              Temperature and physical touch
            </div>
          </div>
        </div>

        {/* Unexpected Sensory Surprises */}
        <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs space-y-2">
          <div className="text-amber-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Unexpected Nuances That Photos Miss:</span>
          </div>
          <ul className="list-disc pl-5 space-y-1 text-stone-300">
            {selectedDest.sensory.surprises.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
