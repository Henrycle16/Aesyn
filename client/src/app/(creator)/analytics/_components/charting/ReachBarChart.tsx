import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

interface ReachBarChartProps {
  data?: DailyMetric[];
}

type DailyMetric = {
  date: Date;
  impression: Number;
  reach: Number;
};

type WeeklyData = {
  week: String;
  reach: Number;
};

// Sum up reach by week
const aggregateByWeek = (data: DailyMetric[]): WeeklyData[] => {
  const weeklyData: WeeklyData[] = [];
  let currentWeek = 1;
  let currentSum = 0;

  data.forEach((item: DailyMetric, index: number) => {
    currentSum += item.reach;

    if ((index + 1) % 7 === 0 && currentWeek !== 5) {
      weeklyData.push({ week: `Week ${currentWeek}`, reach: currentSum });
      currentWeek += 1;
      currentSum = 0;
    } else if (index === data.length - 1) {
      weeklyData[3].reach = currentSum + weeklyData[3].reach;
    }
  });
  return weeklyData;
};

const CustomReachToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const color = "#5B58EB"; // Customize the color for value

    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        <p>{payload[0].payload.week}</p>
        <p style={{ color }}>Reach: {value}</p>
      </div>
    );
  }

  return null;
};

const ReachBarChart: React.FC<ReachBarChartProps> = ({ data }) => {
  const weeklyData: WeeklyData[] = aggregateByWeek(data);
  return (
    <ResponsiveContainer>
      <BarChart data={weeklyData}>
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
        <XAxis dataKey="week" />
        <YAxis domain={[0, "dataMax"]} scale="linear" />
        <Tooltip content={<CustomReachToolTip />} />
        <Bar dataKey="reach" fill="url(#colorUv)" barSize={60} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReachBarChart;
