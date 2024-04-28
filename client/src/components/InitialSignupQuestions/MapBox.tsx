"use client";

import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "../../styles/mapbox.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

type MapboxMapProps = {
  handleLocationChange: (location: string) => void;
  isFormData: string;
};

const MapboxMap: React.FC<MapboxMapProps> = ({ handleLocationChange, isFormData }) => {
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
        zoom: 6,
        interactive: false
      });

      setMap(mapInstance);

      // Clean up map instance on component unmount
      return () => mapInstance.remove();
    };

    if (!map) {
      initializeMap();
    }
  }, [map]);

  const geocoderInitialized = React.useRef(false);

  React.useEffect(() => {
    if (map && geocoderContainer.current && !geocoderInitialized.current) {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: "Search for city in United States", // Placeholder text for the search bar
        types: "place",
      });

      geocoder.on("result", function (e) {
        const inputField = geocoderContainer.current?.querySelector(
          ".mapboxgl-ctrl-geocoder--input"
        ) as HTMLInputElement;
        if (inputField) {
          inputField.value = e.result.place_name;

          console.log(inputField.value); // Log the value after user selection

          // Update the location state in the parent component
          handleLocationChange(inputField.value);
        }
      });

      // Add geocoder to its container
      geocoderContainer.current.appendChild(geocoder.onAdd(map));

      // Add event listener for input event
      const inputField = geocoderContainer.current.querySelector(
        ".mapboxgl-ctrl-geocoder--input"
      ) as HTMLInputElement;
      if (isFormData.length > 0) {
        inputField.value = isFormData;
      }
      if (inputField) {
        inputField.addEventListener("input", (event) => {
          console.log((event.target as HTMLInputElement).value);
        });
      }

      // Set geocoderInitialized to true to prevent re-initialization
      geocoderInitialized.current = true;
    }
  }, [handleLocationChange, isFormData, map]);

  return (
    <div className="h-full flex flex-col gap-3">
      {/* Geocoder Container */}
      <div>
        <div
          ref={geocoderContainer}
          // className="input input-bordered w-full h-full"
          className="input input-bordered"
          // style={{ marginBottom: "20px" }}
        />
      </div>

      {/* Map Container */}
      {/* <div ref={mapContainer} className="w-full h-full" /> */}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default MapboxMap;
