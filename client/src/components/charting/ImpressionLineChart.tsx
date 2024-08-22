import React from "react";
import ChartContainer from "./ChartContainer";
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";
import { DailyData, socialMediaReach } from "./data/mockReach";

interface ImpressionLineChartProps {
  data?: DailyData[];
  lineColor?: string;
}

// remove later -------------------------------------
//
// -------------------------------------

// Format the date
const formatXAxis = (tickItem: string) => {
  const date = new Date(tickItem);
  return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;
};

const ImpressionLineChart: React.FC<ImpressionLineChartProps> = ({
  data,
  lineColor,
}) => {
  return (
    <ChartContainer title="Impression Line Chart">
      <LineChart data={socialMediaReach}>
        <XAxis dataKey="day" tickFormatter={formatXAxis} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalReach" stroke={lineColor} />
      </LineChart>
    </ChartContainer>
  );
};

export default ImpressionLineChart;
