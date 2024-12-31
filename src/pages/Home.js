import Chart from "../components/Chart";
import ExpenseTable from "../components/ExpenseTable";
import IncomeTable from "../components/IncomeTable";

const Home = () => {
  return (
    <div>
      <Chart />
      <ExpenseTable />
      <IncomeTable />
      <div>Add expense</div>
      <div>Add income</div>
    </div>
  );
};

export default Home;
