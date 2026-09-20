import React, { useState } from 'react';
import { INITIAL_ANTI_GUIDES } from '../data/antiGuides';
import { AntiGuideItem } from '../types/travel';
import { BookOpen, ThumbsUp, PlusCircle, X, Check, ShieldAlert, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AntiGuides: React.FC = () => {
  const [guides, setGuides] = useState<AntiGuideItem[]>(INITIAL_ANTI_GUIDES);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isLoggedIn } = useAuth();

  // New Anti Guide form state
  const [newDestination, setNewDestination] = useState('');
  const [newTripDuration, setNewTripDuration] = useState('');
  const [newSkip, setNewSkip] = useState('');
  const [newWhySkip, setNewWhySkip] = useState('');
  const [newWishDone, setNewWishDone] = useState('');
  const [newSecretTip, setNewSecretTip] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleUpvote = (id: string) => {
    setGuides((prev) =>
      prev.map((g) => (g.id === id ? { ...g, upvotes: g.upvotes + 1 } : g))
    );
  };

  const handleAddGuide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDestination || !newSkip || !newWishDone) return;

    const newGuide: AntiGuideItem = {
      id: `ag-${Date.now()}`,
      destinationId: newDestination.toLowerCase().replace(/\s+/g, '-'),
      destinationName: newDestination,
      authorName: user?.name || 'Fellow Traveler',
      authorAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      visitedDate: 'Just submitted',
      tripDuration: newTripDuration || '1 week',
      whatISkipped: newSkip,
      whySkip: newWhySkip || 'Overcrowded and commercialized',
      whatIWishedIDone: newWishDone,
      secretTip: newSecretTip || 'Ask lodge owners for local ridge paths',
      upvotes: 1
    };

    setGuides([newGuide, ...guides]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setIsModalOpen(false);
      setNewDestination('');
      setNewSkip('');
      setNewWhySkip('');
      setNewWishDone('');
      setNewSecretTip('');
    }, 1200);
  };

  const filteredGuides =
    selectedRegion === 'all'
      ? guides
      : guides.filter((g) => g.destinationName.toLowerCase().includes(selectedRegion.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Crowdsourced Anti-Guides</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Regret-Free Itineraries
            </h1>
            <p className="text-stone-300 text-sm mt-2">
              Every travel guidebook tells you what to see. We tell you <strong>what to skip</strong> and what returnees wish they had done instead, saving you precious days and tourist disappointment.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition shadow-lg shadow-amber-500/20 flex items-center space-x-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Your Anti-Guide</span>
          </button>
        </div>

        {/* Region Filter Chips */}
        <div className="mt-5 pt-4 border-t border-stone-800 flex flex-wrap gap-2">
          {['all', 'Annapurna', 'Kathmandu', 'Everest', 'Pokhara'].map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedRegion === region
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {region === 'all' ? 'All Destinations' : region}
            </button>
          ))}
        </div>
      </div>

      {/* Anti-Guides Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredGuides.map((item) => (
          <div
            key={item.id}
            className="bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition"
          >
            <div>
              {/* Author and Destination Tag */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.authorAvatar}
                    alt={item.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                  />
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      {item.authorName}
                    </div>
                    <div className="text-[11px] text-stone-400">
                      {item.visitedDate} &bull; {item.tripDuration}
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-800 text-amber-300 border border-stone-700">
                  {item.destinationName}
                </span>
              </div>

              {/* What I Skipped Block */}
              <div className="p-3 rounded-xl bg-red-950/20 border border-red-900/30 text-xs mb-3 space-y-1">
                <div className="text-red-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  WHAT I&rsquo;D SKIP:
                </div>
                <p className="text-stone-200 font-medium">{item.whatISkipped}</p>
                <p className="text-stone-400 text-[11px] italic">Why: &ldquo;{item.whySkip}&rdquo;</p>
              </div>

              {/* What I Wish I Done Block */}
              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/30 text-xs mb-3 space-y-1">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  WHAT I WISH I&rsquo;D DONE INSTEAD:
                </div>
                <p className="text-stone-100">{item.whatIWishedIDone}</p>
              </div>

              {/* Secret Tip */}
              {item.secretTip && (
                <div className="p-2.5 rounded-lg bg-stone-950/60 border border-stone-800 text-xs text-stone-300">
                  <span className="text-amber-400 font-semibold mr-1.5">🔑 Local Secret:</span>
                  {item.secretTip}
                </div>
              )}
            </div>

            {/* Upvote & Actions */}
            <div className="pt-4 mt-4 border-t border-stone-800 flex items-center justify-between text-xs">
              <button
                onClick={() => handleUpvote(item.id)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition"
              >
                <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
                <span>Found this helpful ({item.upvotes})</span>
              </button>
              <span className="text-[11px] text-stone-500">Verified Returnee Audit</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal to Submit New Anti-Guide */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl text-stone-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Share Your Honest Nepal Anti-Guide</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedMessage ? (
              <div className="p-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Thank You for Saving Fellow Travelers!</h3>
                <p className="text-xs text-stone-400">Your regret-free tip is now live on the anti-guide board.</p>
              </div>
            ) : (
              <form onSubmit={handleAddGuide} className="p-6 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Destination Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pokhara Lakeside, Chitwan, etc."
                      value={newDestination}
                      onChange={(e) => setNewDestination(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-300 font-medium mb-1">Trip Duration</label>
                    <input
                      type="text"
                      placeholder="e.g. 5 days, 10-day trek"
                      value={newTripDuration}
                      onChange={(e) => setNewTripDuration(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-red-400 font-semibold mb-1">What would you skip next time?</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The 4am Poon Hill sunrise crowd, central Thamel souvenir shops"
                    value={newSkip}
                    onChange={(e) => setNewSkip(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">Why skip it?</label>
                  <input
                    type="text"
                    placeholder="e.g. 600 people with drones, 300% tourist markup, traffic dust"
                    value={newWhySkip}
                    onChange={(e) => setNewWhySkip(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-emerald-400 font-semibold mb-1">What do you wish you had done instead?</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="e.g. Hiked Mulde Peak instead, stayed in a Newari Patan homestay"
                    value={newWishDone}
                    onChange={(e) => setNewWishDone(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-amber-400 font-semibold mb-1">One Secret Tip for fellow yatris:</label>
                  <input
                    type="text"
                    placeholder="e.g. Drink hot ginger lemon honey, get local SIM at airport exit"
                    value={newSecretTip}
                    onChange={(e) => setNewSecretTip(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-sm transition"
                >
                  Publish Anti-Guide Tip
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
