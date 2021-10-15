import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const Chart = () => {
  const data = [
    { name: "FE Comps", Strength: 4, amt:100 },
    { name: "SE Comps", Strength: 5, amt: 100 },
    { name: "TE Comps", Strength: 3, amt: 100 },
    { name: "BE Comps", Strength: 1, amt: 100 },
  ];
  return (
    <>
      <BarChart width={700} height={550} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip wrapperStyle={{ width: 120, backgroundColor: "#ccc" }} />
        <Legend
          width={120}
          wrapperStyle={{
            top: 5,
            right: 5,
            backgroundColor: "#f5f5f5",
            border: "1px solid #d5d5d5",
            borderRadius: 3,
            lineHeight: "40px",
          }}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="Strength" fill="#005555" />
      </BarChart>
    </>
  );
};

export default Chart;
