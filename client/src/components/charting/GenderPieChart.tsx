import React from "react";
import ChartContainer from "./ChartContainer";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { UserData } from "./data/mockFollowers";

interface PieChartProps {
  colorList?: string[];
  data?: UserData[];
  outerRadius?: number;
}

interface GroupedData {
  groupName: string;
  followers: number;
}

const aggregateGender = (dataArr: UserData[] | undefined) => {
  let accumlator = dataArr.reduce(
    (acc, currUser) => {
      if (currUser.gender === "male") {
        acc.male++;
      } else if (currUser.gender === "female") {
        acc.female++;
      } else {
        acc.other++;
      }
      return acc;
    },
    { male: 0, female: 0, other: 0 },
  );
  return [
    { name: "male", followers: accumlator.male },
    { name: "female", followers: accumlator.female },
    { name: "other", followers: accumlator.other },
  ];
};

const defaultColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// ------------------------------------------------------------------------------------
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
// ------------------------------------------------------------------------------------

const GenderPieChart: React.FC<PieChartProps> = ({
  colorList = defaultColors,
  data,
}) => {
  return (
    <ChartContainer title="Followers By Gender ">
      <PieChart width={150} height={150}>
        <Pie
          data={aggregateGender(data)}
          dataKey="followers"
          outerRadius={150}
          fill="green"
          // ----------------
          label={renderCustomizedLabel}
          labelLine={false}
          //--------------------
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colorList[index % colorList.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ChartContainer>
  );
};

export default GenderPieChart;
