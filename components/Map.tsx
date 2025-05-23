'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Station = {
  id: string;
  name: string;
  street: string;
  place: string;
  lat: number;
  lng: number;
  diesel: number;
  e5: number;
  e10: number;
};

type Props = {
  stations: Station[];
};

export default function Map({ stations }: Props) {
  const center: [number, number] =
    stations.length > 0
      ? [stations[0].lat, stations[0].lng]
      : [48.1351, 11.5820];

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.lat, station.lng]}
          icon={L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        >
          <Popup>
            <strong>{station.name}</strong><br />
            {station.street}, {station.place}<br />
            Diesel: {station.diesel} €<br />
            E5: {station.e5} €<b
