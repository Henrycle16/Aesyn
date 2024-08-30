import ChartContainer from "./ChartContainer";
import { Cell, Pie, PieChart, Tooltip, Legend, Sector } from "recharts";
import { GenderData } from "@/app/(creator)/analytics/_components/Demographic";

interface PieChartProps {
  colorList?: string[];
  data: GenderData[];
  outerRadius?: number;
}

const formatGenderData = (data: GenderData[]) => {
  let formatedData = [];
  if (data === undefined) return console.log("Data is undefined");
  for (let i = 0; i < data.length; i++) {
    let fullGender =
      data[i].dimension_values[0] === "F"
        ? "Female"
        : data[i].dimension_values[0] === "M"
          ? "Male"
          : "Other";
    let obj = {
      gender: fullGender,
      value: data[i].value,
    };
    formatedData.push(obj);
  }
  return formatedData;
};

const defaultColors = ["#3798E3", "#184465", "#9ED4FE", "#FF8042"];

// Calculate and create the percentage tool tip arcs for the pie chart
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 3) * cos;
  const sy = cy + (outerRadius + 3) * sin;
  const mx = cx + (outerRadius + 3) * cos;
  const my = cy + (outerRadius + 3) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 11;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 3}
        outerRadius={outerRadius + 5}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={5}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};

const GenderPieChart: React.FC<PieChartProps> = ({
  colorList = defaultColors,
  data,
}) => {
  return (
    <ChartContainer title="Followers By Gender ">
      <PieChart width={100} height={100}>
        <Pie
          activeShape={renderActiveShape}
          data={formatGenderData(data)}
          dataKey="value"
          nameKey="gender"
          innerRadius={50}
          outerRadius={70}
        >
          {data?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colorList[index % colorList.length]}
            />
          ))}
        </Pie>
        <Tooltip active={false} />
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
    </ChartContainer>
  );
};

export default GenderPieChart;
