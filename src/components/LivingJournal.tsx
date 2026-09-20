import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Feather, PlusCircle, Trash2, MapPin, Calendar, Share2, Sparkles, X, Check } from 'lucide-react';
import { GPSLocation } from '../services/gpsService';

interface LivingJournalProps {
  userLocation: GPSLocation | null;
}

export const LivingJournal: React.FC<LivingJournalProps> = ({ userLocation }) => {
  const { journalEntries, addJournalEntry, deleteJournalEntry } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [notes, setNotes] = useState('');
  const [altitude, setAltitude] = useState<number>(1400);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&auto=format&fit=crop&q=80');
  const [tagsInput, setTagsInput] = useState('Himalayas, Serenity, Journey');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !destination) return;

    addJournalEntry({
      title,
      destination,
      date: new Date().toISOString().split('T')[0],
      notes,
      altitude,
      imageUrl,
      coordinates: userLocation ? { lat: userLocation.lat, lng: userLocation.lng } : undefined,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
    });

    setIsModalOpen(false);
    setTitle('');
    setDestination('');
    setNotes('');
  };

  const handleShareStory = () => {
    setCopiedShare(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
              <Feather className="w-3.5 h-3.5" />
              <span>Living Trip Scrapbook</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Living Travel Journal
            </h1>
            <p className="text-stone-300 text-sm mt-2">
              Auto-assemble photos, altitude memories, and sensory notes as you explore Nepal. When your journey finishes, your journal transforms into a cohesive story you can share with fellow returnees.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShareStory}
              className="py-2.5 px-4 bg-stone-800 hover:bg-stone-750 text-stone-200 hover:text-white font-semibold rounded-xl text-xs transition border border-stone-700 flex items-center space-x-1.5"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-amber-400" />}
              <span>{copiedShare ? 'Story Link Copied!' : 'Share Story'}</span>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition shadow-lg shadow-amber-500/20 flex items-center space-x-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Log Today&rsquo;s Memory</span>
            </button>
          </div>
        </div>
      </div>

      {/* Journal Cards Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {journalEntries.map((entry) => (
          <div
            key={entry.id}
            className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group transition hover:border-stone-700"
          >
            <div>
              {/* Photo preview */}
              {entry.imageUrl && (
                <div className="relative h-48 w-full overflow-hidden bg-stone-950">
                  <img
                    src={entry.imageUrl}
                    alt={entry.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-400 border border-stone-800">
                    {entry.altitude}m elevation
                  </div>
                </div>
              )}

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-[11px] text-stone-400">
                  <span className="flex items-center gap-1 text-amber-400 font-medium">
                    <MapPin className="w-3 h-3" />
                    {entry.destination}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {entry.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{entry.title}</h3>
                <p className="text-xs text-stone-300 leading-relaxed">{entry.notes}</p>

                {/* Tags */}
                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {entry.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full text-[10px] bg-stone-800 text-stone-300 border border-stone-700/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="px-5 py-3 border-t border-stone-800 flex items-center justify-between text-xs">
              <span className="text-[10px] text-stone-500">Synced to Local Passport</span>
              <button
                onClick={() => deleteJournalEntry(entry.id)}
                title="Remove entry"
                className="p-1 rounded text-stone-500 hover:text-rose-400 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Journal Memory Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-stone-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Feather className="w-4 h-4 text-amber-400" />
                <span>Log Travel Memory</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 font-medium mb-1">Entry Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Afternoon Tea with Monks at Kopan"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 font-medium mb-1">Destination</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kopan Monastery"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 font-medium mb-1">Current Altitude (m)</label>
                  <input
                    type="number"
                    value={altitude}
                    onChange={(e) => setAltitude(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">Photo Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">Notes &amp; Sensory Impressions</label>
                <textarea
                  rows={3}
                  required
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="What did you hear, smell, or feel that a photo couldn't capture?"
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white resize-none"
                />
              </div>

              <div>
                <label className="block text-stone-300 font-medium mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Monastery, Rain, Tea"
                  className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition"
              >
                Save to Living Journal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
