"use client";

import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import "@/styles/mapbox.css";

type FollowerCity = {
  city: string;
  value: number;
};

type MapboxProps = {
  cities: FollowerCity[];
};

const MapboxChart: React.FC<MapboxProps> = ({ cities }) => {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<mapboxgl.Map>();

  // Set the Mapbox access token
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

  React.useEffect(() => {
    if (mapboxgl.supported()) {
      // Function to initialize the map
      const initializeMap = () => {
        // Ensure the map container is empty
        if (mapContainer.current) {
          mapContainer.current.innerHTML = "";
        }

        const mapInstance = new mapboxgl.Map({
          container: mapContainer.current!,
          style: "mapbox://styles/henrycle16/cm1ft5ulr00xt01qkbcs4d2tz",
          center: [-98.5795, 37.8283],
          zoom: 3.5,
          minZoom: 3, // Minimum zoom level to prevent zooming out too far
          maxBounds: [
            [-130, 24], // Southwest coordinates of the bounding box
            [-66, 50], // Northeast coordinates of the bounding box
          ],
          attributionControl: false,
        });

        setMap(mapInstance);

        // Clean up map instance on component unmount
        return () => mapInstance.remove();
      };

      // Initialize map if it is not already initialized
      if (!map) {
        initializeMap();
      }
    } else {
      // Display a message to the user that WebGL is not supported
      console.log("WebGL is not supported on your browser.");
    }
  }, [map]);

  React.useEffect(() => {
    if (map && cities.length > 0) {
      const coordinates: [number, number][] = [];

      cities.forEach((city) => {
        // Use Mapbox Geocoding API to get coordinates for each city
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            city.city
          )}.json?access_token=${mapboxgl.accessToken}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.features && data.features.length > 0) {
              const [lng, lat] = data.features[0].center;
              coordinates.push([lng, lat]);

              // Create a custom marker element
              const markerElement = document.createElement("div");
              markerElement.className = "custom-marker";
              markerElement.style.width = "20px";
              markerElement.style.height = "20px";
              markerElement.style.borderRadius = "50%";
              markerElement.style.background =
                "linear-gradient(to right, #5B58EB, #BB63FF)";
              markerElement.style.boxShadow = "0px 0px 5px rgba(0, 0, 0, 0.2)";

              // Add the marker to the map
              new mapboxgl.Marker(markerElement)
                .setLngLat([lng, lat])
                .addTo(map);

              // console.log(`Marker added for ${city.city} at [${lng}, ${lat}]`);

              // Calculate the center of all markers and fly to that location
              if (coordinates.length === cities.length) {
                const avgLng =
                  coordinates.reduce((sum, coord) => sum + coord[0], 0) /
                  coordinates.length;
                const avgLat =
                  coordinates.reduce((sum, coord) => sum + coord[1], 0) /
                  coordinates.length;

                map.flyTo({ center: [avgLng, avgLat], zoom: 5 });
              }
            } else {
              console.log(`No coordinates found for ${city.city}`);
            }
          })
          .catch((error) =>
            console.error("Error fetching geocoding data:", error)
          );
      });
    }
  }, [map, cities]);

  return (
    <div className="h-full flex flex-col gap-3">
      {/* Map Container */}
      <div
        ref={mapContainer}
        className="w-full h-full"
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default MapboxChart;
