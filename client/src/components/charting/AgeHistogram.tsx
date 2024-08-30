import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import ChartContainer from "./ChartContainer";
import { AgeData } from "@/app/(creator)/analytics/_components/Demographic";

interface AgeHistogramProps {
  data: AgeData[];
}

const formatAgeData = (data: AgeData[]) => {
  let formatedData = [];
  if (data === undefined) return console.log("Data is undefined");
  for (let i = 0; i < data.length; i++) {
    let obj = {
      Age: data[i].dimension_values[0],
      Followers: data[i].value,
    };
    formatedData.push(obj);
  }
  return formatedData;
};

const AgeHistogram: React.FC<AgeHistogramProps> = ({ data }) => {
  return (
    <ChartContainer title="Age Histogram">
      <BarChart
        data={formatAgeData(data)}
        barSize={200}
        margin={{
          top: 5,
          right: 30,
          left: 5,
          bottom: -5,
        }}
      >
        <XAxis dataKey="Age" padding={{ left: 10, right: 10 }} />
        <YAxis scale="linear" />
        <Tooltip />
        <Bar dataKey="Followers" fill="#3789E3" />
      </BarChart>
    </ChartContainer>
  );
};

export default AgeHistogram;
