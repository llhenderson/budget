import { useState } from "react";
import BudgetDisplayBar from "./BudgetDisplayBar.js";

const BudgetSetupBar = () => {
  const [goalAmount, setGoalAmount] = useState();
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
      <h1>Budget Setup</h1>

      <label>Savings Goal</label>
      <input
        placeholder="Savings goal"
        value={goalAmount}
        className="goal-amount-input"
        onChange={(e) => setGoalAmount(e.target.value)}
      />
      <label htmlFor="expense">Expense</label>
      <div>
        <input
          id="expense"
          placeholder="New Expense"
          value={expense}
          className="new-expense-input"
          onChange={(e) => setExpense(e.target.value)}
        />
        <select
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
      <div>
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

      <label htmlFor="income">Income</label>
      <div>
        <input
          id="income"
          placeholder="New Income"
          value={income}
          className="new-income-input"
          onChange={(e) => setIncome(e.target.value)}
        />
        <select
          className="expense-income-type"
          value={incomeType}
          onChange={(e) => setIncomeType(e.target.value)}
        >
          <option value="">Primary Job</option>
          <option value="">Side gig</option>
        </select>
      </div>
      <div>
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
      <BudgetDisplayBar />
    </div>
  );
};

export default BudgetSetupBar;
