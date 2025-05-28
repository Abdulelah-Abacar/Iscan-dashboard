"use client";

import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
}

interface BarChartProps {
  data: ChartData[];
  className?: string;
}

// Custom bar shape with gradient
const CustomBar = (props: any) => {
  const { x, y, width, height } = props;
  const cornerRadius = 10; // Radius for the rounded corners

  return (
    <g>
      {/* Light green section (top third) */}
      <path
        d={`
          M ${x},${y + cornerRadius}
          Q ${x},${y} ${x + cornerRadius},${y}
          H ${x + width - cornerRadius}
          Q ${x + width},${y} ${x + width},${y + cornerRadius}
          V ${y + height / 3}
          H ${x}
          Z
        `}
        fill="#56a85d"
      />

      {/* Medium green section (middle third) */}
      <rect
        x={x}
        y={y + height / 3}
        width={width}
        height={height / 3}
        fill="#81C784"
      />

      {/* Dark green section (bottom third) */}
      <rect
        x={x}
        y={y + (2 * height) / 3}
        width={width}
        height={height / 3}
        fill="#2E7D32"
      />
    </g>
  );
};

// This component gets dynamically imported
export function BarChart({ data, className = "h-[130px]" }: BarChartProps) {
  return (
    <div className={`w-full border-b-4 border-black ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} barGap={2}>
          <XAxis dataKey="name" hide />
          <Bar dataKey="value" shape={CustomBar} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
