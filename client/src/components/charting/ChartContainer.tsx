import React, { ReactElement } from "react";
import { ResponsiveContainer } from "recharts";

interface ChartContainerProps {
  title: string;
  children: ReactElement;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ title, children }) => {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={180}>
        {children}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartContainer;
