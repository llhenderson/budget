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

const Chart = ({ filter }) => {
  const [data, setData] = useState([]); // Initialize with an empty array
  const [isLoading, setIsLoading] = useState(false); // Track loading state
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/chart");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const res = await response.json();
        setData(res.data.rows);
        console.log(res.data.rows);
      } catch (error) {
        console.error("There was a problem with fetch.", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetch completes (success or failure)
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {filter}

      {isLoading ? ( // Conditional rendering based on loading state
        <p>Loading...</p>
      ) : (
        <LineChart
          width={1230}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 1000]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      )}
    </div>
  );
};

export default Chart;
