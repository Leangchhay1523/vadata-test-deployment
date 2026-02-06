"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, TrendingUp, Users, Building2 } from "lucide-react";

interface Location {
  name: string;
  lat: number;
  lng: number;
  fitLevel: "High" | "Medium" | "Low";
  explanation: string;
  customerType: string;
  suitability: string;
}

const cambodiaLocations: Location[] = [
  {
    name: "Phnom Penh (Central)",
    lat: 11.5564,
    lng: 104.9282,
    fitLevel: "High",
    explanation:
      "Capital city with highest economic activity, startup density, and tech adoption.",
    customerType: "Young professionals, startups, SMEs, university students",
    suitability:
      "Best for early-stage B2B and B2C validation with diverse customer segments",
  },
  {
    name: "Siem Reap",
    lat: 13.3633,
    lng: 103.8564,
    fitLevel: "High",
    explanation:
      "Tourism hub with growing tech scene and international exposure.",
    customerType:
      "Tourism businesses, hospitality sector, international visitors",
    suitability: "Ideal for tourism-related, hospitality, and F&B startups",
  },
  {
    name: "Battambang",
    lat: 13.0957,
    lng: 103.2022,
    fitLevel: "Medium",
    explanation:
      "Second-largest city with emerging business ecosystem and agricultural base.",
    customerType: "Agricultural businesses, regional SMEs, students",
    suitability: "Good for agritech, education, and regional market testing",
  },
  {
    name: "Sihanoukville",
    lat: 10.6093,
    lng: 103.5296,
    fitLevel: "Medium",
    explanation: "Coastal economic zone with diverse business activities.",
    customerType: "Port businesses, logistics companies, hospitality sector",
    suitability: "Suitable for logistics, trade, and hospitality validation",
  },
  {
    name: "Kampong Cham",
    lat: 12.0,
    lng: 105.45,
    fitLevel: "Medium",
    explanation:
      "Provincial hub connecting Phnom Penh to northeastern regions.",
    customerType: "Regional traders, agricultural communities, students",
    suitability: "Good for testing solutions with semi-urban demographics",
  },
];

interface MarketFitMapProps {
  sector: string;
  showRecommendedList?: boolean;
  showMapOnly?: boolean;
}

export function MarketFitMap({
  sector,
  showRecommendedList = true,
  showMapOnly = false,
}: MarketFitMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  // Filter and sort locations by fit level
  const sortedLocations = [...cambodiaLocations]
    .filter((loc) => loc.fitLevel !== "Low")
    .sort((a, b) => {
      const order = { High: 0, Medium: 1, Low: 2 };
      return order[a.fitLevel] - order[b.fitLevel];
    })
    .slice(0, 5);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Import leaflet dynamically to avoid SSR issues
    import("leaflet").then((leaflet) => {
      const L = leaflet.default;

      // Initialize map
      const map = L.map(mapRef.current!).setView([12.5657, 104.991], 7);

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      // Add large circle markers for each location based on fit level
      cambodiaLocations.forEach((location) => {
        const color =
          location.fitLevel === "High"
            ? "#00c950" // green-500 for High
            : location.fitLevel === "Medium"
              ? "#F59E0B" // yellow-500 for Medium
              : "#06B6D4"; // cyan-500 for Low/Lower

        // Larger circle marker with glow effect
        const circleMarker = L.circleMarker([location.lat, location.lng], {
          radius: 25,
          fillColor: color,
          color: "white",
          weight: 3,
          opacity: 1,
          fillOpacity: 0.7,
          className: "market-fit-circle",
        })
          .addTo(map)
          .bindPopup(
            `<div class="font-semibold text-sm">${location.name}</div><small class="text-xs">${location.explanation}</small>`,
          );

        // Add hover effects
        circleMarker.on("mouseover", function () {
          this.setStyle({
            radius: 32,
            fillOpacity: 0.9,
          });
        });

        circleMarker.on("mouseout", function () {
          this.setStyle({
            radius: 25,
            fillOpacity: 0.7,
          });
        });

        circleMarker.on("click", () => {
          setSelectedLocation(location);
        });
      });

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // If showMapOnly is false and showRecommendedList is true, only show recommended list
  if (!showMapOnly && showRecommendedList) {
    return (
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            Recommended Locations
          </h3>
        </div>

        <div className="space-y-4">
          {sortedLocations.slice(0, 5).map((location, index) => (
            <div
              key={location.name}
              className={`p-4 rounded-xl border border-border/50 bg-secondary/30 hover:bg-secondary/50 transition-colors ${
                index === 0 ? "ring-1 ring-green-500/30" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white ${
                    index === 0
                      ? "bg-gradient-to-r from-purple-500 to-pink-500"
                      : index === 1
                        ? "bg-gradient-to-r from-pink-500 to-cyan-400"
                        : "bg-gradient-to-r from-cyan-400 to-purple-500"
                  }`}
                >
                  {index + 1}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-foreground">
                      {location.name}
                    </h4>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        location.fitLevel === "High"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-yellow-500/20 text-yellow-300"
                      }`}
                    >
                      {location.fitLevel}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {location.explanation}
                  </p>

                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-muted-foreground">
                          Customers:{" "}
                        </span>
                        <span className="text-foreground">
                          {location.customerType}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Building2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-muted-foreground">
                          Best for:{" "}
                        </span>
                        <span className="text-foreground">
                          {location.suitability}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Data source attribution */}
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Rankings derived from ODC economic data, DataEF government
            statistics, and startup ecosystem analysis
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Map Visualization */}
      <div className="bg-card rounded-2xl p-6 border border-border mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            Market Fit Heatmap
          </h3>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-muted-foreground">High Potential</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-muted-foreground">Medium Potential</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            <span className="text-muted-foreground">Lower Potential</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-muted-foreground">Minimal Potential</span>
          </div>
        </div>

        {/* Map Container */}
        <div
          ref={mapRef}
          className="relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden border border-border shadow-inner"
        />

        {/* Selected location detail */}
        {selectedLocation && (
          <div
            className={`mt-4 p-4 rounded-xl border animate-in fade-in slide-in-from-bottom-2 ${
              selectedLocation.fitLevel === "High"
                ? "bg-gradient-to-r from-green-500/20 to-green-500/10 border-green-500/30"
                : "bg-gradient-to-r from-yellow-500/20 to-yellow-500/10 border-yellow-500/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  selectedLocation.fitLevel === "High"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              />
              <h4 className="font-semibold text-foreground">
                {selectedLocation.name}
              </h4>
              <span
                className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                  selectedLocation.fitLevel === "High"
                    ? "bg-green-500/20 text-green-600"
                    : "bg-yellow-500/20 text-yellow-300"
                }`}
              >
                {selectedLocation.fitLevel} Fit
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {selectedLocation.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Recommended Locations List */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            Recommended Locations
          </h3>
        </div>

        <div className="space-y-4">
          {sortedLocations.slice(0, 5).map((location, index) => (
            <div
              key={location.name}
              className={`p-4 rounded-xl border border-border/50 bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer ${
                index === 0 ? "ring-1 ring-green-500/30" : ""
              }`}
              onClick={() => setSelectedLocation(location)}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white ${
                    index === 0
                      ? "bg-gradient-to-r from-purple-500 to-pink-500"
                      : index === 1
                        ? "bg-gradient-to-r from-pink-500 to-cyan-400"
                        : "bg-gradient-to-r from-cyan-400 to-purple-500"
                  }`}
                >
                  {index + 1}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-foreground">
                      {location.name}
                    </h4>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        location.fitLevel === "High"
                          ? "bg-green-500/20 text-green-600"
                          : "bg-yellow-500/20 text-yellow-600"
                      }`}
                    >
                      {location.fitLevel}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {location.explanation}
                  </p>

                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-muted-foreground">
                          Customers:{" "}
                        </span>
                        <span className="text-foreground">
                          {location.customerType}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Building2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="text-muted-foreground">
                          Best for:{" "}
                        </span>
                        <span className="text-foreground">
                          {location.suitability}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Data source attribution */}
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Rankings derived from ODC economic data, DataEF government
            statistics, and startup ecosystem analysis
          </p>
        </div>
      </div>
    </div>
  );
}
