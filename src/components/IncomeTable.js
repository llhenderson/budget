import React, { useState, useEffect } from "react";

function IncomeTable({ filter }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/incomeTable?${new URLSearchParams(
            filter
          ).toString()}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();
        setData(data.data.rows); // Assuming 'data.rows' contains the expense data
        console.log(data.result.rows); // Log the result.rows for debugging or analysis
      } catch (error) {
        console.error("There was a problem with fetch.", error);
      } finally {
        // Consider setting a loading state to 'false' here to indicate data is fetched
      }
    };

    fetchData();
  }, [filter]);
  return (
    <table style={{ borderCollapse: "collapse" }}>
      {" "}
      {/* Add borderCollapse */}
      <thead>
        <tr>
          {data.length > 0 &&
            Object.keys(data[0]).map((key) => (
              <th
                key={key}
                style={{ border: "1px solid black", padding: "8px" }}
              >
                {key}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {Object.values(item).map((value, index) => (
              <td
                key={index}
                style={{ border: "1px solid black", padding: "8px" }}
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default IncomeTable;
