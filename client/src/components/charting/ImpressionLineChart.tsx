import React from "react";
import ChartContainer from "./ChartContainer";
import { LineChart, XAxis, YAxis, Tooltip, Line } from "recharts";
import { DailyData, socialMediaReach } from "./data/mockReach";

interface ImpressionLineChartProps {
  data?: DailyData[];
  lineColor?: string;
}

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
  lineColor = "#3798E3",
}) => {
  return (
    <ChartContainer title="Impression Line Chart">
      <LineChart data={socialMediaReach}>
        <XAxis
          dataKey="day"
          tickFormatter={formatXAxis}
          padding={{ left: 10, right: 10 }}
        />
        <YAxis domain={["dataMin-1000", "dataMax"]} scale="linear" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="totalReach"
          stroke={lineColor}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};

export default ImpressionLineChart;
