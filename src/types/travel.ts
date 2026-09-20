export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'traveler' | 'local_returnee' | 'local_guide';
  nationality: string;
  travelStyle: 'backpacker' | 'slow_traveler' | 'adventurer' | 'cultural_explorer';
  badges: string[];
  savedDestinations: string[];
  savedRemixes: string[];
  offlinePacks: string[];
}

export type VibeType = 'calm' | 'thrill' | 'cultural' | 'nature' | 'foodie';

export interface Destination {
  id: string;
  name: string;
  nepaliName: string;
  region:
    | 'Kathmandu Valley'
    | 'Annapurna & Pokhara'
    | 'Everest / Khumbu'
    | 'Mustang & Manang'
    | 'Terai & Wildlife'
    | 'Langtang & Helambu'
    | 'Karnali & Far-West'
    | 'Tanahun & Central Mid-Hills'
    | 'Eastern Hills'
    | 'Manaslu & Hidden Valleys'
    | 'Terai & Mithila'
    | 'Lamjung & Gurung Highlands'
    | 'Makwanpur & Mahabharat'
    | 'Far-West Wilderness'
    | 'Dolakha & Rolwaling'
    | 'Gorkha & Historic Ridges';
  coordinates: {
    lat: number;
    lng: number;
  };
  altitude: number; // in meters
  vibes: VibeType[];
  highlight?: string;
  shortDesc: string;
  bestMonths: number[]; // 1 to 12
  shoulderMonths: number[];
  sweetSpotReason: string;
  weatherSummary: string;
  sensory: {
    sound: string;
    soundType: 'singing_bowl' | 'mountain_wind' | 'river_rapids' | 'prayer_wheel';
    smell: string;
    texture: string;
    surprises: string[];
  };
  accessibility: {
    mobilityRating: 'Difficult' | 'Moderate' | 'Good';
    wheelchairNotes: string;
    dietaryNotes: string;
    altitudeWarning: boolean;
  };
  famousRouteTrap: string;
  offBeatenSwap: string;
}

export interface AntiGuideItem {
  id: string;
  destinationId: string;
  destinationName: string;
  authorName: string;
  authorAvatar: string;
  visitedDate: string;
  tripDuration: string;
  whatISkipped: string;
  whySkip: string;
  whatIWishedIDone: string;
  secretTip: string;
  upvotes: number;
}

export interface TrafficAlert {
  id: string;
  highway: string;
  section: string;
  severity: 'low' | 'medium' | 'high';
  status: 'Open' | 'One-way Alternating' | 'Delayed' | 'Landslide Clearance' | 'Road Widening';
  coordinates: { lat: number; lng: number };
  details: string;
  lastUpdated: string;
  estimatedDelay: string;
}

export interface TransitNotice {
  id: string;
  type: 'flight' | 'bus' | 'jeep';
  route: string;
  status: 'On Time' | 'Weather Standby' | 'Delayed' | 'Clear';
  notes: string;
  icon: string;
}

export interface ScamWarning {
  id: string;
  title: string;
  locationName: string;
  coordinates: { lat: number; lng: number };
  riskLevel: 'Caution' | 'High Risk' | 'Common Nuisance';
  description: string;
  howToHandle: string;
  reportedTimes: number;
}

export interface LocalListing {
  id: string;
  name: string;
  avatar: string;
  location: string;
  coordinates: { lat: number; lng: number };
  title: string;
  offering: string;
  exchange: 'Language Exchange' | 'Coffee & Conversation' | 'Modest Contribution (NPR 500-1500)';
  languageSpoken: string[];
  durationHours: number;
  rating: number;
  reviewsCount: number;
}

export interface ReturneeQA {
  id: string;
  question: string;
  askedBy: string;
  destination: string;
  returneeName: string;
  returnedDaysAgo: number;
  answer: string;
  verifiedTrip: boolean;
  date: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  destination: string;
  date: string;
  notes: string;
  altitude?: number;
  coordinates?: { lat: number; lng: number };
  imageUrl?: string;
  tags: string[];
}

export interface SlowTravelSpot {
  id: string;
  title: string;
  location: string;
  monthlyNPR: number;
  stayType: 'Monastery Guest Room' | 'Farm Homestay' | 'Village Stone Cottage' | 'Eco Lodge';
  perks: string[];
  volunteeringAvailable: boolean;
  internetSpeedMbps: number;
}

export interface PurposeRoute {
  id: string;
  theme: string;
  title: string;
  routeSummary: string;
  durationDays: number;
  highlights: string[];
}
