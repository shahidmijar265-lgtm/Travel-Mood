export interface GPSLocation {
  lat: number;
  lng: number;
  accuracy?: number;
  altitude?: number | null;
  heading?: number | null;
  speed?: number | null;
  timestamp: number;
  nearestCityName?: string;
}

// Standard Haversine distance formula in kilometers
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// Known base hubs in Nepal to determine approximate region
export const NEPAL_KEY_HUBS = [
  { name: 'Kathmandu Valley', lat: 27.7172, lng: 85.3240 },
  { name: 'Pokhara Lakeside', lat: 28.2096, lng: 83.9856 },
  { name: 'Namche Bazaar (Khumbu)', lat: 27.8069, lng: 86.7140 },
  { name: 'Chitwan / Sauraha', lat: 27.5796, lng: 84.4921 },
  { name: 'Lumbini Sacred Garden', lat: 27.4842, lng: 83.2759 },
  { name: 'Jomsom / Mustang', lat: 28.7814, lng: 83.7289 }
];

export function findNearestHub(lat: number, lng: number): { name: string; distanceKm: number } {
  let nearest = NEPAL_KEY_HUBS[0];
  let minDistance = calculateDistanceKm(lat, lng, nearest.lat, nearest.lng);

  for (const hub of NEPAL_KEY_HUBS) {
    const dist = calculateDistanceKm(lat, lng, hub.lat, hub.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = hub;
    }
  }

  return { name: nearest.name, distanceKm: minDistance };
}

/**
 * Generates an official Google Maps turn-by-turn navigation / directions URL.
 * Directs the user to Google Maps with optimal driving/transit/walking route pre-populated.
 */
export function getGoogleMapsRouteUrl(
  destLat: number,
  destLng: number,
  destName?: string,
  originLat?: number,
  originLng?: number,
  travelMode: 'driving' | 'transit' | 'walking' | 'bicycling' = 'driving'
): string {
  const base = 'https://www.google.com/maps/dir/?api=1';
  let url = `${base}&destination=${destLat},${destLng}`;
  if (originLat !== undefined && originLng !== undefined) {
    url += `&origin=${originLat},${originLng}`;
  }
  if (travelMode) {
    url += `&travelmode=${travelMode}`;
  }
  return url;
}

/**
 * Generates an official Google Maps place search/view URL.
 */
export function getGoogleMapsPlaceUrl(lat: number, lng: number, name?: string): string {
  if (name) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ', Nepal')}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}
