import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const SavingsChart = ({ filter, isLoading }) => {
  const [savingsData, setSavingsData] = useState([]);
  let initial_amount = 0;
  let output = [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/savings?${new URLSearchParams(
            filter
          ).toString()}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();
        data.data.rows.forEach((event) => {
          output.push({
            amount: (initial_amount += Number(event.amount)),
            date: event.date,
            description: event.description,
          });
        });
        setSavingsData(output);
      } catch (error) {
        console.error("There was a problem with fetch.", error);
      }
    };

    fetchData();
  }, [filter]);
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
              data={savingsData}
              dataKey="amount"
              stroke="#8884d8"
              name="savings"
            />
          </LineChart>
        </div>
      )}
    </div>
  );
};

export default SavingsChart;
