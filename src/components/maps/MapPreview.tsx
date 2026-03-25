'use client';

import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useRef } from 'react';

interface MapPreviewProps {
  lat: number;
  lng: number;
  height?: number;
  className?: string;
}

function PulseMarker({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    const icon = L.divIcon({
      className: '',
      html: `<div style="position:relative;width:20px;height:20px;">
        <div style="
          position:absolute;
          width:20px;height:20px;
          background:rgba(160,201,255,0.25);
          border-radius:50%;
          animation:map-preview-pulse 2s infinite;
        "></div>
        <div style="
          position:absolute;
          top:5px;left:5px;
          width:10px;height:10px;
          background:#a0c9ff;
          border-radius:50%;
          box-shadow:0 0 6px #a0c9ff80;
        "></div>
      </div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    const marker = L.marker([lat, lng], { icon, interactive: false }).addTo(map);
    markerRef.current = marker;

    return () => {
      marker.remove();
    };
  }, [lat, lng, map]);

  return null;
}

function InvalidateSizeOnMount() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100);
  }, [map]);
  return null;
}

export default function MapPreview({
  lat,
  lng,
  height = 128,
  className = '',
}: MapPreviewProps) {
  return (
    <div className={className} style={{ height, width: '100%', overflow: 'hidden', borderRadius: '6px' }}>
      <MapContainer
        center={[lat, lng]}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={false}
        dragging={false}
        doubleClickZoom={false}
        touchZoom={false}
        keyboard={false}
      >
        <InvalidateSizeOnMount />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <PulseMarker lat={lat} lng={lng} />
      </MapContainer>

      <style>{`
        @keyframes map-preview-pulse {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(1); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
