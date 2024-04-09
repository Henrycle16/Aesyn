"use client";

import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "../../styles/mapbox.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";


const MapboxMap: React.FC = () => {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const geocoderContainer = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<mapboxgl.Map>();

  React.useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

    const initializeMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/henrycle16/clufzf01c016b01qfe9u27o4a",
        center: [-95, 30],
        zoom: 7.5,
      });

      setMap(mapInstance);

      // Clean up map instance on component unmount
      return () => mapInstance.remove();
    };

    if (!map) {
      initializeMap();
    }
  }, [map]);

  React.useEffect(() => {
    if (map && geocoderContainer.current) {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      });

      // Add geocoder to its container
      geocoderContainer.current.appendChild(geocoder.onAdd(map));
    }
  }, [map]);

  return (
    <div className="relative w-full h-full">
      {/* Geocoder Container */}
      <div>
        <div
          ref={geocoderContainer}
          className="input input-bordered w-full"
          style={{ marginBottom: "20px" }}
        />
      </div>

      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default MapboxMap;
