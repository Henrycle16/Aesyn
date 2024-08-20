import React, { useEffect } from "react";
import BaseBarchart from "./utils/BaseBarChart";
import socialMediaReach from "./data/mockReach";

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

const BaseReachChart = () => {
  let data = aggregateWeekly(socialMediaReach);

  return (
    <BaseBarchart
      title="Reach build with base"
      data={data}
      XaxisDataKey="lol"
      BarDataKey="totalReach"
    />
  );
};

export default BaseReachChart;
