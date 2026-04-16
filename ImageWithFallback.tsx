import { MapPin, Navigation, Phone, Clock, Star } from "lucide-react";
import { useState } from "react";

type PlaceType = "all" | "pharmacy" | "hospital";

interface Place {
  id: number;
  name: string;
  type: "pharmacy" | "hospital";
  address: string;
  distance: string;
  phone: string;
  hours: string;
  rating: number;
  lat: number;
  lng: number;
}

export function MapScreen() {
  const [filter, setFilter] = useState<PlaceType>("all");

  const places: Place[] = [
    {
      id: 1,
      name: "Farmacia Cruz Verde",
      type: "pharmacy",
      address: "Av. Principal 123",
      distance: "0.5 km",
      phone: "+56 2 2345 6789",
      hours: "24 horas",
      rating: 4.5,
      lat: -33.4469,
      lng: -70.6663,
    },
    {
      id: 2,
      name: "Centro Médico San José",
      type: "hospital",
      address: "Calle Salud 456",
      distance: "1.2 km",
      phone: "+56 2 3456 7890",
      hours: "Lun-Vie 8:00-20:00",
      rating: 4.8,
      lat: -33.4509,
      lng: -70.6723,
    },
    {
      id: 3,
      name: "Farmacia Salcobrand",
      type: "pharmacy",
      address: "Av. Libertad 789",
      distance: "0.8 km",
      phone: "+56 2 4567 8901",
      hours: "24 horas",
      rating: 4.3,
      lat: -33.4449,
      lng: -70.6643,
    },
    {
      id: 4,
      name: "Hospital Público Central",
      type: "hospital",
      address: "Av. Salud 321",
      distance: "2.1 km",
      phone: "+56 2 5678 9012",
      hours: "24 horas - Urgencias",
      rating: 4.6,
      lat: -33.4529,
      lng: -70.6743,
    },
    {
      id: 5,
      name: "Farmacia Ahumada",
      type: "pharmacy",
      address: "Calle Centro 654",
      distance: "1.5 km",
      phone: "+56 2 6789 0123",
      hours: "Lun-Sab 9:00-22:00",
      rating: 4.4,
      lat: -33.4479,
      lng: -70.6673,
    },
  ];

  const filteredPlaces =
    filter === "all" ? places : places.filter((p) => p.type === filter);

  return (
    <div className="flex flex-col h-full">
      {/* Map Area - Versión simulada */}
      <div className="relative h-64 bg-gradient-to-br from-blue-100 via-green-50 to-blue-50 border-b-4 border-blue-200">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Simulated Map with Markers */}
          <div className="relative w-full h-full">
            {/* Your location */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="relative">
                <div className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg animate-pulse" />
                <div className="absolute inset-0 w-6 h-6 bg-blue-400 rounded-full animate-ping opacity-50" />
              </div>
            </div>

            {/* Pharmacy markers - Only show if filter allows */}
            {(filter === "all" || filter === "pharmacy") && (
              <>
                <MapMarker top="30%" left="40%" color="green" />
                <MapMarker top="60%" left="65%" color="green" />
                <MapMarker top="45%" left="75%" color="green" />
              </>
            )}

            {/* Hospital markers - Only show if filter allows */}
            {(filter === "all" || filter === "hospital") && (
              <>
                <MapMarker top="25%" left="70%" color="red" />
                <MapMarker top="70%" left="30%" color="red" />
              </>
            )}
          </div>
        </div>

        {/* Map overlay info */}
        <div className="absolute top-4 left-4 bg-white rounded-xl p-3 shadow-lg">
          <p className="text-xs text-gray-600">
            <span className="font-medium">Santiago, Chile</span>
          </p>
        </div>

        {/* Locate me button */}
        <button className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors">
          <Navigation className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex gap-2">
        <FilterButton
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label="Todos"
        />
        <FilterButton
          active={filter === "pharmacy"}
          onClick={() => setFilter("pharmacy")}
          label="Farmacias"
        />
        <FilterButton
          active={filter === "hospital"}
          onClick={() => setFilter("hospital")}
          label="Centros médicos"
        />
      </div>

      {/* Places List */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-3">
        {filteredPlaces.map((place) => (
          <div
            key={place.id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex gap-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  place.type === "pharmacy"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-base text-gray-900">{place.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{place.address}</p>

                <div className="flex items-center gap-4 mt-3 text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{place.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{place.hours}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{place.rating}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => {
                      const url = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;
                      window.open(url, "_blank");
                    }}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    Cómo llegar
                  </button>
                  <button
                    onClick={() => window.open(`tel:${place.phone}`)}
                    className="w-10 h-10 bg-gray-100 text-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MapMarker({
  top,
  left,
  color,
}: {
  top: string;
  left: string;
  color: string;
}) {
  const colorClass =
    color === "green"
      ? "bg-green-500 border-green-600"
      : "bg-red-500 border-red-600";

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2"
      style={{ top, left }}
    >
      <div className={`w-4 h-4 ${colorClass} rounded-full border-2 border-white shadow-md`} />
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
        active
          ? "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
}
