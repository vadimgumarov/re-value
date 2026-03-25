'use client';

import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useCallback, useMemo } from 'react';
import type { Feature, FeatureCollection, Polygon } from 'geojson';

interface DistrictMapProps {
  selectedDistrict?: string | null;
  onDistrictClick?: (district: string) => void;
  className?: string;
  height?: string | number;
  topDistrict?: string;
  profitPercent?: number;
}

type DistrictCategory = 'premium' | 'growth' | 'stable';

interface DistrictProperties {
  name: string;
  category: DistrictCategory;
}

const categoryColors: Record<DistrictCategory, string> = {
  premium: '#a0c9ff',
  growth: '#6bde80',
  stable: '#414751',
};

const categoryLabels: Record<DistrictCategory, string> = {
  premium: 'Aukščiausios klasės',
  growth: 'Augimo koridoriai',
  stable: 'Stabilios zonos',
};

// Simplified GeoJSON polygons for Vilnius districts (approximate coordinates)
const districtFeatures: Feature<Polygon, DistrictProperties>[] = [
  {
    type: 'Feature',
    properties: { name: 'Senamiestis', category: 'premium' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [25.277, 54.682], [25.290, 54.685], [25.296, 54.680],
        [25.292, 54.674], [25.280, 54.674], [25.277, 54.682],
      ]],
    },
  },
  {
    type: 'Feature',
    properties: { name: 'Žvėrynas', category: 'premium' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [25.240, 54.692], [25.258, 54.698], [25.268, 54.694],
        [25.265, 54.686], [25.248, 54.684], [25.240, 54.692],
      ]],
    },
  },
  {
    type: 'Feature',
    properties: { name: 'Naujamiestis', category: 'growth' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [25.260, 54.674], [25.280, 54.674], [25.284, 54.666],
        [25.270, 54.660], [25.254, 54.664], [25.260, 54.674],
      ]],
    },
  },
  {
    type: 'Feature',
    properties: { name: 'Šnipiškės', category: 'growth' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [25.270, 54.698], [25.290, 54.702], [25.298, 54.696],
        [25.290, 54.688], [25.275, 54.686], [25.270, 54.698],
      ]],
    },
  },
  {
    type: 'Feature',
    properties: { name: 'Žirmūnai', category: 'stable' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [25.290, 54.702], [25.318, 54.710], [25.330, 54.702],
        [25.320, 54.692], [25.298, 54.696], [25.290, 54.702],
      ]],
    },
  },
  {
    type: 'Feature',
    properties: { name: 'Antakalnis', category: 'stable' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [25.296, 54.680], [25.320, 54.692], [25.345, 54.688],
        [25.340, 54.675], [25.310, 54.672], [25.296, 54.680],
      ]],
    },
  },
  {
    type: 'Feature',
    properties: { name: 'Pašilaičiai', category: 'stable' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [25.195, 54.715], [25.225, 54.722], [25.240, 54.715],
        [25.235, 54.705], [25.210, 54.702], [25.195, 54.715],
      ]],
    },
  },
  {
    type: 'Feature',
    properties: { name: 'Fabijoniškės', category: 'stable' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [25.225, 54.722], [25.252, 54.726], [25.260, 54.718],
        [25.250, 54.710], [25.240, 54.715], [25.225, 54.722],
      ]],
    },
  },
  {
    type: 'Feature',
    properties: { name: 'Karoliniškės', category: 'stable' },
    geometry: {
      type: 'Polygon',
      coordinates: [[
        [25.210, 54.702], [25.235, 54.705], [25.240, 54.698],
        [25.232, 54.690], [25.215, 54.692], [25.210, 54.702],
      ]],
    },
  },
];

const geojsonData: FeatureCollection<Polygon, DistrictProperties> = {
  type: 'FeatureCollection',
  features: districtFeatures,
};

function InvalidateSizeOnMount() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100);
  }, [map]);
  return null;
}

function Legend() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 12,
        right: 12,
        background: 'rgba(18,19,23,0.92)',
        border: '1px solid #414751',
        borderRadius: '6px',
        padding: '10px 14px',
        zIndex: 1000,
        fontSize: '11px',
        color: '#e3e2e7',
      }}
    >
      {(Object.keys(categoryColors) as DistrictCategory[]).map((cat) => (
        <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 4 }}>
          <span
            style={{
              display: 'inline-block',
              width: 12,
              height: 12,
              borderRadius: 2,
              background: categoryColors[cat],
              opacity: 0.7,
            }}
          />
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            {categoryLabels[cat]}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function DistrictMap({
  selectedDistrict = null,
  onDistrictClick,
  className = '',
  height = 500,
  topDistrict = 'Senamiestis',
  profitPercent = 8.4,
}: DistrictMapProps) {
  const styleFeature = useCallback(
    (feature: Feature<Polygon, DistrictProperties> | undefined) => {
      if (!feature) return {};
      const cat = feature.properties.category;
      const isSelected = feature.properties.name === selectedDistrict;
      return {
        fillColor: categoryColors[cat],
        fillOpacity: isSelected ? 0.7 : 0.35,
        color: isSelected ? '#e3e2e7' : '#414751',
        weight: isSelected ? 2.5 : 1,
      };
    },
    [selectedDistrict]
  );

  const onEachFeature = useCallback(
    (feature: Feature<Polygon, DistrictProperties>, layer: L.Layer) => {
      const name = feature.properties.name;
      layer.bindTooltip(name, {
        sticky: true,
        className: 'district-tooltip',
        direction: 'top',
      });
      layer.on('click', () => {
        onDistrictClick?.(name);
      });
      layer.on('mouseover', (e) => {
        const target = e.target as L.Path;
        target.setStyle({ fillOpacity: 0.6, weight: 2 });
      });
      layer.on('mouseout', (e) => {
        const target = e.target as L.Path;
        const cat = feature.properties.category;
        const isSelected = feature.properties.name === selectedDistrict;
        target.setStyle({
          fillOpacity: isSelected ? 0.7 : 0.35,
          weight: isSelected ? 2.5 : 1,
        });
      });
    },
    [onDistrictClick, selectedDistrict]
  );

  // Use key to force re-render GeoJSON when selectedDistrict changes
  const geoKey = useMemo(() => `geo-${selectedDistrict}`, [selectedDistrict]);

  return (
    <div className={className} style={{ height, position: 'relative' }}>
      <MapContainer
        center={[54.692, 25.280]}
        zoom={13}
        style={{ height: 'calc(100% - 36px)', width: '100%', borderRadius: '8px 8px 0 0' }}
        zoomControl={true}
        attributionControl={true}
      >
        <InvalidateSizeOnMount />
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <GeoJSON
          key={geoKey}
          data={geojsonData}
          style={styleFeature as L.StyleFunction}
          onEachFeature={onEachFeature}
        />
      </MapContainer>

      {/* Legend overlay */}
      <Legend />

      {/* Bottom info bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 14px',
          background: '#1e1f23',
          borderRadius: '0 0 8px 8px',
          fontSize: '11px',
          color: '#8b919c',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        <span>
          Populiariausias rajonas: <span style={{ color: '#a0c9ff' }}>{topDistrict}</span>
        </span>
        <span>
          Pelningumas: <span style={{ color: '#6bde80' }}>{profitPercent}%</span>
        </span>
      </div>

      <style>{`
        .district-tooltip {
          background: #292a2e !important;
          color: #e3e2e7 !important;
          border: 1px solid #414751 !important;
          border-radius: 4px !important;
          font-size: 12px !important;
          padding: 3px 8px !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4) !important;
        }
        .district-tooltip::before {
          border-top-color: #414751 !important;
        }
      `}</style>
    </div>
  );
}
