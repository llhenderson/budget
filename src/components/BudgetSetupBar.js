import { useState } from "react";
import BudgetDisplayBar from "./BudgetDisplayBar.js";
import Button from "../components/shared/Button.js";
const BudgetSetupBar = () => {
  const [goalAmount, setGoalAmount] = useState();
  const [startingAmount, setStartingAmount] = useState();
  const [expense, setExpense] = useState();
  const [expenseType, setExpenseType] = useState();
  const [income, setIncome] = useState();
  const [incomeType, setIncomeType] = useState();
  const [expenseRecurring, setExpenseRecurring] = useState();
  const [incomeRecurring, setIncomeRecurring] = useState();

  const handleExpenseChange = (event) => {
    setExpenseRecurring(event.target.value);
  };
  const handleIncomeChange = (event) => {
    setIncomeRecurring(event.target.value);
  };
  return (
    <div className="budget-setup">
      <div style={{ alignSelf: "center" }}>
        <h1>Budget Setup</h1>
        <h2>Create New Budget</h2>
      </div>

      <div>
        <div className="savings_goal">
          <label>Savings Goal:</label>
          <input
            placeholder="Savings goal"
            value={goalAmount}
            className="goal-amount-input"
            onChange={(e) => setGoalAmount(e.target.value)}
          />
        </div>
        <div className="savings_goal">
          <label>Starting Amount:</label>
          <input
            placeholder="Starting Amount"
            value={startingAmount}
            className="goal-amount-input"
            onChange={(e) => setStartingAmount(e.target.value)}
          />
        </div>
      </div>
      <Button>Submit</Button>
      <div style={{ alignSelf: "center" }}>
        <h2>Add Expense</h2>
      </div>
      <div>
        <div className="add-expense">
          <label htmlFor="expense">Description:</label>

          <input
            id="expense"
            placeholder="New Expense"
            value={expense}
            className="new-expense-input"
            onChange={(e) => setExpense(e.target.value)}
          />
        </div>
        <div className="add-expense">
          <label htmlFor="expense-type">Type:</label>
          <select
            id="expense-type"
            className="expense-income-type"
            value={expenseType}
            onChange={(e) => setExpenseType(e.target.value)}
          >
            <option value="">bill</option>
            <option value="">grocery</option>
            <option value="">other(unrequired)</option>
            <option value="">other(required)</option>
          </select>
        </div>
      </div>
      <div
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <label>
          <input
            type="radio"
            value="Recurring"
            checked={expenseRecurring === "Recurring"}
            onChange={handleExpenseChange}
          />
          Recurring
        </label>
        <label>
          <input
            type="radio"
            value="Non-Recurring"
            checked={expenseRecurring === "Non-Recurring"}
            onChange={handleExpenseChange}
          />
          Non-Recurring
        </label>
      </div>
      <Button>Submit</Button>
      <div style={{ alignSelf: "center" }}>
        <h2>Add Income</h2>
      </div>
      <div className="add-expense">
        <label htmlFor="income">Description:</label>

        <input
          id="income"
          placeholder="New Income"
          value={income}
          className="new-expense-input"
          onChange={(e) => setIncome(e.target.value)}
        />
      </div>
      <div className="add-expense">
        <label htmlFor="income-type">Type:</label>
        <select
          className="expense-income-type"
          value={incomeType}
          onChange={(e) => setIncomeType(e.target.value)}
        >
          <option value="">Primary Job</option>
          <option value="">Side gig</option>
        </select>
      </div>
      <div
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <label>
          <input
            type="radio"
            value="Recurring"
            checked={incomeRecurring === "Recurring"}
            onChange={handleIncomeChange}
          />
          Recurring
        </label>
        <label>
          <input
            type="radio"
            value="Non-Recurring"
            checked={incomeRecurring === "Non-Recurring"}
            onChange={handleIncomeChange}
          />
          Non-Recurring
        </label>
      </div>
      <Button>Submit</Button>

      <BudgetDisplayBar />
    </div>
  );
};

export default BudgetSetupBar;
