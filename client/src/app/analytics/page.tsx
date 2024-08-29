"use client";
import ChartContainer from "@/components/charting/ChartContainer";
import GenderPieChart from "@/components/charting/GenderPieChart";
import ImpressionLineChart from "@/components/charting/ImpressionLineChart";
import ReachChart from "@/components/charting/ReachChart";
import { followersList } from "@/components/charting/data/mockFollowers";

export default function Analytics() {
  return (
    <main className="flex flex-col ">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl py-4">
        Anthony&apos;s Analytics Charts
      </h1>
      <div className="grid grid-cols-2 max-">
        <ReachChart />
        <ReachChart chartColor="#3EB489" />
        <ImpressionLineChart lineColor="black" />
        {/* <GenderPieChart data={followersList} /> */}
      </div>
    </main>
  );
}
