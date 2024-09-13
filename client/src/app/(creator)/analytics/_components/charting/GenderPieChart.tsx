import {
  Cell,
  Pie,
  PieChart,
  Tooltip,
  Legend,
  Sector,
  ResponsiveContainer,
} from "recharts";

// change adjust these values
const lineLength = 25;
const defaultColors = ["#645281", "#B69BE1", "#5B58EB", "#FF8042"];
// --------------------------------------------

interface PieChartProps {
  data?: GenderData;
  outerRadius?: number;
}

type GenderData = {
  female: number;
  male: number;
  other: number;
};

const formatData = (data: GenderData | undefined) => {
  if (!data) {
    return [];
  }
  return Object.entries(data).map(([gender, value]) => ({
    gender,
    value,
  }));
};

// Calculate and create the percentage tool tip arcs for the pie chart
const renderActiveShape = (props: any) => {
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
  const ex = mx + (cos >= 0 ? 1 : -1) * lineLength;
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
  // colorList = defaultColors,
  data,
}) => {
  const genderArr = formatData(data);

  return (
    <ResponsiveContainer>
      <PieChart width={100} height={100}>
        <Pie
          activeShape={renderActiveShape}
          data={formatData(data)}
          dataKey="value"
          nameKey="gender"
          innerRadius={50}
          outerRadius={70}
        >
          {genderArr?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={defaultColors[index % defaultColors.length]}
            />
          ))}
        </Pie>
        <Tooltip active={false} />
        <Legend layout="vertical" align="right" verticalAlign="middle" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GenderPieChart;
