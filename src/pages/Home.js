import BudgetSetupBar from "../components/BudgetSetupBar.js";
import Chart from "../components/Chart.js";
import SavingsChart from "../components/SavingsChart.js";
import ExpenseTable from "../components/ExpenseTable.js";
import IncomeTable from "../components/IncomeTable.js";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  endDateFormating,
  startDateFormating,
} from "../utils/dateFormating.js";
import IncomeChart from "../components/IncomeChart.js";
const Home = () => {
  const [dataOne, setDataOne] = useState([]);
  const [dataTwo, setDataTwo] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [timeRange, setTimeRange] = useState("month");
  const [chartType, setChartType] = useState("savings");
  const startDate = endDateFormating();
  const endDate = startDateFormating(timeRange);
  const navigate = useNavigate();

  const filter = useMemo(() => ({ startDate, endDate }), [startDate, endDate]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/chart?${new URLSearchParams(
            filter
          ).toString()}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        const res = await response.json();
        console.log(res);
        setDataOne(res.dataOne.rows);
        setDataTwo(res.dataTwo.rows);
      } catch (error) {
        console.error("There was a problem with fetch.", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetch completes (success or failure)
      }
    };

    fetchData();
  }, [filter]);
  const handleChartChange = (event) => {
    setChartType(event.target.value);
  };
  const handleChange = (event) => {
    setTimeRange(event.target.value);
  };
  return (
    <div className="home-page">
      <div>
        <BudgetSetupBar />
      </div>

      <div style={{ justifyItems: "center", width: "100%" }}>
        <div style={{ textAlign: "center" }}>
          <h1>BUDGET TRACKER</h1>
        </div>
        <div style={{ paddingBottom: "10px" }}>
          <select value={chartType} onChange={handleChartChange}>
            <option value="savings">savings</option>
            <option value="expenses">expenses</option>
            <option value="income">income</option>
          </select>
          <select value={timeRange} onChange={handleChange}>
            <option value="week">Week</option>
            <option value="day">Day</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
        {chartType == "expenses" ? (
          <Chart dataOne={dataOne} dataTwo={dataTwo} isLoading={isLoading} />
        ) : chartType == "income" ? (
          <IncomeChart filter={filter} isLoading={isLoading} />
        ) : chartType == "savings" ? (
          <SavingsChart filter={filter} isLoading={isLoading} />
        ) : (
          <div>loading</div>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ paddingRight: 100 }}>
            <ExpenseTable filter={filter} />
          </div>
          <div>
            <IncomeTable filter={filter} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
