"use client";
import ChartContainer from "@/components/charting/ChartContainer";
import ReachChart from "@/components/charting/ReachChart";

export default function Analytics() {
  return (
    <main className="flex flex-col ">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl py-4">
        Anthony&apos;s Analytics Charts
      </h1>
      <div className="grid grid-cols-2 max-">
        <ReachChart />
      </div>
    </main>
  );
}
