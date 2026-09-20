import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import { NEPAL_DESTINATIONS } from '../data/nepalDestinations';
import { REALTIME_TRAFFIC_ALERTS, TRANSIT_NOTICES, SCAM_WARNINGS } from '../data/trafficAndScams';
import { ACCURATE_NEARBY_LOCATIONS, NearbyLocationItem } from '../data/nearbyPlaces';
import { Destination } from '../types/travel';
import { GPSLocation, calculateDistanceKm, getGoogleMapsRouteUrl, getGoogleMapsPlaceUrl } from '../services/gpsService';
import { 
  MapPin, 
  Navigation, 
  AlertTriangle, 
  Bus, 
  Plane, 
  Car,
  Clock,
  ShieldAlert, 
  Radio, 
  Layers, 
  Maximize2,
  Compass,
  Volume2,
  Filter,
  Route,
  ExternalLink,
  X,
  Search,
  Check,
  Sparkles
} from 'lucide-react';
import { playSensorySound } from '../services/audioSynth';

interface RealTimeNepalMapProps {
  userLocation: GPSLocation | null;
  selectedDestination: Destination | null;
  onSelectDestination: (dest: Destination) => void;
  onRefreshGps: () => void;
}

// Average driving speed in Nepal city & winding mountain roads: ~25 km/h
// 30 min drive = 0.5 hours * 25 km/h = 12.5 to 15.0 km
const MAX_30_MIN_DRIVE_KM = 15.0;

function estimateDriveMinutes(distanceKm: number): number {
  return Math.max(3, Math.round((distanceKm / 25) * 60));
}

function estimateScooterMinutes(distanceKm: number): number {
  return Math.max(3, Math.round((distanceKm / 30) * 60));
}

export interface ActiveRouteTarget {
  id: string;
  name: string;
  nepaliName: string;
  lat: number;
  lng: number;
  altitude?: number;
  region?: string;
  highlight?: string;
  shortDesc?: string;
  categoryOrVibe?: string;
  type: 'destination' | 'nearby';
  recommendedTransport?: string;
  estimatedFare?: string;
}

export const RealTimeNepalMap: React.FC<RealTimeNepalMapProps> = ({
  userLocation,
  selectedDestination,
  onSelectDestination,
  onRefreshGps,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const driveCircleRef = useRef<L.Circle | null>(null);

  // Active Map Layers
  const [activeLayer, setActiveLayer] = useState<'all' | 'destinations' | 'nearby' | 'traffic' | 'scams' | 'transit'>('all');
  const [mapTheme, setMapTheme] = useState<'standard' | 'dark'>('dark');
  const [driveFilter, setDriveFilter] = useState<'30min' | '15min' | 'all'>('30min');
  const [placeCategoryFilter, setPlaceCategoryFilter] = useState<'all' | 'local_gems' | 'local_eats' | 'viewpoint' | 'heritage' | 'lake' | 'nature'>('all');
  const [selectedNearbyItem, setSelectedNearbyItem] = useState<NearbyLocationItem | null>(null);
  const [selectedHub, setSelectedHub] = useState<'pokhara' | 'kathmandu' | 'user'>(
    userLocation ? 'user' : 'pokhara'
  );

  // Active Route Target (selected destination or nearby spot to direct to Google Maps)
  const [activeRouteTarget, setActiveRouteTarget] = useState<ActiveRouteTarget | null>(() => {
    if (selectedDestination) {
      return {
        id: selectedDestination.id,
        name: selectedDestination.name,
        nepaliName: selectedDestination.nepaliName,
        lat: selectedDestination.coordinates.lat,
        lng: selectedDestination.coordinates.lng,
        altitude: selectedDestination.altitude,
        region: selectedDestination.region,
        highlight: selectedDestination.highlight,
        shortDesc: selectedDestination.shortDesc,
        categoryOrVibe: selectedDestination.vibes.join(', '),
        type: 'destination',
      };
    }
    return null;
  });

  const [travelMode, setTravelMode] = useState<'driving' | 'transit' | 'walking' | 'bicycling'>('driving');
  const [destinationSearch, setDestinationSearch] = useState('');
  const [isDestSearchOpen, setIsDestSearchOpen] = useState(false);

  // Synchronize when selectedDestination prop changes from outside
  useEffect(() => {
    if (selectedDestination) {
      setActiveRouteTarget({
        id: selectedDestination.id,
        name: selectedDestination.name,
        nepaliName: selectedDestination.nepaliName,
        lat: selectedDestination.coordinates.lat,
        lng: selectedDestination.coordinates.lng,
        altitude: selectedDestination.altitude,
        region: selectedDestination.region,
        highlight: selectedDestination.highlight,
        shortDesc: selectedDestination.shortDesc,
        categoryOrVibe: selectedDestination.vibes.join(', '),
        type: 'destination',
      });
      setSelectedNearbyItem(null);
    }
  }, [selectedDestination]);

  // Hub Counts
  const pokharaCount = useMemo(() => ACCURATE_NEARBY_LOCATIONS.filter(p => p.hub === 'Pokhara & Kaski').length, []);
  const ktmCount = useMemo(() => ACCURATE_NEARBY_LOCATIONS.filter(p => p.hub === 'Kathmandu Valley').length, []);

  // Active Center Coordinates (Based on selected hub or user GPS)
  const activeCenterLat = selectedHub === 'user' && userLocation
    ? userLocation.lat
    : selectedHub === 'kathmandu'
      ? 27.7172
      : 28.2096;

  const activeCenterLng = selectedHub === 'user' && userLocation
    ? userLocation.lng
    : selectedHub === 'kathmandu'
      ? 85.3240
      : 83.9856;

  const activeHubName = selectedHub === 'user' && userLocation
    ? (userLocation.nearestCityName ?? 'My Location')
    : selectedHub === 'kathmandu'
      ? 'Kathmandu Valley'
      : 'Pokhara Lakeside';

  // Compute distance and drive time for all verified nearby places
  const processedNearby = useMemo(() => {
    return ACCURATE_NEARBY_LOCATIONS.map((loc) => {
      const distanceKm = calculateDistanceKm(
        activeCenterLat,
        activeCenterLng,
        loc.coordinates.lat,
        loc.coordinates.lng
      );
      const driveMin = estimateDriveMinutes(distanceKm);
      const scooterMin = estimateScooterMinutes(distanceKm);
      return {
        ...loc,
        distanceKm,
        driveMin,
        scooterMin,
        within30MinDrive: driveMin <= 30 && distanceKm <= MAX_30_MIN_DRIVE_KM,
        within15MinDrive: driveMin <= 15 && distanceKm <= 7.0,
      };
    }).sort((a, b) => a.distanceKm - b.distanceKm);
  }, [activeCenterLat, activeCenterLng]);

  // Filter based on selected drive constraint and category/local gems
  const filteredNearby = useMemo(() => {
    let list = processedNearby;
    if (driveFilter === '30min') {
      const within30 = list.filter((p) => p.within30MinDrive);
      list = within30.length > 0 ? within30 : list.slice(0, 10);
    } else if (driveFilter === '15min') {
      const within15 = list.filter((p) => p.within15MinDrive);
      list = within15.length > 0 ? within15 : list.slice(0, 5);
    }

    if (placeCategoryFilter === 'local_gems') {
      return list.filter((p) => p.isLocalGem);
    }
    if (placeCategoryFilter === 'local_eats') {
      return list.filter((p) => p.category === 'local_eats');
    }
    if (placeCategoryFilter === 'viewpoint') {
      return list.filter((p) => p.category === 'viewpoint');
    }
    if (placeCategoryFilter === 'heritage') {
      return list.filter((p) => p.category === 'heritage' || p.category === 'monastery' || p.category === 'cultural');
    }
    if (placeCategoryFilter === 'lake') {
      return list.filter((p) => p.category === 'lake');
    }
    if (placeCategoryFilter === 'nature') {
      return list.filter((p) => p.category === 'nature' || p.category === 'lake' || p.category === 'adventure');
    }
    return list;
  }, [processedNearby, driveFilter, placeCategoryFilter]);

  // Compute stats for the currently selected active route
  const activeRouteStats = useMemo(() => {
    if (!activeRouteTarget) return null;
    const distanceKm = calculateDistanceKm(
      activeCenterLat,
      activeCenterLng,
      activeRouteTarget.lat,
      activeRouteTarget.lng
    );
    const driveMinutes = estimateDriveMinutes(distanceKm);
    const scooterMinutes = estimateScooterMinutes(distanceKm);
    const googleMapsUrl = getGoogleMapsRouteUrl(
      activeRouteTarget.lat,
      activeRouteTarget.lng,
      activeRouteTarget.name,
      activeCenterLat,
      activeCenterLng,
      travelMode
    );
    return {
      distanceKm,
      driveMinutes,
      scooterMinutes,
      googleMapsUrl,
    };
  }, [activeRouteTarget, activeCenterLat, activeCenterLng, travelMode]);

  // All destinations with distance from current hub for quick selector
  const allDestinationsWithDistance = useMemo(() => {
    return NEPAL_DESTINATIONS.map((dest) => {
      const distanceKm = calculateDistanceKm(
        activeCenterLat,
        activeCenterLng,
        dest.coordinates.lat,
        dest.coordinates.lng
      );
      return {
        ...dest,
        distanceKm,
      };
    }).sort((a, b) => a.distanceKm - b.distanceKm);
  }, [activeCenterLat, activeCenterLng]);

  // Auto-focus and adjust map bounds to show route when activeRouteTarget changes
  useEffect(() => {
    if (!mapInstanceRef.current || !activeRouteTarget) return;
    const map = mapInstanceRef.current;
    try {
      map.fitBounds(
        [
          [activeCenterLat, activeCenterLng],
          [activeRouteTarget.lat, activeRouteTarget.lng],
        ],
        {
          padding: [70, 70],
          maxZoom: 14,
          animate: true,
          duration: 1.0,
        }
      );
    } catch {
      map.flyTo([activeRouteTarget.lat, activeRouteTarget.lng], 13);
    }
  }, [activeRouteTarget?.id, activeCenterLat, activeCenterLng]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Create Map without watermark or trademark overlay
      const map = L.map(mapContainerRef.current, {
        center: [activeCenterLat, activeCenterLng],
        zoom: 12,
        zoomControl: false,
        attributionControl: false,
      });

      // Add zoom control in top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Add Tile Layer
      const tileUrl = mapTheme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

      const tileLayer = L.tileLayer(tileUrl, {
        maxZoom: 19,
      }).addTo(map);

      // Layer group for markers
      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;
      mapInstanceRef.current = map;

      // Invalidate size after layout stabilization
      setTimeout(() => {
        map.invalidateSize();
      }, 250);
    }

    return () => {
      // Clean up map when component unmounts
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer when theme changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    const tileUrl = mapTheme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    L.tileLayer(tileUrl, {
      maxZoom: 19,
    }).addTo(map);
  }, [mapTheme]);

  // Re-plot markers and 30-min drive boundary circle whenever state changes
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;
    const map = mapInstanceRef.current;
    const layerGroup = layerGroupRef.current;
    layerGroup.clearLayers();

    // 1. Draw the 30-Minute Drive Radius Circle (~15 km / 15,000 meters)
    const maxRadiusMeters = driveFilter === '15min' ? 7000 : 15000;
    const driveCircle = L.circle([activeCenterLat, activeCenterLng], {
      radius: maxRadiusMeters,
      color: '#10b981',
      weight: 2,
      dashArray: '6, 8',
      fillColor: '#10b981',
      fillOpacity: 0.07,
    }).addTo(layerGroup);
    driveCircle.bindTooltip(
      `🚗 ${driveFilter === '15min' ? '15-Min' : '30-Min'} Drive Zone (~${(maxRadiusMeters / 1000).toFixed(0)} km radius)`, 
      { permanent: false, direction: 'top' }
    );
    driveCircleRef.current = driveCircle;

    // 2. Active Route Polyline & Destination Pin (if a destination or place is selected)
    if (activeRouteTarget) {
      // Glow underlay polyline
      L.polyline(
        [[activeCenterLat, activeCenterLng], [activeRouteTarget.lat, activeRouteTarget.lng]],
        {
          color: '#059669',
          weight: 7,
          opacity: 0.35,
        }
      ).addTo(layerGroup);

      // Main dashed animated polyline
      const routeLine = L.polyline(
        [[activeCenterLat, activeCenterLng], [activeRouteTarget.lat, activeRouteTarget.lng]],
        {
          color: '#10b981',
          weight: 4,
          opacity: 0.95,
          dashArray: '8, 12',
          className: 'leaflet-route-dash',
        }
      ).addTo(layerGroup);

      const targetGMapUrl = getGoogleMapsRouteUrl(
        activeRouteTarget.lat,
        activeRouteTarget.lng,
        activeRouteTarget.name,
        activeCenterLat,
        activeCenterLng,
        travelMode
      );

      routeLine.bindTooltip(
        `🚗 ${activeRouteTarget.name}: ${activeRouteStats ? `${activeRouteStats.distanceKm.toFixed(1)} km (~${activeRouteStats.driveMinutes}m drive)` : ''}`,
        { permanent: false, direction: 'center' }
      );

      // Target pin with animated ping badge
      const targetIcon = L.divIcon({
        className: 'custom-active-target-marker',
        html: `
          <div class="relative flex flex-col items-center">
            <span class="absolute -top-1 -right-1 flex h-4 w-4">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
            </span>
            <div class="px-2.5 py-1 rounded-full bg-amber-500 text-stone-950 font-black text-xs shadow-2xl border-2 border-white flex items-center space-x-1 ring-4 ring-amber-500/40">
              <span>🎯</span>
              <span class="max-w-[130px] truncate">${activeRouteTarget.name}</span>
            </div>
            <div class="w-3 h-3 bg-amber-500 rotate-45 -mt-1.5 border-r-2 border-b-2 border-white"></div>
          </div>
        `,
        iconSize: [160, 36],
        iconAnchor: [80, 36],
        popupAnchor: [0, -36],
      });

      const targetMarker = L.marker([activeRouteTarget.lat, activeRouteTarget.lng], { icon: targetIcon, zIndexOffset: 1000 }).addTo(layerGroup);
      targetMarker.bindPopup(`
        <div style="font-family: inherit; min-width: 220px; padding: 4px;">
          <div style="font-size: 10px; font-weight: bold; color: #f59e0b; text-transform: uppercase;">
            🎯 Active Route Target
          </div>
          <h3 style="font-weight: 800; font-size: 14px; margin: 2px 0; color: #ffffff;">${activeRouteTarget.name}</h3>
          <div style="font-size: 11px; color: #a8a29e; font-style: italic; margin-bottom: 6px;">
            ${activeRouteTarget.nepaliName} &bull; ${activeRouteTarget.altitude ? activeRouteTarget.altitude + 'm alt' : ''}
          </div>
          <div style="font-size: 11px; background: #064e3b; color: #6ee7b7; padding: 5px 8px; border-radius: 6px; margin-bottom: 8px; font-weight: bold;">
            🚗 ${activeRouteStats ? `${activeRouteStats.distanceKm.toFixed(1)} km &bull; ~${activeRouteStats.driveMinutes} min drive` : ''} from ${activeHubName}
          </div>
          <a href="${targetGMapUrl}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; gap: 6px; background: #10b981; color: #022c22; padding: 8px 12px; border-radius: 8px; font-weight: 800; font-size: 11px; text-decoration: none;">
            <span>🗺️ Direct to Google Maps</span>
            <span>↗</span>
          </a>
        </div>
      `);
    }

    // 3. User Location Marker (Pulsing Green Compass Pin)
    const userIcon = L.divIcon({
      className: 'custom-user-marker',
      html: `
        <div class="relative flex items-center justify-center">
          <span class="absolute -inset-2 rounded-full bg-emerald-400 opacity-70 animate-ping"></span>
          <div class="w-8 h-8 rounded-full bg-emerald-500 text-stone-950 font-bold flex items-center justify-center border-2 border-white shadow-xl text-sm">
            🧭
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const userMarker = L.marker([activeCenterLat, activeCenterLng], { icon: userIcon }).addTo(layerGroup);
    userMarker.bindPopup(`
      <div style="font-family: inherit; min-width: 180px; padding: 4px;">
        <div style="font-weight: 800; font-size: 13px; color: #047857; margin-bottom: 2px;">
          📍 Active Hub: ${activeHubName}
        </div>
        <div style="font-size: 11px; color: #4b5563;">
          ${activeCenterLat.toFixed(3)}°N, ${activeCenterLng.toFixed(3)}°E
        </div>
        <div style="font-size: 10px; color: #10b981; font-weight: 600; margin-top: 4px;">
          Radius: Showing places within 30 min drive
        </div>
      </div>
    `);

    // 4. Nearby Location Markers (Within 30-Minute Drive)
    if (activeLayer === 'all' || activeLayer === 'nearby') {
      filteredNearby.forEach((place) => {
        // If this place is already active target, skip or display with nearby styling
        if (activeRouteTarget?.id === place.id) return;

        const isSelected = selectedNearbyItem?.id === place.id;
        const isLocal = !!place.isLocalGem;
        
        const badgeClasses = isSelected
          ? 'bg-amber-400 text-stone-950 border-amber-300 ring-4 ring-amber-500/40 scale-110'
          : isLocal
            ? 'bg-amber-500 text-stone-950 border-amber-300 font-black shadow-amber-500/30'
            : 'bg-emerald-600 text-white border-emerald-300';

        const arrowClasses = isSelected
          ? 'bg-amber-400 border-amber-300'
          : isLocal
            ? 'bg-amber-500 border-amber-300'
            : 'bg-emerald-600 border-emerald-300';

        const iconHtml = `
          <div class="relative cursor-pointer group flex flex-col items-center">
            <div class="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold shadow-md border ${badgeClasses} flex items-center space-x-1">
              <span>${isLocal ? '🏮' : '🚗'} ${place.driveMin}m</span>
            </div>
            <div class="w-2.5 h-2.5 ${arrowClasses} rotate-45 -mt-1.5 border-r border-b"></div>
          </div>
        `;

        const markerIcon = L.divIcon({
          className: 'custom-nearby-marker',
          html: iconHtml,
          iconSize: [56, 28],
          iconAnchor: [28, 28],
          popupAnchor: [0, -28],
        });

        const gMapsUrl = getGoogleMapsRouteUrl(
          place.coordinates.lat, 
          place.coordinates.lng, 
          place.name, 
          activeCenterLat, 
          activeCenterLng, 
          'driving'
        );

        const marker = L.marker([place.coordinates.lat, place.coordinates.lng], { icon: markerIcon }).addTo(layerGroup);
        marker.on('click', () => {
          setSelectedNearbyItem(place);
          setActiveRouteTarget({
            id: place.id,
            name: place.name,
            nepaliName: place.nepaliName,
            lat: place.coordinates.lat,
            lng: place.coordinates.lng,
            altitude: place.altitude,
            region: place.hub,
            highlight: place.highlight,
            shortDesc: place.shortDesc,
            categoryOrVibe: place.category,
            type: 'nearby',
            recommendedTransport: place.recommendedTransport,
            estimatedFare: place.estimatedTaxiFareNpr,
          });
        });

        marker.bindPopup(`
          <div style="font-family: inherit; max-width: 270px; padding: 4px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; flex-wrap: wrap; gap: 4px;">
              <span style="font-size: 10px; font-weight: bold; text-transform: uppercase; color: #059669;">
                ${place.hub}
              </span>
              <div style="display: flex; align-items: center; gap: 4px;">
                ${place.isLocalGem ? '<span style="font-size: 10px; font-weight: bold; background: #fef3c7; color: #b45309; padding: 1px 5px; border-radius: 4px;">🏮 Local Gem</span>' : ''}
                <span style="font-size: 10px; font-weight: bold; background: #ecfdf5; color: #047857; padding: 1px 5px; border-radius: 4px;">
                  🚗 ${place.driveMin}m (${place.distanceKm.toFixed(1)} km)
                </span>
              </div>
            </div>
            <h4 style="font-weight: 800; font-size: 14px; margin: 0 0 2px 0; color: #ffffff;">${place.name}</h4>
            <div style="font-size: 11px; color: #a8a29e; font-style: italic; margin-bottom: 6px;">${place.nepaliName} &bull; ${place.altitude}m alt</div>
            <p style="font-size: 11px; color: #d6d3d1; line-height: 1.4; margin-bottom: 6px;">${place.shortDesc}</p>
            ${place.localTip ? `<div style="font-size: 10px; background: #451a03; color: #fef3c7; padding: 5px 8px; border-radius: 6px; margin-bottom: 6px; border-left: 3px solid #f59e0b;"><strong>Local Secret:</strong> ${place.localTip}</div>` : ''}
            <div style="font-size: 10px; background: #292524; color: #d6d3d1; padding: 6px 8px; border-radius: 6px; border-left: 3px solid #10b981; margin-bottom: 6px;">
              <strong>Transport:</strong> ${place.recommendedTransport} (${place.estimatedTaxiFareNpr})<br/>
              <strong>Best Time:</strong> ${place.bestTimeOfDay}
            </div>
            <a href="${gMapsUrl}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; gap: 6px; background: #059669; color: #ffffff; padding: 7px 12px; border-radius: 8px; font-weight: 800; font-size: 11px; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
              <span>🗺️ Route on Google Maps</span>
              <span style="font-size: 10px;">↗</span>
            </a>
          </div>
        `);
      });
    }

    // 5. All Nepal Destinations Markers (Iconic spots, rock climbing crags, lakes)
    if (activeLayer === 'all' || activeLayer === 'destinations') {
      NEPAL_DESTINATIONS.forEach((dest) => {
        // If this destination is already active route target, skip to avoid duplicate pin
        if (activeRouteTarget?.id === dest.id) return;

        const isRockClimbing = dest.name.toLowerCase().includes('climbing') || dest.id.includes('climbing');
        const iconEmoji = isRockClimbing
          ? '🧗'
          : dest.vibes.includes('calm')
            ? '🕊️'
            : dest.vibes.includes('thrill')
              ? '⚡'
              : dest.vibes.includes('cultural')
                ? '🏛️'
                : dest.vibes.includes('nature')
                  ? '🌿'
                  : '🍲';

        const destIcon = L.divIcon({
          className: 'custom-dest-marker',
          html: `
            <div class="relative cursor-pointer group flex flex-col items-center">
              <div class="px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md border bg-stone-900 text-stone-200 border-amber-500/60 hover:bg-amber-500 hover:text-stone-950 transition flex items-center space-x-1">
                <span>${iconEmoji}</span>
                <span class="max-w-[90px] truncate">${dest.name.split(' ')[0]}</span>
              </div>
              <div class="w-2 h-2 bg-stone-900 border-r border-b border-amber-500/60 rotate-45 -mt-1 group-hover:bg-amber-500"></div>
            </div>
          `,
          iconSize: [110, 26],
          iconAnchor: [55, 26],
          popupAnchor: [0, -26],
        });

        const distKm = calculateDistanceKm(activeCenterLat, activeCenterLng, dest.coordinates.lat, dest.coordinates.lng);
        const gMapsUrl = getGoogleMapsRouteUrl(dest.coordinates.lat, dest.coordinates.lng, dest.name, activeCenterLat, activeCenterLng, 'driving');

        const marker = L.marker([dest.coordinates.lat, dest.coordinates.lng], { icon: destIcon }).addTo(layerGroup);
        
        marker.on('click', () => {
          onSelectDestination(dest);
          setSelectedNearbyItem(null);
          setActiveRouteTarget({
            id: dest.id,
            name: dest.name,
            nepaliName: dest.nepaliName,
            lat: dest.coordinates.lat,
            lng: dest.coordinates.lng,
            altitude: dest.altitude,
            region: dest.region,
            highlight: dest.highlight,
            shortDesc: dest.shortDesc,
            categoryOrVibe: dest.vibes.join(', '),
            type: 'destination',
          });
        });

        marker.bindPopup(`
          <div style="font-family: inherit; max-width: 260px; padding: 4px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 10px; font-weight: bold; color: #f59e0b; text-transform: uppercase;">
                ${dest.region}
              </span>
              <span style="font-size: 10px; font-weight: bold; background: #064e3b; color: #6ee7b7; padding: 1px 6px; border-radius: 4px;">
                ${distKm.toFixed(0)} km away
              </span>
            </div>
            <h4 style="font-weight: 800; font-size: 13px; margin: 2px 0; color: #ffffff;">${dest.name}</h4>
            <div style="font-size: 11px; color: #a8a29e; font-style: italic; margin-bottom: 6px;">
              ${dest.nepaliName} &bull; ${dest.altitude}m alt
            </div>
            <p style="font-size: 11px; color: #d6d3d1; margin-bottom: 8px; line-height: 1.4;">${dest.shortDesc}</p>
            <a href="${gMapsUrl}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; gap: 4px; background: #10b981; color: #022c22; padding: 7px 12px; border-radius: 8px; font-weight: 800; font-size: 11px; text-decoration: none;">
              <span>🗺️ Route in Google Maps</span>
              <span>↗</span>
            </a>
          </div>
        `);
      });
    }

    // 6. Real-time Highway Traffic Delays
    if (activeLayer === 'all' || activeLayer === 'traffic') {
      REALTIME_TRAFFIC_ALERTS.forEach((alert) => {
        const trafficIcon = L.divIcon({
          className: 'custom-traffic-marker',
          html: `
            <div class="w-7 h-7 rounded-lg bg-amber-500 text-stone-950 font-bold flex items-center justify-center border-2 border-amber-300 shadow-xl text-xs animate-bounce">
              ⚠️
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          popupAnchor: [0, -14],
        });

        const marker = L.marker([alert.coordinates.lat, alert.coordinates.lng], { icon: trafficIcon }).addTo(layerGroup);
        marker.bindPopup(`
          <div style="font-family: inherit; max-width: 240px; padding: 4px;">
            <div style="font-size: 10px; font-weight: bold; color: #b45309; text-transform: uppercase;">
              Traffic Delay &bull; ${alert.highway}
            </div>
            <h4 style="font-weight: 800; font-size: 13px; color: #111827; margin: 2px 0;">${alert.section}</h4>
            <div style="font-size: 11px; color: #e11d48; font-weight: bold; margin-bottom: 4px;">
              Delay: ${alert.estimatedDelay} (${alert.status})
            </div>
            <p style="font-size: 11px; color: #4b5563; margin-bottom: 4px;">${alert.details}</p>
            <div style="font-size: 10px; color: #6b7280;">${alert.lastUpdated}</div>
          </div>
        `);
      });
    }

    // 7. Scam Warnings Pins
    if (activeLayer === 'all' || activeLayer === 'scams') {
      SCAM_WARNINGS.forEach((scam) => {
        const scamIcon = L.divIcon({
          className: 'custom-scam-marker',
          html: `
            <div class="w-7 h-7 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center border-2 border-white shadow-xl text-xs">
              🛡️
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          popupAnchor: [0, -14],
        });

        const marker = L.marker([scam.coordinates.lat, scam.coordinates.lng], { icon: scamIcon }).addTo(layerGroup);
        marker.bindPopup(`
          <div style="font-family: inherit; max-width: 250px; padding: 4px;">
            <div style="font-size: 10px; font-weight: bold; color: #e11d48; text-transform: uppercase;">
              ⚠️ Scam Warning &bull; ${scam.riskLevel}
            </div>
            <h4 style="font-weight: 800; font-size: 13px; color: #111827; margin: 2px 0;">${scam.title}</h4>
            <div style="font-size: 10px; color: #6b7280; margin-bottom: 4px;">${scam.locationName}</div>
            <p style="font-size: 11px; color: #374151; margin-bottom: 6px;">${scam.description}</p>
            <div style="font-size: 10px; background: #ecfdf5; color: #047857; padding: 4px 6px; border-radius: 4px; font-weight: 600;">
              ✓ Safe Action: ${scam.howToHandle}
            </div>
          </div>
        `);
      });
    }
  }, [activeLayer, filteredNearby, activeCenterLat, activeCenterLng, driveFilter, selectedNearbyItem, activeRouteTarget, activeRouteStats, travelMode]);

  // Recenter map to active location
  const handleRecenter = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([activeCenterLat, activeCenterLng], 12, {
      duration: 1.2,
      animate: true,
    });
  };

  // Switch between hubs (Pokhara, Kathmandu Valley, or GPS)
  const handleSelectHub = (hub: 'pokhara' | 'kathmandu' | 'user') => {
    setSelectedHub(hub);
    setSelectedNearbyItem(null);
    const targetLat = hub === 'user' && userLocation ? userLocation.lat : hub === 'kathmandu' ? 27.7172 : 28.2096;
    const targetLng = hub === 'user' && userLocation ? userLocation.lng : hub === 'kathmandu' ? 85.3240 : 83.9856;
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([targetLat, targetLng], 12, {
        duration: 1.2,
        animate: true,
      });
    }
  };

  // Focus on specific nearby location
  const handleFocusNearby = (loc: NearbyLocationItem & { driveMin: number; distanceKm: number }) => {
    setSelectedNearbyItem(loc);
    setActiveRouteTarget({
      id: loc.id,
      name: loc.name,
      nepaliName: loc.nepaliName,
      lat: loc.coordinates.lat,
      lng: loc.coordinates.lng,
      altitude: loc.altitude,
      region: loc.hub,
      highlight: loc.highlight,
      shortDesc: loc.shortDesc,
      categoryOrVibe: loc.category,
      type: 'nearby',
      recommendedTransport: loc.recommendedTransport,
      estimatedFare: loc.estimatedTaxiFareNpr,
    });
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([loc.coordinates.lat, loc.coordinates.lng], 14, {
      duration: 1.0,
      animate: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
              <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>OpenStreetMap Live Telemetry</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Real-Time Map, Transit &amp; Scam Radar
            </h1>
            <p className="text-stone-300 text-sm mt-1 max-w-2xl">
              OpenStreetMap integration displaying accurate spots within a <strong className="text-emerald-400">30-minute drive</strong> of your location, real-time highway expansion delays, and crowdsourced scam zones.
            </p>
          </div>

          {/* Action Controls & Hub Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-stone-950/80 p-1 rounded-xl border border-stone-700/80">
              <button
                onClick={() => handleSelectHub('pokhara')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedHub === 'pokhara'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-stone-300 hover:text-white'
                }`}
                title="Explore places within 30 min drive of Pokhara Lakeside"
              >
                🏔️ Pokhara Hub ({pokharaCount})
              </button>
              <button
                onClick={() => handleSelectHub('kathmandu')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedHub === 'kathmandu'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-stone-300 hover:text-white'
                }`}
                title="Explore places within 30 min drive of Kathmandu Valley"
              >
                🏛️ Kathmandu Hub ({ktmCount})
              </button>
              {userLocation && (
                <button
                  onClick={() => handleSelectHub('user')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    selectedHub === 'user'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-stone-300 hover:text-white'
                  }`}
                  title="Use live GPS coordinates as 30-min drive center"
                >
                  🧭 Live GPS
                </button>
              )}
            </div>

            <button
              onClick={handleRecenter}
              className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-emerald-400 border border-stone-700 text-xs font-semibold flex items-center space-x-1.5 transition"
              title="Recenter map to active center"
            >
              <Navigation className="w-4 h-4" />
              <span>Recenter</span>
            </button>

            {/* Quick Route Destination Search & Select */}
            <div className="relative">
              <button
                onClick={() => setIsDestSearchOpen(!isDestSearchOpen)}
                className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 transition shadow-lg shadow-emerald-600/20"
                title="Select any destination in Nepal to draw route and direct to Google Maps"
              >
                <Route className="w-4 h-4" />
                <span>{activeRouteTarget ? 'Change Route' : 'Route to Place...'}</span>
              </button>

              {/* Destination Dropdown Popup */}
              {isDestSearchOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 max-h-[380px] bg-stone-900 border border-stone-700 rounded-2xl shadow-2xl p-3 z-50 overflow-hidden flex flex-col space-y-2">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>🗺️ Select Route Destination</span>
                    </span>
                    <button
                      onClick={() => setIsDestSearchOpen(false)}
                      className="text-stone-400 hover:text-white text-xs p-1"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-500" />
                    <input
                      type="text"
                      value={destinationSearch}
                      onChange={(e) => setDestinationSearch(e.target.value)}
                      placeholder="Search spot, rock climbing, lake..."
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="overflow-y-auto space-y-1 max-h-[260px] pr-1">
                    {allDestinationsWithDistance
                      .filter(d => 
                        !destinationSearch || 
                        d.name.toLowerCase().includes(destinationSearch.toLowerCase()) || 
                        d.region.toLowerCase().includes(destinationSearch.toLowerCase()) ||
                        d.nepaliName.includes(destinationSearch)
                      )
                      .map((dest) => {
                        const isSelected = activeRouteTarget?.id === dest.id;
                        const isRockClimbing = dest.name.toLowerCase().includes('climbing') || dest.id.includes('climbing');
                        return (
                          <button
                            key={dest.id}
                            onClick={() => {
                              onSelectDestination(dest);
                              setSelectedNearbyItem(null);
                              setActiveRouteTarget({
                                id: dest.id,
                                name: dest.name,
                                nepaliName: dest.nepaliName,
                                lat: dest.coordinates.lat,
                                lng: dest.coordinates.lng,
                                altitude: dest.altitude,
                                region: dest.region,
                                highlight: dest.highlight,
                                shortDesc: dest.shortDesc,
                                categoryOrVibe: dest.vibes.join(', '),
                                type: 'destination',
                              });
                              setIsDestSearchOpen(false);
                            }}
                            className={`w-full text-left p-2 rounded-xl transition flex items-center justify-between text-xs ${
                              isSelected
                                ? 'bg-emerald-600/30 border border-emerald-500/60 text-white'
                                : 'hover:bg-stone-800 text-stone-300'
                            }`}
                          >
                            <div className="min-w-0 pr-2">
                              <div className="font-bold text-white truncate flex items-center gap-1">
                                <span>{isRockClimbing ? '🧗' : '📍'}</span>
                                <span>{dest.name}</span>
                              </div>
                              <div className="text-[10px] text-stone-400 truncate">
                                {dest.nepaliName} &bull; {dest.region}
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <div className="font-mono text-emerald-400 text-[11px] font-bold">
                                {dest.distanceKm.toFixed(0)} km
                              </div>
                            </div>
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onRefreshGps}
              className="px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold flex items-center space-x-1.5 transition"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>
                {userLocation
                  ? `GPS: ${userLocation.lat.toFixed(2)}°, ${userLocation.lng.toFixed(2)}°`
                  : 'Acquire GPS'}
              </span>
            </button>
          </div>
        </div>

        {/* Map Layers & 30-Min Drive Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-stone-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-400 font-medium mr-1 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-stone-500" />
              Layers:
            </span>
            <button
              onClick={() => setActiveLayer('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeLayer === 'all' ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              All Telemetry
            </button>
            <button
              onClick={() => setActiveLayer('destinations')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeLayer === 'destinations' ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              🎯 Destinations ({NEPAL_DESTINATIONS.length})
            </button>
            <button
              onClick={() => setActiveLayer('nearby')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeLayer === 'nearby' ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              🚗 Nearby ({filteredNearby.length})
            </button>
            <button
              onClick={() => setActiveLayer('traffic')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeLayer === 'traffic' ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              ⚠️ Highway Delays ({REALTIME_TRAFFIC_ALERTS.length})
            </button>
            <button
              onClick={() => setActiveLayer('scams')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeLayer === 'scams' ? 'bg-rose-600 text-white' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              🛡️ Scam Traps ({SCAM_WARNINGS.length})
            </button>
          </div>

          {/* Drive Distance & Map Style Filters */}
          <div className="flex items-center space-x-2">
            {/* Drive Radius Pill */}
            <div className="flex items-center space-x-1 bg-stone-950/80 p-1 rounded-lg border border-stone-800 text-xs">
              <Clock className="w-3.5 h-3.5 text-emerald-400 ml-1.5" />
              <button
                onClick={() => setDriveFilter('30min')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
                  driveFilter === '30min' ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                &le; 30 Min Drive
              </button>
              <button
                onClick={() => setDriveFilter('15min')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
                  driveFilter === '15min' ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                &le; 15 Min Drive
              </button>
              <button
                onClick={() => setDriveFilter('all')}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
                  driveFilter === 'all' ? 'bg-stone-700 text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                All Region
              </button>
            </div>

            {/* Tile Layer Theme Toggle */}
            <button
              onClick={() => setMapTheme(mapTheme === 'dark' ? 'standard' : 'dark')}
              className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium border border-stone-700"
              title="Toggle between OpenStreetMap Dark Carto and Standard Classic tiles"
            >
              {mapTheme === 'dark' ? '🌙 Dark OSM' : '🗺️ Standard OSM'}
            </button>
          </div>
        </div>

        {/* Local Places & Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-stone-800/60">
          <span className="text-xs text-stone-400 font-medium mr-1">Filter Spots:</span>
          <button
            onClick={() => setPlaceCategoryFilter('all')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
              placeCategoryFilter === 'all'
                ? 'bg-stone-700 text-white font-bold'
                : 'bg-stone-950/70 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            All Categories
          </button>
          <button
            onClick={() => setPlaceCategoryFilter('local_gems')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition flex items-center space-x-1 ${
              placeCategoryFilter === 'local_gems'
                ? 'bg-amber-500 text-stone-950 font-extrabold shadow-sm'
                : 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30'
            }`}
          >
            <span>🏮 Local Gems &amp; Hidden Alleys</span>
          </button>
          <button
            onClick={() => setPlaceCategoryFilter('local_eats')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
              placeCategoryFilter === 'local_eats'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-950/70 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            🍛 Local Eats &amp; Tea
          </button>
          <button
            onClick={() => setPlaceCategoryFilter('viewpoint')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
              placeCategoryFilter === 'viewpoint'
                ? 'bg-stone-700 text-white font-bold'
                : 'bg-stone-950/70 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            🏔️ Viewpoints &amp; Ridges
          </button>
          <button
            onClick={() => setPlaceCategoryFilter('heritage')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
              placeCategoryFilter === 'heritage'
                ? 'bg-stone-700 text-white font-bold'
                : 'bg-stone-950/70 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            🛕 Heritage &amp; Monasteries
          </button>
          <button
            onClick={() => setPlaceCategoryFilter('nature')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
              placeCategoryFilter === 'nature'
                ? 'bg-stone-700 text-white font-bold'
                : 'bg-stone-950/70 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            🌲 Nature &amp; Lakes
          </button>
        </div>
      </div>

      {/* Active Route & Direct to Google Maps Navigation Bar */}
      {activeRouteTarget && activeRouteStats && (
        <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border-2 border-emerald-500/80 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-extrabold flex items-center gap-1.5">
                  <Route className="w-3.5 h-3.5 text-emerald-400" />
                  Active Navigation Route
                </span>
                <span className="text-xs text-stone-400">
                  From <strong className="text-white">{activeHubName}</strong>
                </span>
                {activeRouteTarget.type === 'nearby' && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                    🏮 Local Spot
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {activeRouteTarget.name}
                </h3>
                <span className="text-stone-400 text-sm font-medium">({activeRouteTarget.nepaliName})</span>
                {activeRouteTarget.altitude && (
                  <span className="text-xs text-amber-400 font-mono">
                    &bull; {activeRouteTarget.altitude}m elevation
                  </span>
                )}
              </div>

              <p className="text-stone-300 text-xs line-clamp-1 max-w-2xl">
                {activeRouteTarget.shortDesc || activeRouteTarget.highlight}
              </p>

              {/* Route Metric Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <div className="px-3 py-1 rounded-lg bg-stone-950/80 border border-stone-800 text-xs flex items-center gap-1.5 text-stone-200">
                  <span className="text-stone-400">Distance:</span>
                  <span className="font-extrabold text-emerald-400 font-mono">{activeRouteStats.distanceKm.toFixed(1)} km</span>
                </div>
                <div className="px-3 py-1 rounded-lg bg-stone-950/80 border border-stone-800 text-xs flex items-center gap-1.5 text-stone-200">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-stone-400">Drive Time:</span>
                  <span className="font-extrabold text-amber-400 font-mono">~{activeRouteStats.driveMinutes} mins</span>
                </div>
                {activeRouteStats.distanceKm <= 30 && (
                  <div className="px-3 py-1 rounded-lg bg-stone-950/80 border border-stone-800 text-xs flex items-center gap-1.5 text-stone-200">
                    <span>🛵</span>
                    <span className="text-stone-400">Scooter:</span>
                    <span className="font-bold text-cyan-400 font-mono">~{activeRouteStats.scooterMinutes} mins</span>
                  </div>
                )}
              </div>
            </div>

            {/* Travel Mode Selector & Direct to Google Maps Action Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto shrink-0">
              {/* Travel Mode Toggle */}
              <div className="flex items-center bg-stone-950/90 p-1 rounded-xl border border-stone-800 self-start sm:self-center">
                <button
                  onClick={() => setTravelMode('driving')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    travelMode === 'driving' ? 'bg-emerald-600 text-white shadow' : 'text-stone-400 hover:text-white'
                  }`}
                  title="Route by Car / Taxi"
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Car</span>
                </button>
                <button
                  onClick={() => setTravelMode('bicycling')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    travelMode === 'bicycling' ? 'bg-emerald-600 text-white shadow' : 'text-stone-400 hover:text-white'
                  }`}
                  title="Route by Bike / Scooter"
                >
                  <span>🛵</span>
                  <span>Bike</span>
                </button>
                <button
                  onClick={() => setTravelMode('walking')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    travelMode === 'walking' ? 'bg-emerald-600 text-white shadow' : 'text-stone-400 hover:text-white'
                  }`}
                  title="Route by Walking / Hike"
                >
                  <span>🥾</span>
                  <span>Walk</span>
                </button>
              </div>

              {/* PRIMARY GOOGLE MAPS NAVIGATION BUTTON */}
              <a
                href={activeRouteStats.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 transition transform active:scale-95 cursor-pointer"
              >
                <span>🗺️ Direct to Google Maps</span>
                <ExternalLink className="w-4 h-4 text-stone-950" />
              </a>

              {/* Clear route button */}
              <button
                onClick={() => {
                  setActiveRouteTarget(null);
                  setSelectedNearbyItem(null);
                }}
                className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition"
                title="Clear Active Route"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Leaflet Map Container */}
      <div className="relative w-full h-[540px] bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Float Map Legend */}
        <div className="absolute top-4 left-4 bg-stone-900/90 backdrop-blur-md border border-stone-800 rounded-xl p-3 text-xs space-y-1.5 z-10 pointer-events-auto shadow-lg max-w-[220px]">
          <div className="font-bold text-white text-[11px] uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Map Legend</span>
            <span className="text-[10px] text-emerald-400 font-mono">&le; 30m drive</span>
          </div>
          <div className="flex items-center space-x-2 text-amber-300">
            <span className="w-3 h-3 rounded-full bg-amber-500 border border-white"></span>
            <span>🏮 Local Gems &amp; Secrets</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-400">
            <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white"></span>
            <span>🚗 Sights &amp; Scenic Spots</span>
          </div>
          <div className="flex items-center space-x-2 text-amber-400">
            <span className="w-3 h-3 rounded-md bg-amber-500 border border-white"></span>
            <span>Highway Delay / Construction</span>
          </div>
          <div className="flex items-center space-x-2 text-rose-400">
            <span className="w-3 h-3 rounded-full bg-rose-600 border border-white"></span>
            <span>Scam Caution Zone</span>
          </div>
          <div className="flex items-center space-x-2 text-cyan-300 pt-1 border-t border-stone-800">
            <span className="w-3 h-3 rounded-full border-2 border-dashed border-emerald-400"></span>
            <span>30-Min Drive Boundary (~15km)</span>
          </div>
        </div>
      </div>

      {/* Two-Column Telemetry Feed: Accurate Places Within 30-Min Drive & Highway Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Column 1: Accurate Places (Within 30-Min Drive) */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center space-x-2">
              <Car className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-white">
                Places Within a 30-Minute Drive
              </h2>
            </div>
            <span className="text-xs text-emerald-400 font-mono">
              {filteredNearby.length} spots &le; 30 mins
            </span>
          </div>

          <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
            {filteredNearby.map((item) => {
              const isSelected = selectedNearbyItem?.id === item.id;
              const isLocal = !!item.isLocalGem;

              return (
                <div
                  key={item.id}
                  onClick={() => handleFocusNearby(item as any)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-stone-800 border-amber-500/70 shadow-lg ring-1 ring-amber-500/30'
                      : isLocal
                        ? 'bg-amber-950/20 hover:bg-amber-950/30 border-amber-800/40'
                        : 'bg-stone-800/60 hover:bg-stone-800 border-stone-700/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        {isLocal && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-extrabold flex items-center gap-1">
                            <span>🏮 Local Secret</span>
                          </span>
                        )}
                        <span className="text-xs font-bold text-white hover:text-amber-400">
                          {item.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-stone-700 text-stone-300 rounded font-mono">
                          {item.nepaliName}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-300 mt-0.5 line-clamp-2">{item.shortDesc}</p>
                    </div>

                    <div className="text-right whitespace-nowrap shrink-0">
                      <div className="text-xs font-extrabold text-emerald-400 flex items-center justify-end gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.driveMin} min drive</span>
                      </div>
                      <span className="text-[10px] text-stone-400">{item.distanceKm.toFixed(1)} km</span>
                    </div>
                  </div>

                  {/* Local Secret Tip Box */}
                  {item.localTip && (
                    <div className="text-[11px] bg-amber-950/50 border border-amber-700/40 text-amber-200/90 rounded-lg px-2.5 py-1.5 flex items-start space-x-1.5">
                      <span className="text-amber-400 font-bold shrink-0">💡 Tip:</span>
                      <span className="leading-snug">{item.localTip}</span>
                    </div>
                  )}

                  {/* Highlights & Transport metadata */}
                  <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-300 pt-1.5 border-t border-stone-700/40 gap-2">
                    <span className="text-stone-400">
                      🚗 {item.recommendedTransport}: <strong className="text-white">{item.estimatedTaxiFareNpr}</strong>
                    </span>
                    <span className="text-amber-400 text-[10px] font-medium">
                      ⏰ Best: {item.bestTimeOfDay}
                    </span>
                  </div>

                  {/* Route & Direct to Google Maps Actions */}
                  <div className="flex items-center space-x-2 pt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFocusNearby(item as any);
                      }}
                      className="flex-1 py-1.5 px-2.5 rounded-lg bg-stone-700 hover:bg-stone-600 text-stone-200 text-[11px] font-bold flex items-center justify-center space-x-1 transition"
                    >
                      <Route className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Trace on Map</span>
                    </button>
                    <a
                      href={getGoogleMapsRouteUrl(item.coordinates.lat, item.coordinates.lng, item.name, activeCenterLat, activeCenterLng, 'driving')}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-extrabold flex items-center justify-center space-x-1 transition shadow-sm"
                    >
                      <span>Google Maps 🗺️</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: Live Mountain Transit & Traffic Delays */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white">Live Highway Delays &amp; Transit Radar</h2>
            </div>
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Telemetry
            </span>
          </div>

          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {REALTIME_TRAFFIC_ALERTS.map((alert) => (
              <div
                key={alert.id}
                className="p-3.5 rounded-xl bg-stone-800/60 border border-stone-700/60 flex flex-col gap-2 text-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Bus className="w-3.5 h-3.5 text-amber-400" />
                      <span>{alert.highway}</span>
                    </div>
                    <div className="text-[11px] text-white font-medium mt-0.5">{alert.section}</div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800 whitespace-nowrap">
                    +{alert.estimatedDelay}
                  </span>
                </div>

                <p className="text-[11px] text-stone-300 leading-snug">{alert.details}</p>

                <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1.5 border-t border-stone-700/40">
                  <span>Status: <strong className="text-white">{alert.status}</strong></span>
                  <span>{alert.lastUpdated}</span>
                </div>
              </div>
            ))}

            {/* Flight statuses */}
            {TRANSIT_NOTICES.slice(0, 2).map((notice) => (
              <div
                key={notice.id}
                className="p-3 rounded-xl bg-stone-800/40 border border-stone-700/40 flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{notice.route}</span>
                  </div>
                  <p className="text-[11px] text-stone-400 mt-0.5">{notice.notes}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${
                  notice.status === 'On Time'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {notice.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Nearby Spot Details Modal / Drawer (if selected) */}
      {selectedNearbyItem && (
        <div className="bg-stone-900 border border-emerald-500/50 rounded-2xl p-6 shadow-2xl space-y-4 animate-fade-in">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-800 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  📍 Verified 30-Min Drive Location &bull; {selectedNearbyItem.hub}
                </span>
                <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-bold rounded">
                  🚗 ~{selectedNearbyItem.estimatedScooterMin} - {selectedNearbyItem.estimatedScooterMin + 5} min drive
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                {selectedNearbyItem.name} <span className="text-stone-400 text-sm font-normal">({selectedNearbyItem.nepaliName})</span>
              </h2>
              <p className="text-xs text-stone-300 mt-1">{selectedNearbyItem.shortDesc}</p>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href={getGoogleMapsRouteUrl(selectedNearbyItem.coordinates.lat, selectedNearbyItem.coordinates.lng, selectedNearbyItem.name, activeCenterLat, activeCenterLng, 'driving')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 transition shadow-lg shadow-emerald-600/20"
              >
                <span>🗺️ Direct to Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSelectedNearbyItem(null)}
                className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition"
              >
                Close Drawer
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
              <span className="text-stone-400 block mb-1">🌟 Top Highlight</span>
              <div className="text-white font-medium">{selectedNearbyItem.highlight}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
              <span className="text-stone-400 block mb-1">🚕 Transport &amp; Fare</span>
              <div className="text-emerald-400 font-bold">{selectedNearbyItem.recommendedTransport}</div>
              <div className="text-stone-300 mt-1">Estimated Fare: {selectedNearbyItem.estimatedTaxiFareNpr}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
              <span className="text-stone-400 block mb-1">⏰ Best Timing &amp; Elevation</span>
              <div className="text-amber-400 font-bold">{selectedNearbyItem.bestTimeOfDay}</div>
              <div className="text-stone-300 mt-1">{selectedNearbyItem.altitude} meters elevation</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
