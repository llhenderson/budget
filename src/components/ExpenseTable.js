import React, { useState, useEffect } from "react";
import Button from "../components/shared/Button";
function ExpenseTable({ filter }) {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState({});
  const [editDescription, setEditDecription] = useState();
  const [editAmount, setEditAmount] = useState();
  const [editType, setEditType] = useState();
  const [editDate, setEditDate] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/expenseTable?${new URLSearchParams(
            filter
          ).toString()}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const data = await response.json();
        setData(data.data.rows); // Assuming 'data.rows' contains the expense data
      } catch (error) {
        console.error("There was a problem with fetch.", error);
      } finally {
        // Consider setting a loading state to 'false' here to indicate data is fetched
      }
    };

    fetchData();
  }, [filter]);

  const handleEdit = async () => {
    const formData = {
      description: editDescription || edit.item.description,
      amount: editAmount || edit.item.amount,
      type: editType || edit.item.type,
      date: editDate || edit.item.date,
      id: edit.item.id,
    };
    try {
      const response = await fetch(
        `http://localhost:3001/api/update/expenses`,
        {
          // Your Express route
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("expenses updated successfully");
        // Optionally reset the form or update the UI
      } else {
        console.error("Failed to update expenses");
        // Handle error, e.g., display an error message
      }
      setEdit(false);
    } catch (error) {
      console.error("Error:", error);
      // Handle error, e.g., display an error message
    }
  };
  const handleDateChange = (event) => {
    const date = new Date(event.target.value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is 0-indexed
    const day = date.getDate();
    setEditDate(
      `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`
    );
  };
  return (
    <div>
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
              <button
                onClick={() => {
                  setEdit({ edit: true, item: item });
                }}
              >
                edit
              </button>
            </tr>
          ))}
        </tbody>
      </table>
      {edit.edit ? (
        <div className="edit-popup">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <input
                id="edit_description"
                placeholder="description"
                value={editDescription}
                className="edit-input"
                onChange={(e) => setEditDecription(e.target.value)}
              />
              <input
                id="edit_amount"
                placeholder="amount"
                value={editAmount}
                className="edit-input"
                onChange={(e) => setEditAmount(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ width: "100%" }}>
                <select
                  style={{ width: "100%" }}
                  value={editType}
                  onChange={(event) => setEditType(event.target.value)}
                >
                  <option value="essential">essential</option>
                  <option value="non-essential">non-essential</option>
                </select>
              </div>
              <div style={{ width: "100%" }}>
                <input
                  style={{ width: "97%" }}
                  type="date"
                  value={editDate}
                  className="edit-input"
                  onChange={handleDateChange}
                />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => setEdit(false)}>Close</button>
            <button onClick={handleEdit}>Submit</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ExpenseTable;
