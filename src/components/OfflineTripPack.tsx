import React, { useState } from 'react';
import { Download, Phone, BookOpen, AlertTriangle, ShieldCheck, Check, Copy } from 'lucide-react';

export const OfflineTripPack: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const emergencyContacts = [
    { name: 'Nepal National Police Emergency', number: '100', note: '24/7 National Emergency dispatch' },
    { name: 'Nepal Tourist Police (Kathmandu)', number: '1144 / +977-1-4247041', note: 'English-speaking dedicated tourist safety unit' },
    { name: 'Tourist Police (Pokhara Lakeside)', number: '+977-61-462761', note: 'Damside / Lakeside safety post' },
    { name: 'Himalayan Rescue Association (HRA)', number: '+977-1-4440292', note: 'High altitude medical emergencies & rescue clinics (Pheriche/Manang)' },
    { name: 'Tribhuvan Int. Airport Flight Info', number: '+977-1-4113000', note: 'Domestic terminal dispatch for Lukla/Pokhara weather delays' },
    { name: 'Nepal Red Cross Ambulance', number: '102', note: 'National ambulance dispatch' }
  ];

  const phrasebook = [
    { nepali: 'नमस्ते', phonetic: 'Namaste', english: 'Hello / Greetings (with hands pressed at heart)', context: 'Universal respectful greeting' },
    { nepali: 'धन्यवाद', phonetic: 'Dhanyabad', english: 'Thank you', context: 'Used when receiving food or assistance' },
    { nepali: 'यसको कति हो?', phonetic: 'Yas-ko ka-ti ho?', english: 'How much is this?', context: 'Asking price in local markets' },
    { nepali: 'धेरै मीठो छ', phonetic: 'Dherai mee-tho chha', english: 'Very delicious!', context: 'Highest compliment for your host’s Dal Bhat' },
    { nepali: 'ठीक छ', phonetic: 'Theek chha', english: 'It is okay / All good', context: 'Agreed / no problem' },
    { nepali: 'पानी छ?', phonetic: 'Paa-nee chha?', english: 'Is there safe drinking water?', context: 'Asking lodge owners for boiled water' },
    { nepali: 'मलाई अलिकति चिसो लाग्यो', phonetic: 'Ma-laai ali-kati chiso laagyo', english: 'I am feeling cold / unwell', context: 'Telling your mountain guide' },
    { nepali: 'पुर्याउन सक्नुहुन्छ?', phonetic: 'Pur-yaa-una sak-nu hunchha?', english: 'Can you take me there?', context: 'Hailing a taxi or local bus' }
  ];

  const handleDownload = () => {
    const textContent = `
========================================
NEPAL YATRI - EMERGENCY & OFFLINE PACK
========================================
GENERATED FOR OFFLINE MOUNTAIN USE

[1] CRITICAL EMERGENCY TELEPHONE CONTACTS:
- Nepal Police: 100
- Tourist Police (Kathmandu): 1144 or +977-1-4247041
- Tourist Police (Pokhara): +977-61-462761
- Himalayan Rescue Association (HRA): +977-1-4440292
- Ambulance: 102
- Lukla Flight Operations: +977-1-4113000

[2] ESSENTIAL NEPALI PHONETIC PHRASES:
- Namaste (Hello)
- Dhanyabad (Thank you)
- Yas-ko ka-ti ho? (How much is this?)
- Theek chha (All good / OK)
- Dherai mee-tho chha (Very delicious)
- Paa-nee chha? (Is there water?)

[3] HIGH ALTITUDE SICKNESS (AMS/HAPE/HACE) GOLDEN RULES:
1. If you develop a worsening headache, nausea, or dizziness above 3,000m, DO NOT ASCEND FURTHER.
2. If symptoms worsen, DESCEND IMMEDIATELY (at least 300 - 500 meters down).
3. Drink 3-4 liters of water daily; avoid alcohol.
4. Beware of fake helicopter rescue scams; consult HRA volunteer doctors first.

[4] MONEY & TRANSIT CHECKPOINTS:
- Withdraw adequate cash in Kathmandu/Pokhara; high mountain ATMs are notoriously unreliable.
- Always negotiate or insist on Pathao / inDrive ride hailing apps in cities.
========================================
Keep safe and walk gently in the Himalayas.
`;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nepal-yatri-offline-pack.txt';
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
              <Download className="w-3.5 h-3.5" />
              <span>Offline-First Emergency Kit</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Offline Mountain Survival &amp; Phrase Pack
            </h1>
            <p className="text-stone-300 text-sm mt-2">
              Cell phone towers drop quickly in mountain gorges and high ridges. Download this bundle to your device storage before leaving Kathmandu or Pokhara.
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="py-3 px-5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition shadow-lg shadow-amber-500/20 flex items-center space-x-2 cursor-pointer"
          >
            {downloaded ? <Check className="w-4 h-4 text-stone-950" /> : <Download className="w-4 h-4 text-stone-950" />}
            <span>{downloaded ? 'Downloaded to Device!' : 'Download Offline Text File'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Emergency Directory */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 border-b border-stone-800 pb-3">
            <Phone className="w-4 h-4 text-rose-400" />
            <h2 className="text-sm font-bold text-white">Emergency Helplines &amp; Rescues</h2>
          </div>

          <div className="space-y-2.5">
            {emergencyContacts.map((contact, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-stone-950 border border-stone-800/80 flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-white">{contact.name}</div>
                  <div className="text-[11px] text-stone-400">{contact.note}</div>
                </div>
                <a
                  href={`tel:${contact.number.split('/')[0].trim()}`}
                  className="px-2.5 py-1 rounded bg-stone-800 hover:bg-stone-700 text-amber-400 font-mono text-xs font-bold whitespace-nowrap border border-stone-700"
                >
                  {contact.number}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Altitude Sickness Protocols */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 border-b border-stone-800 pb-3">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-white">High Altitude Protocol (AMS / HAPE / HACE)</h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/30 text-stone-300 space-y-1">
              <strong className="text-red-400 block font-bold">Rule #1: Never Ascend With Symptoms</strong>
              <p>
                Headache, nausea, loss of appetite, and dizziness above 2,800m are altitude sickness until proven otherwise. Rest at current altitude.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/30 text-stone-300 space-y-1">
              <strong className="text-amber-400 block font-bold">Rule #2: The Golden Cure is Descent</strong>
              <p>
                If symptoms do not improve within 12 hours, descend at least 300 to 500 vertical meters immediately. It saves lives faster than any medicine.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-300 space-y-1">
              <strong className="text-white block font-bold">Rule #3: Hydration &amp; Salt</strong>
              <p>
                Drink 3 to 4 liters of clean fluid per day. Take garlic soup (known locally for circulation) and avoid sleeping pills or heavy alcohol.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Essential Phonetic Nepali Phrasebook */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-bold text-white">Essential Phonetic Nepali Phrasebook</h2>
          </div>
          <span className="text-xs text-stone-400">Respectful &amp; practical local phrases</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {phrasebook.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between text-xs space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-amber-400 font-serif">{item.nepali}</span>
                <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-200 font-mono text-[11px] font-bold">
                  &ldquo;{item.phonetic}&rdquo;
                </span>
              </div>
              <div className="text-white font-semibold">{item.english}</div>
              <div className="text-[11px] text-stone-500 italic">{item.context}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
