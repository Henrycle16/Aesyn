"use client";
import BaseReachChart from "@/components/charting/BaseReachChart";
import ReachChart from "@/components/charting/ReachChart";
import BaseBarchart from "@/components/charting/utils/BaseBarChart";

export default function Analytics() {
  return (
    <main className="flex flex-col ">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl py-4">
        Anthony&apos;s Analytics Charts
      </h1>
      <div className="grid grid-cols-2 max-">
        <ReachChart />
        <BaseReachChart />
      </div>
      <div>Aggregate demo</div>
    </main>
  );
}
