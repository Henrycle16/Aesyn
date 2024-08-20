"use client";
import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import socialMediaReach from "./data/mockReach";

const aggregateMonth = () => {
  let monthlyReach = {};
  return monthlyReach;
};

function aggregateWeekly(
  data: { day: string; totalReach: number }[],
): WeeklyReach[] {
  let weaklyData: WeeklyReach[] = [];

  let currentWeekStart = "";
  let currentWeekSum = 0;
  let currentWeekIndex = 0;

  data.forEach(({ day, totalReach }, index) => {
    const date = new Date(day);
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0 || index === 0) {
      if (index != 0) {
        weaklyData.push({
          week: currentWeekStart + " to " + data[index - 1].day,
          totalReach: currentWeekSum,
        });
      }

      currentWeekStart = day;
      currentWeekSum = 0;
      currentWeekIndex = index;
    }

    currentWeekSum += totalReach;
  });

  if (currentWeekIndex < data.length) {
    weaklyData.push({
      week: currentWeekStart + " to " + data[data.length - 1].day,
      totalReach: currentWeekSum,
    });
  }

  return weaklyData;
}

// const aggregateReach = (data, numBins) => {};

const ReachChart = () => {
  let data = aggregateWeekly(socialMediaReach);

  return (
    <div>
      <h3 className="scroll-m-20 mb-3 text-xl font-semibold tracking-tight">
        No legend
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        {/* <BarChart data={data} width={500} height={300}> */}
        <BarChart data={data}>
          <XAxis />
          <Tooltip />
          <YAxis dataKey="totalReach" />
          <Bar dataKey="totalReach" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReachChart;
