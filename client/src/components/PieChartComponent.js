import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = [
  "#E80F88",
  "#F49D1A",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF5733",
];

const PieChartComponent = ({ data }) => {
  return (
    <div
      className="container mt-5 mb-5 p-4"
      style={{
        backgroundColor: "#41295a",
        borderRadius: "10px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h2
        className="text-center mb-4"
        style={{ color: "#7DE5ED", borderBottom: "2px solid black" }}
      >
        Leave System
      </h2>
      <div className="d-flex justify-content-center">
        <PieChart width={400} height={250}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            formatter={(value, entry) => `${value} (${entry.payload.value}%)`}
          />
        </PieChart>
      </div>
    </div>
  );
};

export default PieChartComponent;
