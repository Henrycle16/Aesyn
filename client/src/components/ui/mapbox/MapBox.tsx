import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "../../../styles/mapbox.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

type MapboxMapProps = {
  handleLocationChange: (location: string) => void;
  setIsLocationSelected: (isSelected: boolean) => void;
  isLocationSelected: boolean;
  isFormData: string;
  lng: number;
  lat: number;
  zoom: number;
  setLng: (lng: number) => void;
  setLat: (lat: number) => void;
  setZoom: (zoom: number) => void;
  markerLocation: [number, number] | null;
  setMarkerLocation: (location: [number, number] | null) => void;
};

const MapboxMap: React.FC<MapboxMapProps> = ({
  handleLocationChange,
  setIsLocationSelected,
  isFormData,
  isLocationSelected,
  lng,
  lat,
  zoom,
  setLng,
  setLat,
  setZoom,
  markerLocation,
  setMarkerLocation,
}) => {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const geocoderContainer = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<mapboxgl.Map>();
  const geocoderInitialized = React.useRef(false);
  const markerRef = React.useRef<mapboxgl.Marker | null>(null);

  // Set the Mapbox access token
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

  React.useEffect(() => {
    // Function to initialize the map
    const initializeMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/henrycle16/clufzf01c016b01qfe9u27o4a",
        center: [lng, lat],
        zoom: zoom,
        interactive: false,
      });

      mapInstance.on("moveend", () => {
        const newCenter = mapInstance.getCenter();
        setLng(newCenter.lng);
        setLat(newCenter.lat);
        setZoom(mapInstance.getZoom());
      });

      setMap(mapInstance);

      // Restore marker if it exists
      if (markerLocation) {
        const newMarker = new mapboxgl.Marker({ color: '#3DA9FC'})
          .setLngLat(markerLocation)
          .addTo(mapInstance);
        markerRef.current = newMarker;
        mapInstance.flyTo({ center: markerLocation, zoom: 12 });
      }

      // Clean up map instance on component unmount
      return () => mapInstance.remove();
    };

    // Initialize map if it is not already initialized
    if (!map) {
      initializeMap();
    } else if (markerLocation) {
      // If the map is already initialized and we have a marker location
      map.flyTo({ center: markerLocation, zoom: 12 });
      if (markerRef.current) {
        markerRef.current.remove();
      }
      const newMarker = new mapboxgl.Marker({ color: '#3DA9FC'})
        .setLngLat(markerLocation)
        .addTo(map);
      markerRef.current = newMarker;
    }

    // Initialize geocoder if it is not already initialized
    if (map && geocoderContainer.current && !geocoderInitialized.current) {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: "Search for a city in the United States",
        types: "place",
        countries: "us",
      });

      // Handle geocoder result event
      geocoder.on("result", (e) => {
        const inputField = geocoderContainer.current?.querySelector(
          ".mapboxgl-ctrl-geocoder--input"
        ) as HTMLInputElement;
        if (inputField) {
          inputField.value = e.result.place_name;

          handleLocationChange(inputField.value);

          // Enable Next button
          setIsLocationSelected(true);
          inputField.disabled = true;
        }

        const [newLng, newLat] = e.result.center;
        setLng(newLng);
        setLat(newLat);
        setZoom(12);
        setMarkerLocation([newLng, newLat]);

        if (markerRef.current) {
          markerRef.current.remove();
        }

        const newMarker = new mapboxgl.Marker({ color: '#3DA9FC'})
          .setLngLat([newLng, newLat])
          .addTo(map);

        markerRef.current = newMarker;
        map.flyTo({ center: [newLng, newLat], zoom: 12 });
      });

      // Handle geocoder clear event
      geocoder.on("clear", () => {
        // If the input box is cleared, disable Next button
        setIsLocationSelected(false);
        handleLocationChange("");
        const inputField = geocoderContainer.current?.querySelector(
          ".mapboxgl-ctrl-geocoder--input"
        ) as HTMLInputElement;
        if (inputField) {
          inputField.disabled = false;
        }
        if (markerRef.current) {
          markerRef.current.remove();
          markerRef.current = null;
        }
        setMarkerLocation(null);
        map.flyTo({ center: [-98.5795, 39.8283], zoom: 3.5 });
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
        inputField.addEventListener("input", () => {
          // If the input value is manually changed, disable Next button
          setIsLocationSelected(false);
        });
      }

      if (inputField.value === isFormData && isFormData.length > 0) {
        setIsLocationSelected(true);
      }

      geocoderInitialized.current = true;
    }
  }, [
    handleLocationChange,
    setIsLocationSelected,
    isLocationSelected,
    isFormData,
    lng,
    lat,
    zoom,
    map,
    markerLocation,
    setLng,
    setLat,
    setZoom,
    setMarkerLocation,
  ]);

  return (
    <div className="h-full flex flex-col gap-3">
      {/* Geocoder Container */}
      <div>
        <div ref={geocoderContainer} className="input input-bordered" />
      </div>

      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default MapboxMap;
