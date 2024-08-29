
import ChartContainer from "./ChartContainer";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { UserData } from "./data/mockFollowers";
import { GenderData } from "@/app/(creator)/analytics/_components/Demographic";

interface PieChartProps {
  colorList?: string[];
  data: GenderData[];
  outerRadius?: number;
}

const formatGenderData = (data: GenderData[]) => {
  let formatedData = [];
  if (data === undefined) return console.log("Data is undefined")
  for (let i = 0; i < data.length; i++) {
    let obj = {
      gender: data[i].dimension_values[0],
      value: data[i].value
    }
    formatedData.push(obj)
  }
  return formatedData
}

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
      <PieChart width={90} height={90}>
        <Pie
          data={formatGenderData(data)}
          dataKey="value"
          nameKey="gender"
          outerRadius={90}
          fill="green"
          // ----------------
          label={renderCustomizedLabel}
          labelLine={false}
          //--------------------
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colorList[index % colorList.length]} />
          ))}

        </Pie>
        <Tooltip />
      </PieChart>
    </ChartContainer>
  );
};

export default GenderPieChart;
