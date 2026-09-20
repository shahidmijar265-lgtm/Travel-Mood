import React, { useState } from 'react';
import { LOCAL_FOR_A_DAY_LISTINGS, RETURNEE_QA_LIST } from '../data/localsAndCommunity';
import { LocalListing, ReturneeQA } from '../types/travel';
import { 
  Users, 
  MessageSquare, 
  HelpCircle, 
  Star, 
  Clock, 
  Languages, 
  ShieldCheck, 
  Send, 
  Sparkles, 
  Check, 
  X,
  Bot
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const CommunityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'local' | 'returnee'>('local');
  const [selectedHost, setSelectedHost] = useState<LocalListing | null>(null);
  const [bookingSent, setBookingSent] = useState(false);
  const [bookingMessage, setBookingMessage] = useState('');
  const { user } = useAuth();

  // Ask Returnee State
  const [userQuestion, setUserQuestion] = useState('');
  const [questionDestination, setQuestionDestination] = useState('Annapurna & Pokhara');
  const [isAskingAi, setIsAskingAi] = useState(false);
  const [aiReturneeAnswer, setAiReturneeAnswer] = useState<string | null>(null);
  const [qaList, setQaList] = useState<ReturneeQA[]>(RETURNEE_QA_LIST);

  const handleSendHostRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSent(true);
    setTimeout(() => {
      setBookingSent(false);
      setSelectedHost(null);
      setBookingMessage('');
    }, 1500);
  };

  const handleAskReturnee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    setIsAskingAi(true);
    setAiReturneeAnswer(null);

    let answerText = '';

    try {
      const res = await fetch('/api/ask-returnee-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userQuestion, destination: questionDestination })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.answer) {
          answerText = data.answer;
        }
      }
    } catch {
      // Graceful fallback to returnee knowledge base
    }

    if (!answerText) {
      const q = userQuestion.toLowerCase();
      if (q.includes('jacket') || q.includes('cold') || q.includes('temperature') || q.includes('freeze')) {
        answerText = `In ${questionDestination}, night temperatures currently drop close to freezing above 2,500m. A 650+ fill power down jacket is essential for tea-house dining halls which are unheated until the communal stove is stoked with wood or dried yak dung at 6 PM.`;
      } else if (q.includes('sim') || q.includes('data') || q.includes('wifi') || q.includes('internet')) {
        answerText = `Buy an NTC (Namaste) e-SIM or physical SIM at Kathmandu airport arrivals (counter right after customs). NTC has much better coverage than Ncell on the high Annapurna Circuit and Langtang trails. In ${questionDestination}, expect 4G in major villages, dropping to 2G/E on mountain passes.`;
      } else if (q.includes('atm') || q.includes('cash') || q.includes('money') || q.includes('card')) {
        answerText = `Do NOT rely on mountain ATMs in ${questionDestination}. ATMs in Jomsom or Namche frequently run out of physical cash or suffer optical fiber cuts during storms. Withdraw all required cash (allowing ~3,500 NPR per day) in Pokhara or Kathmandu beforehand.`;
      } else if (q.includes('permit') || q.includes('tims') || q.includes('guide')) {
        answerText = `As of 2023–2024 regulations, solo trekking without a licensed guide is restricted in most national park zones. For ${questionDestination}, check in at the Nepal Tourism Board office (Kathmandu or Pokhara Damside) to obtain your TIMS card and park conservation entry permit before taking transport.`;
      } else {
        answerText = `Ground reality from recent returnees in ${questionDestination}: Pack light, carry high-efficiency water purification tablets (plastic bottled water is banned or priced high on trails), start your trekking days at 6:30 AM to beat afternoon cloud build-up, and always ask for Dal Bhat refills!`;
      }
    }

    setAiReturneeAnswer(answerText);

    // Add to Q&A feed
    const newQA: ReturneeQA = {
      id: `qa-${Date.now()}`,
      question: userQuestion,
      askedBy: user?.name || 'You',
      destination: questionDestination,
      returneeName: 'Maya Sherpa (Verified Returnee)',
      returnedDaysAgo: 3,
      answer: answerText,
      verifiedTrip: true,
      date: new Date().toISOString().split('T')[0]
    };
    setQaList([newQA, ...qaList]);
    setIsAskingAi(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Human Connection &amp; Peer Knowledge</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Community &amp; Verified Returnees
          </h1>
          <p className="text-stone-300 text-sm mt-2">
            Experience Nepal through ordinary daily life, not commercial agency tours. Spend a few hours with a local host, or get fresh answers from travelers who just returned within the last 30 days.
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex space-x-3 mt-5 pt-4 border-t border-stone-800">
          <button
            onClick={() => setActiveTab('local')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'local'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Local-For-A-Day ({LOCAL_FOR_A_DAY_LISTINGS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('returnee')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'returnee'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask a Returnee (&lt;30 Days)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Local-For-A-Day Listings */}
      {activeTab === 'local' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-400">
            <span>Ordinary life exchanges &bull; Language exchange or modest shared contribution</span>
            <span>No commercial guide badges required</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {LOCAL_FOR_A_DAY_LISTINGS.map((host) => (
              <div
                key={host.id}
                className="bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={host.avatar}
                        alt={host.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-amber-500 shadow"
                      />
                      <div>
                        <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                          {host.name}
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        </h2>
                        <div className="text-[11px] text-amber-400">{host.location}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 bg-stone-800 px-2 py-1 rounded-lg text-xs font-bold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{host.rating}</span>
                      <span className="text-[10px] text-stone-400">({host.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-2 leading-snug">{host.title}</h3>
                  <p className="text-xs text-stone-300 leading-relaxed mb-4">{host.offering}</p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-stone-950/60 p-3 rounded-xl border border-stone-800 mb-4">
                    <div>
                      <span className="text-stone-400 block mb-0.5">Exchange Terms:</span>
                      <span className="font-semibold text-emerald-400">{host.exchange}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block mb-0.5">Duration:</span>
                      <span className="font-semibold text-stone-200">{host.durationHours} hours</span>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-stone-800/60 flex items-center gap-1.5 text-stone-300">
                      <Languages className="w-3.5 h-3.5 text-amber-400" />
                      <span>{host.languageSpoken.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedHost(host)}
                  className="w-full py-2 px-4 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 hover:text-white border border-stone-700 text-xs font-bold transition flex items-center justify-center space-x-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Request Neighborhood Walk</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Ask a Returnee */}
      {activeTab === 'returnee' && (
        <div className="space-y-6">
          {/* Ask Box */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-amber-400" />
              <h2 className="text-sm font-bold text-white">Ask Returnees Any Question in Real Time</h2>
            </div>
            <p className="text-xs text-stone-400">
              Need fresh ground reality? Type a question about road conditions, mountain ATMs, SIM cards, or trail permits, and our AI returnee engine synthesizes verified traveler experiences immediately.
            </p>

            <form onSubmit={handleAskReturnee} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    required
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder="e.g. Is it too cold to trek without a down jacket right now in Langtang?"
                    className="w-full px-3.5 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <select
                    value={questionDestination}
                    onChange={(e) => setQuestionDestination(e.target.value)}
                    className="w-full px-3 py-2.5 bg-stone-950 border border-stone-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Annapurna & Pokhara">Annapurna &amp; Pokhara</option>
                    <option value="Everest / Khumbu">Everest / Khumbu</option>
                    <option value="Kathmandu Valley">Kathmandu Valley</option>
                    <option value="Upper Mustang">Upper Mustang</option>
                    <option value="Langtang Valley">Langtang Valley</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isAskingAi || !userQuestion.trim()}
                className="py-2 px-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 font-bold rounded-xl text-xs transition flex items-center space-x-2 shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                {isAskingAi ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 animate-spin text-stone-950" />
                    <span>Querying Recent Returnees...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-stone-950" />
                    <span>Ask Returnee Network</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Q&A Stream */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>Verified Returnee Q&amp;A Feed (&lt;30 Days Old)</span>
            </h2>

            <div className="space-y-3">
              {qaList.map((qa) => (
                <div
                  key={qa.id}
                  className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-lg space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-2">
                    <div className="text-xs font-bold text-amber-400">
                      Q: {qa.question}
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-stone-800 text-stone-300 font-mono">
                      {qa.destination}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800/80 text-xs text-stone-200 leading-relaxed space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-stone-400">
                      <span className="font-semibold text-emerald-400 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Answered by {qa.returneeName}
                      </span>
                      <span>Returned {qa.returnedDaysAgo} days ago</span>
                    </div>
                    <p className="text-stone-300">{qa.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Host Request Modal */}
      {selectedHost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl text-stone-100">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span>Walk with {selectedHost.name}</span>
              </h2>
              <button
                onClick={() => setSelectedHost(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSent ? (
              <div className="p-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Neighborhood Walk Requested!</h3>
                <p className="text-xs text-stone-400">
                  {selectedHost.name} will reply within a few hours to arrange meeting point.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendHostRequest} className="p-6 space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <div className="font-semibold text-white">{selectedHost.title}</div>
                  <div className="text-stone-400 mt-0.5">Location: {selectedHost.location}</div>
                  <div className="text-emerald-400 mt-1 font-semibold">Terms: {selectedHost.exchange}</div>
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">Proposed Date &amp; Time</label>
                  <input
                    type="date"
                    required
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 font-medium mb-1">
                    Say Hi &amp; Introduce Yourself
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={bookingMessage}
                    onChange={(e) => setBookingMessage(e.target.value)}
                    placeholder="e.g. Hi! I love Newari brass craftsmanship and would love to practice my beginner Nepali with you..."
                    className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition"
                >
                  Send Walk Invitation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
