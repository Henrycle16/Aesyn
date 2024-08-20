import React from "react";
import {
  Tooltip,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

type BarChartProps = {
  title: string;
  data: any;
  XaxisDataKey: string;
  BarDataKey: string;
  BarColor?: string;
};

const BaseBarchart = ({
  title,
  data,
  XaxisDataKey,
  BarDataKey,
  BarColor = "#f59e0b",
}: BarChartProps) => {
  return (
    <div>
      <h3 className="scroll-m-20 mb-3 text-xl font-semibold tracking-tight">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={BarDataKey} fill={BarColor} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BaseBarchart;
