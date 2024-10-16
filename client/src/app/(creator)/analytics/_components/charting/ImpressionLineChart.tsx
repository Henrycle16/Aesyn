import React from "react";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ResponsiveContainer } from "recharts";

interface ImpressionLineChartProps {
  data?: DailyMetric[];
}

type DailyMetric = {
  date: Date;
  impression: Number;
  reach: Number;
};

const formatXAxis = (tickItem: string) => {
  const date = new Date(tickItem);
  return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;
};

const ImpresionLineChart: React.FC<ImpressionLineChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer>
      <LineChart data={data}>
        <XAxis
          dataKey="date"
          tickFormatter={formatXAxis}
          padding={{ left: 10, right: 10 }}
        />
        <YAxis domain={["dataMin", "dataMax"]} scale="linear" />
        <Tooltip
          labelFormatter={(label) => {
            const date = new Date(label);
            return date.toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
          }}
        />
        <Line
          type="monotone"
          dataKey="impression"
          stroke="#5B58EB"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ImpresionLineChart;
