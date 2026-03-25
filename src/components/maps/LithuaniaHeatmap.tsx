'use client';

import { useState, useCallback } from 'react';

interface RegionData {
  region: string;
  value: number;
  label: string;
}

interface LithuaniaHeatmapProps {
  data?: RegionData[];
  selectedCity?: string;
  className?: string;
  height?: string | number;
}

const defaultData: RegionData[] = [
  { region: 'Vilnius', value: 0.9, label: 'Vilnius' },
  { region: 'Kaunas', value: 0.7, label: 'Kaunas' },
  { region: 'Klaipėda', value: 0.6, label: 'Klaipėda' },
  { region: 'Šiauliai', value: 0.35, label: 'Šiauliai' },
  { region: 'Panevėžys', value: 0.3, label: 'Panevėžys' },
];

// Simplified region polygons in SVG coordinates (viewBox: 0 0 400 350)
const regionPaths: Record<string, { path: string; center: [number, number] }> = {
  Vilnius: {
    path: 'M260,140 L320,120 L360,150 L370,210 L340,260 L290,270 L250,240 L240,190 Z',
    center: [305, 190],
  },
  Kaunas: {
    path: 'M150,150 L210,130 L260,140 L250,240 L240,270 L200,280 L160,260 L140,210 Z',
    center: [200, 200],
  },
  'Klaipėda': {
    path: 'M20,100 L60,80 L100,90 L110,150 L100,210 L80,240 L40,230 L20,180 Z',
    center: [65, 160],
  },
  'Šiauliai': {
    path: 'M100,30 L170,20 L210,40 L210,130 L150,150 L110,150 L100,90 Z',
    center: [155, 85],
  },
  'Panevėžys': {
    path: 'M210,40 L280,30 L320,50 L320,120 L260,140 L210,130 Z',
    center: [265, 85],
  },
};

// Lithuania country outline (simplified)
const lithuaniaOutline =
  'M20,100 L40,60 L80,30 L100,30 L170,20 L210,40 L280,30 L320,50 L360,80 L370,120 L360,150 L370,210 L340,260 L290,270 L240,270 L200,280 L160,260 L140,280 L100,300 L60,290 L30,260 L20,230 L20,180 L30,140 Z';

// City pin positions in SVG coordinates
const cityPins: Record<string, [number, number]> = {
  Vilnius: [310, 185],
  Kaunas: [195, 195],
  'Klaipėda': [45, 155],
  'Šiauliai': [145, 75],
  'Panevėžys': [270, 80],
};

function getHeatColor(value: number): string {
  if (value >= 0.7) return '#4894e3';
  if (value >= 0.5) return '#293e48';
  return '#1a1b1f';
}

export default function LithuaniaHeatmap({
  data = defaultData,
  selectedCity = 'Vilnius',
  className = '',
  height = 400,
}: LithuaniaHeatmapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  const getRegionValue = useCallback(
    (region: string) => {
      const d = data.find((r) => r.region === region);
      return d?.value ?? 0;
    },
    [data]
  );

  const getRegionLabel = useCallback(
    (region: string) => {
      const d = data.find((r) => r.region === region);
      return d?.label ?? region;
    },
    [data]
  );

  return (
    <div className={className} style={{ height, background: '#121317', borderRadius: '8px', padding: '16px', position: 'relative' }}>
      <svg
        viewBox="0 0 400 350"
        style={{ width: '100%', height: 'calc(100% - 40px)' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Country outline background */}
        <path d={lithuaniaOutline} fill="#1a1b1f" stroke="#414751" strokeWidth="1.5" />

        {/* Region polygons */}
        {Object.entries(regionPaths).map(([region, { path }]) => {
          const value = getRegionValue(region);
          const isHovered = hoveredRegion === region;
          const color = getHeatColor(value);
          const hoverColor = isHovered ? '#4894e3' : color;

          return (
            <path
              key={region}
              d={path}
              fill={hoverColor}
              fillOpacity={isHovered ? 0.9 : 0.7}
              stroke="#414751"
              strokeWidth="1"
              style={{ cursor: 'pointer', transition: 'fill 0.2s, fill-opacity 0.2s' }}
              onMouseEnter={(e) => {
                setHoveredRegion(region);
                const rect = (e.target as SVGElement).ownerSVGElement?.getBoundingClientRect();
                if (rect) {
                  setTooltip({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top - 10,
                    text: `${getRegionLabel(region)}: ${(value * 100).toFixed(0)}%`,
                  });
                }
              }}
              onMouseMove={(e) => {
                const rect = (e.target as SVGElement).ownerSVGElement?.getBoundingClientRect();
                if (rect) {
                  setTooltip({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top - 10,
                    text: `${getRegionLabel(region)}: ${(value * 100).toFixed(0)}%`,
                  });
                }
              }}
              onMouseLeave={() => {
                setHoveredRegion(null);
                setTooltip(null);
              }}
            />
          );
        })}

        {/* City pin for selected city */}
        {selectedCity && cityPins[selectedCity] && (
          <g transform={`translate(${cityPins[selectedCity][0]}, ${cityPins[selectedCity][1]})`}>
            <circle r="6" fill="#a0c9ff" opacity="0.3">
              <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle r="4" fill="#a0c9ff" />
            <circle r="1.5" fill="#121317" />
          </g>
        )}

        {/* Region labels */}
        {Object.entries(regionPaths).map(([region, { center }]) => (
          <text
            key={`label-${region}`}
            x={center[0]}
            y={center[1]}
            textAnchor="middle"
            fill="#e3e2e7"
            fontSize="10"
            fontWeight="500"
            style={{ pointerEvents: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
          >
            {region}
          </text>
        ))}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: 'absolute',
            left: tooltip.x,
            top: tooltip.y,
            background: '#292a2e',
            color: '#e3e2e7',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '12px',
            pointerEvents: 'none',
            transform: 'translate(-50%, -100%)',
            whiteSpace: 'nowrap',
            border: '1px solid #414751',
            zIndex: 10,
          }}
        >
          {tooltip.text}
        </div>
      )}

      {/* Bottom bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0 0', fontSize: '11px', color: '#8b919c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        <span>Regionas</span>
        <span>Šilumos indeksas</span>
      </div>
    </div>
  );
}
