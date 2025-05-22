import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Home() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch("/api/stations?lat=48.1351&lng=11.5820")
      .then((res) => res.json())
      .then((data) => setStations(data.stations || []));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tankstellen in deiner Nähe</h1>
      <Map stations={stations} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {stations.map((station) => (
          <div key={station.id} className="border p-2 rounded shadow">
            <h2 className="font-semibold text-lg">{station.name}</h2>
            <p>{station.street}, {station.place}</p>
            <p>Diesel: {station.diesel} €</p>
            <p>E5: {station.e5} €</p>
            <p>E10: {station.e10} €</p>
          </div>
        ))}
      </div>
    </div>
  );
}
