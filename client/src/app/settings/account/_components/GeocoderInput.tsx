import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "@/styles/mapbox.css";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

type GeocoderInputProps = {
  handleLocationChange: (location: string) => void;
  initialLocation: string;
  disableInput: boolean;
  className?: string;
};

const GeocoderInput: React.FC<GeocoderInputProps> = ({
  handleLocationChange,
  initialLocation,
  disableInput,
  className,
}) => {
  const geocoderContainer = React.useRef<HTMLDivElement>(null);
  const geocoderInitialized = React.useRef(false);

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

  React.useEffect(() => {
    if (
      mapboxgl.supported() &&
      geocoderContainer.current &&
      !geocoderInitialized.current
    ) {
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        placeholder: "Search for a city in the United States",
        types: "place",
        countries: "us",
      });

      geocoder.on("result", (e) => {
        const inputField = geocoderContainer.current?.querySelector(
          ".mapboxgl-ctrl-geocoder--input"
        ) as HTMLInputElement;
        if (inputField) {
          inputField.value = e.result.place_name;
          handleLocationChange(e.result.place_name);
        }
      });

      geocoder.on("clear", () => {
        handleLocationChange("");
      });

      geocoder.addTo(geocoderContainer.current);

      const inputField = geocoderContainer.current.querySelector(
        ".mapboxgl-ctrl-geocoder--input"
      ) as HTMLInputElement;

      if (initialLocation.length > 0) {
        inputField.value = initialLocation;
      }

      inputField.disabled = disableInput;

      // Apply custom class to the input element
      if (className) {
        inputField.classList.add(...className.split(" "));
      }

      geocoderInitialized.current = true;
    }
  }, [handleLocationChange, initialLocation, disableInput, className]);

  // Ensure the input field is updated when initialLocation changes
  React.useEffect(() => {
    const inputField = geocoderContainer.current?.querySelector(
      ".mapboxgl-ctrl-geocoder--input"
    ) as HTMLInputElement;
    if (inputField) {
      inputField.value = initialLocation;
      inputField.disabled = disableInput;

      // Apply custom class to the input element
      if (className) {
        inputField.classList.add(...className.split(" "));
      }
    }
  }, [initialLocation, disableInput, className]);

  return <div ref={geocoderContainer} />;
};

export default GeocoderInput;
