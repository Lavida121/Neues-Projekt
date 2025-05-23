'use client';

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { TileLayer, Marker, Popup } from 'react-leaflet';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), {
  ssr: false
});

type Props = {
  stations: any[];
};

export default function Map({ stations }: Props): JSX.Element {
  const center: [number, number] = stations.length
    ? [stations[0].lat, stations[0].lng]
    : [48.1351, 11.5820];

  return (
    <MapContainer
      {...({
        center,
        zoom: 13,
        style: { height: '400px', width: '100%' }
      } as any)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {stations.map((s) => (
        <Marker
          key={s.id}
          position={[s.lat, s.lng]}
          icon={L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        >
          <Popup>
            <strong>{s.name}</strong><br />
            {s.street}, {s.place}<br />
            Diesel: {s.diesel} €<br />
            E5: {s.e5} €<br />
            E10: {s.e10} €
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
