import React from "react";

function ExpenseTable() {
  const data = [
    {
      name: "Alice",
      age: 30,
      city: "New York",
      country: "USA",
      occupation: "Software Engineer",
    },
    {
      name: "Bob",
      age: 25,
      city: "Los Angeles",
      country: "USA",
      occupation: "Data Scientist",
    },
    {
      name: "Charlie",
      age: 35,
      city: "Chicago",
      country: "USA",
      occupation: "Project Manager",
    },
    {
      name: "David",
      age: 42,
      city: "London",
      country: "UK",
      occupation: "Financial Analyst",
    },
    {
      name: "Emily",
      age: 28,
      city: "Tokyo",
      country: "Japan",
      occupation: "UX Designer",
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

export default ExpenseTable;
