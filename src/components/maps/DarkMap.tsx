'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

interface MarkerData {
  lat: number;
  lng: number;
  label: string;
  color?: string;
}

interface DarkMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MarkerData[];
  className?: string;
  height?: string | number;
}

function createCircleIcon(color: string = '#a0c9ff') {
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 14px;
      height: 14px;
      background: ${color};
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      box-shadow: 0 0 8px ${color}80;
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -10],
  });
}

function InvalidateSizeOnMount() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100);
  }, [map]);
  return null;
}

export default function DarkMap({
  center = [54.6872, 25.2797],
  zoom = 12,
  markers = [],
  className = '',
  height = 400,
}: DarkMapProps) {
  return (
    <div className={className} style={{ height, width: '100%' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%', borderRadius: '8px' }}
        zoomControl={true}
        attributionControl={true}
      >
        <InvalidateSizeOnMount />
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {markers.map((m, i) => (
          <Marker key={i} position={[m.lat, m.lng]} icon={createCircleIcon(m.color)}>
            <Popup>
              <span style={{ color: '#e3e2e7', background: '#1e1f23', padding: '4px 8px', borderRadius: '4px', fontSize: '13px' }}>
                {m.label}
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
