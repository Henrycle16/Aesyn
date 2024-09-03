import React from "react";

const MapChart = () => {
  return (
    <div className="border border-black rounded-lg p-6 flex flex-col items-start justify-between min-h-[35.25rem]">
      <div className="body2 ts5-text mb-4">LOCATION</div>
      <div className="w-full h-3/5 bg-gray-100 flex items-center justify-center mb-4">
        Map Placeholder
      </div>
      {/* Line for splitting section */}
      <div className="w-full flex items-center justify-center mb-4">
        <div className="w-full border-t border-[#D7D7D7]"></div>
      </div>
      {/* Bottom section */}
      <div className="w-full h-1/3 flex gap-20">
        <div className="w-1/2 flex flex-col items-start justify-center pr-2">
          <div className="body2 ts7-text mb-4">Top Cities:</div>
          <div className="w-full h-full grid grid-rows-3 gap-2 ts7-text body3">
            <div className="flex justify-between">
              <span>Houston, TX</span>
              <span>25%</span>
            </div>
            <div className="flex justify-between">
              <span>Austin, TX</span>
              <span>20%</span>
            </div>
            <div className="flex justify-between">
              <span>Dallas, TX</span>
              <span>15%</span>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-start justify-center pl-2">
          <div className="body2 g5-text mb-2">Search Area</div>
          <div className="w-full h-full flex items-start justify-center">
          <input
            type="text"
            placeholder="City, State, or Zip Code"
            className="input-md w-full input-focus-primary"
            id="locationSearch"
            maxLength={25}
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapChart;
