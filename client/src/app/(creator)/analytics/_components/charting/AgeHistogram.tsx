import React from "react";
import { Bar, Tooltip, XAxis, YAxis } from "recharts";
import { BarChart, ResponsiveContainer } from "recharts";

interface AgeHistogramProps {
  data: AgeData[];
}

type AgeData = {
  ageGroup: String;
  value: Number;
};

const AgeHistogram: React.FC<AgeHistogramProps> = ({ data }) => {
  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        barSize={200}
        margin={{
          top: 5,
          right: 30,
          left: 5,
          bottom: -5,
        }}
      >
        <XAxis dataKey="ageGroup" padding={{ left: 10, right: 10 }} />
        <YAxis scale="linear" />
        <Tooltip />
        <Bar dataKey="value" fill="#B69BE1" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export { AgeHistogram };
