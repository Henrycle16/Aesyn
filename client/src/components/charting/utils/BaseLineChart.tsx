import React from "react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

const BaseLineChart = () => {
  return (
    <div>
      <h3 className="scroll-m-20 mb-3 text-xl font-semibold tracking-tight">
        Line Chart
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart>
          <XAxis />
          <YAxis />
          <Tooltip />
          <Line />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BaseLineChart;
