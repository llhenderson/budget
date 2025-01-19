import React, { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Chart = ({ dataOne, dataTwo, isLoading }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const date = new Date(label);

      // 1. Adjust for Timezone (if needed)
      const userTimezoneOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
      const adjustedDate = new Date(date.getTime() + userTimezoneOffset);

      return (
        <div style={{ backgroundColor: "white" }}>
          <p className="label">{`Date: ${adjustedDate.toLocaleDateString()}`}</p>
          <p className="intro">Amount: {payload[0].value}</p>
          <p className="desc">Description: {payload[0].payload.description}</p>
        </div>
      );
    }

    return null;
  };
  return (
    <div>
      {isLoading ? ( // Conditional rendering based on loading state
        <p>Loading...</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <LineChart
            width={600}
            height={250}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 1000]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              data={dataOne}
              dataKey="amount"
              stroke="#8884d8"
              name="essential"
            />
          </LineChart>
          <LineChart
            width={600}
            height={250}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 1000]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              data={dataTwo}
              dataKey="amount"
              stroke="#82ca9d"
              name="non-essential"
            />
          </LineChart>
        </div>
      )}
    </div>
  );
};

export default Chart;
