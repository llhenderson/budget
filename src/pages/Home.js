import BudgetSetupBar from "../components/BudgetSetupBar.js";
import Chart from "../components/Chart.js";
import ExpenseTable from "../components/ExpenseTable.js";
import IncomeTable from "../components/IncomeTable.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  endDateFormating,
  startDateFormating,
} from "../utils/dateFormating.js";
const Home = () => {
  const [timeRange, setTimeRange] = useState("month");
  const startDate = endDateFormating();
  const endDate = startDateFormating(timeRange);
  const navigate = useNavigate();

  const filter = { startDate: startDate, endDate: endDate };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  });
  const handleChange = (event) => {
    setTimeRange(event.target.value);
  };
  return (
    <div className="home-page">
      <div>
        <BudgetSetupBar />
      </div>

      <div style={{ justifyItems: "center", width: "100%" }}>
        <select value={timeRange} onChange={handleChange}>
          <option value="week">Week</option>
          <option value="day">Day</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
        <Chart filter={filter} />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <ExpenseTable />
          </div>
          <div>
            <IncomeTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
