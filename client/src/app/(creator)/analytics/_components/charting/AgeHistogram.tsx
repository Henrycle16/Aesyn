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
        <defs>
          <linearGradient
            id="colorUv"
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#5B58EB" />
            <stop offset="1" stopColor="#BB63FF" />
          </linearGradient>
        </defs>
        <XAxis dataKey="ageGroup" padding={{ left: 10, right: 10 }} />
        <YAxis scale="linear" />
        <Tooltip />
        <Bar dataKey="value" fill="url(#colorUv)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export { AgeHistogram };
