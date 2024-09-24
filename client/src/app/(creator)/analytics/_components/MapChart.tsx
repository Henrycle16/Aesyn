import React from "react";
import MapboxChart from "./charting/MapboxChart";

interface MapChartProps {
  data: FollowerCity[];
}

type FollowerCity = {
  city: string;
  value: number;
};

const MapChart: React.FC<MapChartProps> = ({ data }) => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-3/5 flex items-center justify-center mb-4">
        <div className="w-full h-full">
          <MapboxChart cities={data} />
        </div>
      </div>
      {/* Line for splitting section */}
      <div className="w-full flex items-center justify-center mb-4">
        <div className="w-full border-t border-[#D7D7D7]"></div>
      </div>
      {/* Bottom section */}
      <div className="w-full h-1/3 flex flex-row gap-20">
        <div className="w-full">
          <div className="body2 ts7-text mb-4">Top Cities:</div>
          <div className="grid grid-cols-2 gap-10">
            {data.map((cityData, index) => (
              <div
                key={index}
                className="flex justify-between w-full ts7-text body3">
                <span>{cityData.city}</span>
                <span>{cityData.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapChart;
