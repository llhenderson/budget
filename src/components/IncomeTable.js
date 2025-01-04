import React from "react";

function IncomeTable() {
  const data = [
    {
      Income: "bill",
      date: "2024-12-01",
      type: "type",
    },
    {
      Income: "pizza",
      date: "2024-12-02",
      type: "food",
    },
  ];
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
