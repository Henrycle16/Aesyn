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

    if ((index + 1) % 7 === 0 || index === data.length - 1) {
      weeklyData.push({ week: `Week ${currentWeek}`, reach: currentSum });
      currentWeek += 1;
      currentSum = 0;
    }
  });
  return weeklyData;
};

const ReachBarChart: React.FC<ReachBarChartProps> = ({ data }) => {
  const weeklyData: WeeklyData[] = aggregateByWeek(data);
  console.log("Reach Bar Chart", weeklyData);
  return (
    <ResponsiveContainer>
      <BarChart data={weeklyData}>
        <XAxis dataKey="week" />
        <YAxis domain={["dataMin", "dataMax"]} scale="linear" />
        <Tooltip />
        <Bar dataKey="reach" fill="8884d8" barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReachBarChart;
