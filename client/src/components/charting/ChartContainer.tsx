import React, { ReactElement } from "react";
import { ResponsiveContainer } from "recharts";

interface ChartContainerProps {
  title: string;
  children: ReactElement;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ title, children }) => {
  return (
    <div>
      <h3 className="scroll-m-20 mb-3 text-xl font-semibold tracking-tight">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        {children}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartContainer;
