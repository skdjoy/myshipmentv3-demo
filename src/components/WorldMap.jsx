import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Polyline, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ports = [
  { name: "Shanghai", lat: 31.23, lng: 121.47, shipments: 247, status: "green", isOrigin: true },
  { name: "Ho Chi Minh City", lat: 10.82, lng: 106.63, shipments: 134, status: "green", isOrigin: true },
  { name: "Dhaka", lat: 23.81, lng: 90.41, shipments: 89, status: "amber", isOrigin: true },
  { name: "Mumbai", lat: 19.08, lng: 72.88, shipments: 42, status: "green", isOrigin: true },
  { name: "Jakarta", lat: -6.21, lng: 106.85, shipments: 67, status: "red", isOrigin: true },
  { name: "Rotterdam", lat: 51.92, lng: 4.48, shipments: 247, status: "green", isOrigin: false },
  { name: "Hamburg", lat: 53.55, lng: 9.99, shipments: 89, status: "amber", isOrigin: false },
  { name: "Los Angeles", lat: 33.74, lng: -118.27, shipments: 134, status: "green", isOrigin: false },
  { name: "New York", lat: 40.71, lng: -74.01, shipments: 42, status: "green", isOrigin: false },
  { name: "Felixstowe", lat: 51.96, lng: 1.35, shipments: 67, status: "red", isOrigin: false },
];

const tradeLanes = [
  { from: 0, to: 5, label: "247 shipments", weight: 3.5 },
  { from: 1, to: 7, label: "134 shipments", weight: 2.5 },
  { from: 2, to: 6, label: "89 shipments", weight: 2 },
  { from: 3, to: 8, label: "42 shipments", weight: 1.5 },
  { from: 4, to: 9, label: "67 shipments", weight: 2 },
];

const statusColor = {
  green: "#22C55E",
  amber: "#F59E0B",
  red: "#EF4444",
};

const statusGlow = {
  green: "rgba(34,197,94,0.35)",
  amber: "rgba(245,158,11,0.35)",
  red: "rgba(239,68,68,0.35)",
};

// Generate curved arc points between two coordinates (geodesic approximation)
const getCurvedPath = (from, to, numPoints = 30) => {
  const points = [];
  const latDiff = to.lat - from.lat;
  const lngDiff = to.lng - from.lng;
  const dist = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const lat = from.lat + latDiff * t;
    const lng = from.lng + lngDiff * t;
    // Arc curvature — peaks at midpoint, proportional to distance
    const arc = Math.sin(t * Math.PI) * dist * 0.15;
    points.push([lat + arc, lng]);
  }
  return points;
};

// Scale marker radius by shipment volume
const getMarkerRadius = (shipments) => {
  const min = 5;
  const max = 11;
  const scale = Math.min(shipments / 250, 1);
  return min + scale * (max - min);
};

// Animated pulsing ring overlay for each port
const PulsingMarker = ({ center, color, radius }) => {
  return (
    <>
      {/* Outer glow ring */}
      <CircleMarker
        center={center}
        radius={radius + 5}
        pathOptions={{
          fillColor: color,
          fillOpacity: 0.08,
          color: color,
          weight: 1,
          opacity: 0.15,
        }}
      />
      {/* Middle ring */}
      <CircleMarker
        center={center}
        radius={radius + 2}
        pathOptions={{
          fillColor: color,
          fillOpacity: 0.12,
          color: color,
          weight: 1,
          opacity: 0.25,
        }}
      />
    </>
  );
};

const WorldMap = () => {
  return (
    <div className="rounded-lg overflow-hidden h-full relative" style={{ minHeight: 380 }}>
      <h3 className="font-oswald text-mgh-blue text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-mgh-cyan animate-pulse" />
        Global Shipment Map
        <span className="font-barlow text-[10px] font-normal normal-case text-mgh-grey ml-auto">
          Live · 1,247 active shipments
        </span>
      </h3>
      <div className="rounded-lg overflow-hidden map-container" style={{ height: 'calc(100% - 28px)' }}>
        <MapContainer
          center={[25, 30]}
          zoom={2}
          minZoom={2}
          maxZoom={6}
          style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
          scrollWheelZoom={true}
          attributionControl={false}
          zoomControl={false}
        >
          {/* Dark premium tile layer */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          />
          {/* Subtle labels on top */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
            opacity={0.4}
          />

          {/* Trade Lane Curved Lines */}
          {tradeLanes.map((lane, i) => {
            const from = ports[lane.from];
            const to = ports[lane.to];
            const curvedPath = getCurvedPath(from, to);
            return (
              <React.Fragment key={`lane-${i}`}>
                {/* Glow under-line */}
                <Polyline
                  positions={curvedPath}
                  pathOptions={{
                    color: '#00D4FF',
                    weight: lane.weight + 4,
                    opacity: 0.08,
                    lineCap: 'round',
                    lineJoin: 'round',
                  }}
                />
                {/* Main line */}
                <Polyline
                  positions={curvedPath}
                  pathOptions={{
                    color: '#00D4FF',
                    weight: lane.weight,
                    opacity: 0.55,
                    dashArray: '10, 8',
                    lineCap: 'round',
                    lineJoin: 'round',
                  }}
                >
                  <Tooltip
                    permanent={false}
                    direction="center"
                    className="map-tooltip"
                  >
                    <div style={{ fontFamily: 'Barlow Condensed, sans-serif', padding: '2px 0' }}>
                      <strong style={{ color: '#34328F' }}>{from.name} → {to.name}</strong>
                      <br />
                      <span style={{ color: '#00D4FF', fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
                        {lane.label}
                      </span>
                    </div>
                  </Tooltip>
                </Polyline>
              </React.Fragment>
            );
          })}

          {/* Port Markers */}
          {ports.map((port, i) => {
            const color = statusColor[port.status];
            const radius = getMarkerRadius(port.shipments);
            return (
              <React.Fragment key={i}>
                {/* Pulsing glow rings */}
                <PulsingMarker center={[port.lat, port.lng]} color={color} radius={radius} />
                {/* Main dot */}
                <CircleMarker
                  center={[port.lat, port.lng]}
                  radius={radius}
                  pathOptions={{
                    fillColor: color,
                    fillOpacity: 0.9,
                    color: '#FFFFFF',
                    weight: 1.5,
                    opacity: 0.8,
                  }}
                >
                  <Tooltip direction="top" offset={[0, -10]} className="map-tooltip">
                    <div style={{ fontFamily: 'Barlow Condensed, sans-serif', minWidth: 120 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <span style={{
                          width: 8, height: 8, borderRadius: '50%', background: color,
                          display: 'inline-block', boxShadow: `0 0 6px ${color}`
                        }} />
                        <strong style={{ fontSize: 13, color: '#2A2A38' }}>{port.name}</strong>
                      </div>
                      <div style={{ fontSize: 12, color: '#B2B8BF' }}>
                        {port.isOrigin ? 'Origin Port' : 'Destination Port'}
                      </div>
                      <div style={{ fontFamily: 'Space Mono, monospace', fontWeight: 700, fontSize: 14, color: '#34328F', marginTop: 2 }}>
                        {port.shipments} shipments
                      </div>
                      <div style={{
                        marginTop: 4, fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
                        color: color, letterSpacing: 1
                      }}>
                        {port.status === 'green' ? 'ON SCHEDULE' : port.status === 'amber' ? 'AT RISK' : 'DELAYED'}
                      </div>
                    </div>
                  </Tooltip>
                </CircleMarker>
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>

      {/* Overlay gradient at bottom edge for polish */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/10 to-transparent z-[999] pointer-events-none rounded-b-lg" />

      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-[#0a0e23]/80 backdrop-blur-md rounded-lg px-4 py-2.5 flex items-center gap-4 shadow-lg border border-white/5">
        {[
          { color: '#22C55E', label: 'On Time' },
          { color: '#F59E0B', label: 'At Risk' },
          { color: '#EF4444', label: 'Delayed' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }}
            />
            <span className="text-[10px] text-white/80 font-barlow font-bold uppercase tracking-wider">
              {item.label}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-1.5 ml-1 pl-3 border-l border-white/10">
          <span className="w-6 h-0.5 bg-[#00D4FF] rounded" style={{ boxShadow: '0 0 4px #00D4FF' }} />
          <span className="text-[10px] text-white/80 font-barlow font-bold uppercase tracking-wider">
            Trade Lane
          </span>
        </div>
      </div>

      {/* Stats overlay top-right */}
      <div className="absolute top-10 right-3 z-[1000] bg-[#0a0e23]/75 backdrop-blur-md rounded-lg p-3 shadow-lg border border-white/5 space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold text-[#00D4FF]">5</span>
          <span className="text-[10px] text-white/60 font-barlow uppercase tracking-wider">Trade Lanes</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold text-[#22C55E]">579</span>
          <span className="text-[10px] text-white/60 font-barlow uppercase tracking-wider">Total Shipments</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold text-[#F59E0B]">2</span>
          <span className="text-[10px] text-white/60 font-barlow uppercase tracking-wider">At Risk Ports</span>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
