import { SlowTravelSpot, PurposeRoute } from '../types/travel';

export const SLOW_TRAVEL_LISTINGS: SlowTravelSpot[] = [
  {
    id: 'st-1',
    title: 'Bandipur Heritage Newari Stone Manor',
    location: 'Bandipur Mountain Saddle, Tanahun',
    monthlyNPR: 32000,
    stayType: 'Village Stone Cottage',
    perks: [
      'Zero vehicular traffic in historic bazaar street',
      'Fiber optic broadband 80 Mbps for remote work',
      'Daily organic buffalo milk and fresh mountain vegetables',
      'Panoramic 180° views of Ganesh Himal and Manaslu'
    ],
    volunteeringAvailable: true,
    internetSpeedMbps: 85
  },
  {
    id: 'st-2',
    title: 'Pachabhaiya Permaculture & Coffee Homestay',
    location: 'Begnas Lake Ridge, Kaski',
    monthlyNPR: 28000,
    stayType: 'Farm Homestay',
    perks: [
      'Learn organic coffee farming and bee-keeping',
      'Private lakeside wooden canoe included for row trips',
      'Kitchen access with clay woodfire stove & gas cooktop',
      'Solar backup power during monsoon grid fluctuations'
    ],
    volunteeringAvailable: true,
    internetSpeedMbps: 60
  },
  {
    id: 'st-3',
    title: 'Kopan Meditation & Study Retreat Lodging',
    location: 'Kopan Hill, Kathmandu Rim',
    monthlyNPR: 36000,
    stayType: 'Monastery Guest Room',
    perks: [
      'Access to daily dharma talks and Tibetan library',
      'Three fresh vegetarian meals included per day',
      'Silent morning meditation gardens',
      'Strict quiet hours after 9:00 PM for deep contemplation'
    ],
    volunteeringAvailable: true,
    internetSpeedMbps: 45
  },
  {
    id: 'st-4',
    title: 'Tansen (Palpa) Hilltop Artisan Residency',
    location: 'Tansen Historical Hilltown, Palpa',
    monthlyNPR: 24000,
    stayType: 'Village Stone Cottage',
    perks: [
      'Centuries-old handloom Dhaka weaving community',
      'Very low tourist count, pure cultural immersion',
      'Cool summer temperatures and colonial Rani Mahal palace nearby',
      'High-speed local fiber Internet'
    ],
    volunteeringAvailable: false,
    internetSpeedMbps: 75
  }
];

export const PURPOSE_ROUTES: PurposeRoute[] = [
  {
    id: 'pr-1',
    theme: 'Sacred Waterways & River Confluences',
    title: 'Following the Sacred Gandaki & Trishuli Corridors',
    routeSummary: 'Follow the lifeblood of Nepal from glacial origins in Mustang down through sacred river confluences (Devghat) where the Kali Gandaki, Trishuli, and Seti meet.',
    durationDays: 10,
    highlights: [
      'Search for sacred fossilized Ammonites (Saligram) in the upper Kali Gandaki gorge',
      'Morning ritual dips and sadhu conversations at holy Devghat Sangam',
      'Riverside wooden lodge stays with sustainable solar water catchment systems'
    ]
  },
  {
    id: 'pr-2',
    theme: 'Indigenous Culinary & Fermentation Trails',
    title: 'The Great Ferment: From Gundruk to Tongba & Newari Chyang',
    routeSummary: 'A culinary journey through Nepal living fermentation cultures: Newari spicy choila, fermented sun-dried leafy greens (gundruk), yak chhurpi hard cheeses, and warm millet wine (Tongba) sipped through bamboo straws.',
    durationDays: 8,
    highlights: [
      'Hands-on Bara and Woh cooking workshops with Newari grandmothers in Kirtipur',
      'Traditional Himalayan distillery tour in eastern Gurung villages',
      'Mountain cheese dairy trek in Helambu tasting aged Yak Gouda'
    ]
  },
  {
    id: 'pr-3',
    theme: 'Literary & Botanical Heritage',
    title: 'In the Footsteps of "The Snow Leopard" & Brian Hodgson',
    routeSummary: 'Retrace the meditative path of Peter Matthiessen and zoologist George Schaller through Dolpo and the Dhaulagiri rain-shadow, paired with early 19th-century naturalist archives in Kathmandu.',
    durationDays: 14,
    highlights: [
      'Shey Gompa crystalline lake and Tibetan Buddhist hermitage solitude',
      'Himalayan botanical specimen identification at the National Herbarium',
      'Evening journal writing workshops with zero light pollution'
    ]
  },
  {
    id: 'pr-4',
    theme: 'High Altitude Astrophotography & Dark Sky',
    title: 'The Himalayan Stargazer: Mustang to Gosainkunda Ridge',
    routeSummary: 'Experience Class 1 Bortle dark skies above 3,500m where the Milky Way illuminates snow peaks without city light pollution.',
    durationDays: 7,
    highlights: [
      'Astrophotography night sessions framed by Nilgiri and Dhaulagiri peaks',
      'High alpine lake reflection photography at holy Gosainkunda',
      'Stargazing with local astro-lodge portable optical telescopes'
    ]
  }
];
