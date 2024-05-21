import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "../../styles/mapbox.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

type MapboxMapProps = {
  handleLocationChange: (location: string) => void;
  setIsLocationSelected: (isSelected: boolean) => void;
  isFormData: string;
};

const MapboxMap: React.FC<MapboxMapProps> = ({ handleLocationChange, setIsLocationSelected, isFormData }) => {
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
        placeholder: "Search for a city in the United States",
        types: "place",
      });
  
      geocoder.on("result", function (e) {
        const inputField = geocoderContainer.current?.querySelector(
          ".mapboxgl-ctrl-geocoder--input"
        ) as HTMLInputElement;
        if (inputField) {
          inputField.value = e.result.place_name;
  
          handleLocationChange(inputField.value);
  
          // Enable Next button
          setIsLocationSelected(true);
        }

      });
  
      geocoder.on("clear", function () {
        // If the input box is cleared, disable Next button
        setIsLocationSelected(false);
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

      if (inputField.value == isFormData && isFormData.length > 0) {
        setIsLocationSelected(true);
      }

      geocoderInitialized.current = true;
    }
    
  }, [handleLocationChange, setIsLocationSelected, isFormData, map]);
  

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