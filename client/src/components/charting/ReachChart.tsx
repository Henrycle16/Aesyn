import React from "react";
import { DailyData, socialMediaReach } from "./data/mockReach";
import ChartContainer from "./ChartContainer";
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

interface WeeklyData {
  week: string;
  reach: number;
}

interface ReachChartProps {
  chartColor?: string;
}

// Sum up reach by week
const aggregateByWeek = (data: DailyData[]): WeeklyData[] => {
  const weeklyData: WeeklyData[] = [];
  let currentWeek = 1;
  let currentSum = 0;

  data.forEach((item: DailyData, index: number) => {
    currentSum += item.totalReach;

    if ((index + 1) % 7 === 0 || index === data.length - 1) {
      weeklyData.push({ week: `Week ${currentWeek}`, reach: currentSum });
      currentWeek += 1;
      currentSum = 0;
    }
  });
  return weeklyData;
};

const weeklyData: WeeklyData[] = aggregateByWeek(socialMediaReach);

const ReachChart: React.FC<ReachChartProps> = ({ chartColor = "#3798E3" }) => {
  return (
    <ChartContainer title="Weekly Reach">
      <BarChart data={weeklyData}>
        <XAxis dataKey="week" />
        <YAxis domain={["dataMin - 1000", "dataMax"]} scale="linear" />
        <Tooltip />
        <Bar dataKey="reach" fill={chartColor} barSize={40} />
      </BarChart>
    </ChartContainer>
  );
};

export default ReachChart;
