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

const CustomAgeToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const color = "#5B58EB";

    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        <p>Ages: {payload[0].payload.ageGroup}</p>
        <p style={{ color }}>Followers: {value}</p>
      </div>
    );
  }

  return null;
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
        <Tooltip content={CustomAgeToolTip} />
        <Bar dataKey="value" fill="url(#colorUv)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export { AgeHistogram };
