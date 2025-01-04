import BudgetSetupBar from "../components/BudgetSetupBar.js";
import Chart from "../components/Chart.js";
import ExpenseTable from "../components/ExpenseTable.js";
import IncomeTable from "../components/IncomeTable.js";
import { useState } from "react";
const Home = () => {
  const [filter, setFilter] = useState();

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  return (
    <div className="home-page">
      <div>
        <BudgetSetupBar />
      </div>

      <div style={{ justifyItems: "center", width: "100%" }}>
        <select value={filter} onChange={handleChange}>
          <option value="">Week</option>
          <option value="">Day</option>
          <option value="">Month</option>
          <option value="">Year</option>
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
