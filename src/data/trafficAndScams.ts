import { TrafficAlert, TransitNotice, ScamWarning } from '../types/travel';

export const REALTIME_TRAFFIC_ALERTS: TrafficAlert[] = [
  {
    id: 'tr-1',
    highway: 'Prithvi Highway (H04)',
    section: 'Mugling - Pokhara Road Widening (Dumre to Abukhaireni)',
    severity: 'high',
    status: 'Road Widening',
    coordinates: { lat: 27.9152, lng: 84.4521 },
    details: 'Major 4-lane highway expansion work with heavy machinery. Expect gravel sections, dust, and 45-90 minute rolling stops during peak hours.',
    lastUpdated: 'Live update: 25 mins ago',
    estimatedDelay: '45 - 90 mins'
  },
  {
    id: 'tr-2',
    highway: 'Tribhuvan Highway (Nagdhunga Checkpoint)',
    section: 'Nagdhunga Tunnel Bypass Approach',
    severity: 'medium',
    status: 'One-way Alternating',
    coordinates: { lat: 27.7088, lng: 85.1955 },
    details: 'Heavy cargo trucks climbing the valley pass. Tunnel ventilation test periods cause slow crawling traffic between 9:00 AM - 11:30 AM.',
    lastUpdated: 'Live update: 10 mins ago',
    estimatedDelay: '25 - 40 mins'
  },
  {
    id: 'tr-3',
    highway: 'BP Highway (Kathmandu to Sindhuli)',
    section: 'Nepalthok - Khurkot Sun Koshi Corridor',
    severity: 'low',
    status: 'Open',
    coordinates: { lat: 27.4241, lng: 85.8942 },
    details: 'Clear Japanese-built paved road. Smooth scenic alternative route to eastern Nepal and Terai without truck congestion.',
    lastUpdated: 'Live update: 1 hour ago',
    estimatedDelay: 'No delay (Normal flow)'
  },
  {
    id: 'tr-4',
    highway: 'Beni - Jomsom Mountain Corridor',
    section: 'Rupse Waterfall & Dana Pass',
    severity: 'high',
    status: 'Landslide Clearance',
    coordinates: { lat: 28.5241, lng: 83.6391 },
    details: 'Single-lane unpaved dirt track cut into vertical cliff. Dozers active clearing loose shale rocks. 4WD vehicles only.',
    lastUpdated: 'Live update: 40 mins ago',
    estimatedDelay: '60 - 120 mins'
  }
];

export const TRANSIT_NOTICES: TransitNotice[] = [
  {
    id: 'not-1',
    type: 'flight',
    route: 'Kathmandu (TIA) ⇄ Lukla (Tenzing-Hillary Airport)',
    status: 'Weather Standby',
    notes: 'Afternoon high-altitude cloud cover causing flight delays. Early morning departures (6:00-9:00 AM) clear.',
    icon: 'Plane'
  },
  {
    id: 'not-2',
    type: 'flight',
    route: 'Pokhara International (PIA) ⇄ Jomsom (Mustang)',
    status: 'On Time',
    notes: 'Wind speeds below 15 knots in the Kali Gandaki valley. Morning flights operating normally.',
    icon: 'Plane'
  },
  {
    id: 'not-3',
    type: 'bus',
    route: 'Kathmandu (Sorhakhutte) ⇄ Pokhara Tourist Deluxe Sofas',
    status: 'Delayed',
    notes: 'Slight morning delay at Mugling detour. VIP sofa buses averaging 7.5 hours total transit time.',
    icon: 'Bus'
  },
  {
    id: 'not-4',
    type: 'jeep',
    route: 'Besisahar ⇄ Chame / Manang (Annapurna High Route)',
    status: 'Clear',
    notes: 'Shared 4WD Bolero jeeps running regular daily shuttles. Bridge at Tal is fully operational.',
    icon: 'Car'
  }
];

export const SCAM_WARNINGS: ScamWarning[] = [
  {
    id: 'scam-1',
    title: 'The "Friendly Student / Holy Milk" Ceremony Scam',
    locationName: 'Patan Durbar Square & Thamel Outskirts, Kathmandu',
    coordinates: { lat: 27.6744, lng: 85.3245 },
    riskLevel: 'Caution',
    description: 'A polite young local approaches you claiming to be an art student practicing English or inviting you to a "free blessing" or buying powdered milk for an orphanage. They take you to a specific corner store where the baby milk costs 4,000 NPR ($30). As soon as you leave, the storekeeper and student return the milk to the shelf and split your cash.',
    howToHandle: 'Politely decline offers to buy expensive packaged goods. If you want to donate, visit verified local NGOs or schools directly with school stationery.',
    reportedTimes: 58
  },
  {
    id: 'scam-2',
    title: 'Aggressive "Sadhus" Forcing Tika & Demanding $20',
    locationName: 'Pashupatinath Temple & Swayambhunath Steps',
    coordinates: { lat: 27.7104, lng: 85.3487 },
    riskLevel: 'Common Nuisance',
    description: 'Costumed "holy men" with orange robes and painted faces gesture enthusiastically for a photo, or quickly slap a red tika powder on your forehead without asking, then immediately demand 1,000 - 2,000 NPR ($15 - $20) aggressively.',
    howToHandle: 'Always agree on a small photo gratuity (50 - 100 NPR) BEFORE lifting your camera. If someone touches your forehead without permission, firmly say "Nai, dhanyabad" (No, thank you) and walk away with composure.',
    reportedTimes: 112
  },
  {
    id: 'scam-3',
    title: 'Off-Meter Taxi Surcharges at TIA Airport & Night',
    locationName: 'Tribhuvan International Airport (TIA) Arrivals Gate',
    coordinates: { lat: 27.6966, lng: 85.3589 },
    riskLevel: 'Caution',
    description: 'Taxi drivers cluster around arrivals declaring the meter is "broken" or that there is a special night strike, asking 2,500 - 3,500 NPR for a short 5km ride to Thamel.',
    howToHandle: 'Download Nepal local ride-hailing apps (Pathao or inDrive) which have standard rates (~400-600 NPR to Thamel) or use the official prepaid taxi counter inside the terminal hall.',
    reportedTimes: 184
  },
  {
    id: 'scam-4',
    title: 'Fake Everest Helicopter Rescue Kickback Schemes',
    locationName: 'Namche Bazaar & Pheriche, Khumbu Trekking Route',
    coordinates: { lat: 27.8069, lng: 86.7140 },
    riskLevel: 'High Risk',
    description: 'Unscrupulous guides or lodge operators exaggerate mild altitude symptoms to pressure trekkers into ordering a $3,000 - $5,000 emergency evacuation helicopter, because guides receive a kickback commission from shady charter firms.',
    howToHandle: 'Never let anyone pressure you into a helicopter unless you have genuine symptoms of HAPE/HACE. Rest in place or descend 300-500 meters first, and consult the Himalayan Rescue Association (HRA) volunteer doctors in Pheriche or Manang.',
    reportedTimes: 27
  }
];
