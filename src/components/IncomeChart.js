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

const IncomeChart = ({ filter, isLoading }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/incomeChart?${new URLSearchParams(
            filter
          ).toString()}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();
        console.log(data.data.rows);
        setData(data.data.rows); // Assuming 'data.rows' contains the expense data
      } catch (error) {
        console.error("There was a problem with fetch.", error);
      }
    };

    fetchData();
  }, [filter]);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: "white" }}>
          <p className="label">{`Date: ${new Date(
            label
          ).toLocaleDateString()}`}</p>
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
            width={1200}
            height={300}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 3000]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              data={data}
              dataKey="amount"
              stroke="#8884d8"
              name="income"
            />
          </LineChart>
        </div>
      )}
    </div>
  );
};

export default IncomeChart;
