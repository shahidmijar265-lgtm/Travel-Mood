import { LocalListing, ReturneeQA } from '../types/travel';

export const LOCAL_FOR_A_DAY_LISTINGS: LocalListing[] = [
  {
    id: 'loc-1',
    name: 'Aayush Maharjan',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    location: 'Patan (Lalitpur) Medieval Alleys',
    coordinates: { lat: 27.6744, lng: 85.3245 },
    title: 'Secret Newari Courtyards, Brass Workshops & Morning Woh',
    offering: 'I was born and raised in the ancient courtyards of Patan. Walk with me for 3 hours through 400-year-old bahals (monastic courtyards) where metal sculptors hand-hammer lost-wax copper Buddhas. We will finish with hot lentil pancakes (woh) at my neighborhood secret spot.',
    exchange: 'Language Exchange',
    languageSpoken: ['Newari', 'Nepali', 'English', 'Learning Spanish'],
    durationHours: 3,
    rating: 4.96,
    reviewsCount: 38
  },
  {
    id: 'loc-2',
    name: 'Dolma Lama',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    location: 'Boudhanath Stupa Environs',
    coordinates: { lat: 27.7215, lng: 85.3620 },
    title: 'Tibetan Butter Tea, Incense Rolling & Stupa Rituals',
    offering: 'Join me for the 6:00 AM sacred circumambulation (kora) around the giant white dome of Boudha. We will visit my family small herbal incense workshop and sit down for warm salted butter tea and roasted barley flour (tsampa). No tourist shops, just our daily rhythm.',
    exchange: 'Coffee & Conversation',
    languageSpoken: ['Tibetan', 'Nepali', 'English'],
    durationHours: 2.5,
    rating: 4.98,
    reviewsCount: 42
  },
  {
    id: 'loc-3',
    name: 'Bikash Gurung',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    location: 'Pachabhaiya, Begnas Lake (Pokhara)',
    coordinates: { lat: 28.1720, lng: 84.0980 },
    title: 'Organic Shade-Grown Coffee Harvest & Village Living',
    offering: 'Spend an afternoon at our hillside permaculture garden overlooking Begnas Lake. Pick fresh coffee cherries, roast raw beans over open wood charcoal, and row our wooden canoe across the quiet water.',
    exchange: 'Modest Contribution (NPR 500-1500)',
    languageSpoken: ['Gurung', 'Nepali', 'English', 'Basic Japanese'],
    durationHours: 3.5,
    rating: 5.0,
    reviewsCount: 29
  },
  {
    id: 'loc-4',
    name: 'Sarita Tharu',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    location: 'Thakurdwara Village, Bardia National Park',
    coordinates: { lat: 28.5142, lng: 81.3328 },
    title: 'Indigenous Tharu Clay House Painting & River Foraging',
    offering: 'Discover our matriarchal indigenous Tharu culture. Learn how we paint our clay and mud homes with natural earth pigments, and join us for wild river fern foraging along the edge of the tiger reserve.',
    exchange: 'Modest Contribution (NPR 500-1500)',
    languageSpoken: ['Tharu', 'Nepali', 'English'],
    durationHours: 4,
    rating: 4.95,
    reviewsCount: 21
  }
];

export const RETURNEE_QA_LIST: ReturneeQA[] = [
  {
    id: 'qa-1',
    question: 'How is the Mugling to Pokhara highway road condition right now? Is tourist bus or flight better?',
    askedBy: 'Liam K. (UK)',
    destination: 'Kathmandu to Pokhara',
    returneeName: 'Maya Sherpa',
    returnedDaysAgo: 4,
    answer: 'Just took the VIP sofa bus 4 days ago! The road widening around Damauli is still bumpy with lots of dust, taking around 7 to 8 hours. If you take the bus, book an early 6:30 AM departure to avoid afternoon truck jams. If you are short on time, the 25-minute flight is worth the $90 to save a day!',
    verifiedTrip: true,
    date: '2026-09-15'
  },
  {
    id: 'qa-2',
    question: 'Are mountain ATMs reliable in Namche Bazaar and Lukla, or should I withdraw everything in Kathmandu?',
    askedBy: 'Sophie Martin (France)',
    destination: 'Everest Khumbu Region',
    returneeName: 'Julian Weber',
    returnedDaysAgo: 9,
    answer: 'DO NOT rely on Namche ATMs! When I was there last week, the satellite link was down for two days straight and the machine ran out of cash. Withdraw all your required NPR rupees in Kathmandu. Expect to budget at least 4,000 - 5,000 NPR per day in higher tea houses for food, battery charging, and hot showers.',
    verifiedTrip: true,
    date: '2026-09-10'
  },
  {
    id: 'qa-3',
    question: 'What is the real cost of a local SIM card and eSIM at Tribhuvan International Airport right now?',
    askedBy: 'Arjun Mehta (India)',
    destination: 'Kathmandu Airport',
    returneeName: 'David Chen',
    returnedDaysAgo: 14,
    answer: 'Both Ncell and Nepal Telecom have official counters right outside the baggage exit. A physical SIM with 20GB data costs only 500 - 800 NPR (~$4-$6). Bring a printed passport photocopy and passport-sized photo to get it activated in 5 minutes. Do not buy from street agents who charge triple!',
    verifiedTrip: true,
    date: '2026-09-05'
  }
];
