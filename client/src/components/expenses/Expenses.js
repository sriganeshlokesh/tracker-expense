import React, { useState, useEffect } from "react";
import SideNav from "../layouts/sidenav/SideNav";
import { getAllExpenses, deleteExpense } from "../../actions/apiCore";
import { isAuthenticated } from "../../actions/auth";
import "./styles.css";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const { user, token } = isAuthenticated();

  const getExpenses = (id, token) => {
    getAllExpenses(id, token)
      .then((res) => {
        setExpenses(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getExpenses(user._id, token);
  }, []);

  const expensesLayout = () => (
    <div className="container">
      <section class="dashboard">
        <div class="side-nav">
          <SideNav />
        </div>
        <section class="expense-section">
          <div class="expense-section-heading">
            <h1>Expenses</h1>
          </div>
          <div class="expense-table">
            <ul class="responsive-table">
              <li class="table-header">
                <div class="col col-1">Expense Id</div>
                <div class="col col-2">Expense Name</div>
                <div class="col col-3">Budget Name</div>
                <div class="col col-4">Expense Limit</div>
                <div class="col col-5">Options</div>
              </li>

              {expenses.map((expense, index) => (
                <li class="table-row" key={index}>
                  <div class="col col-1" data-label="Expense Id">
                    {expense._id}
                  </div>
                  <div class="col col-2" data-label="Expense Name">
                    {expense.name}
                  </div>
                  <div class="col col-3" data-label="Expense Budget">
                    {expense.budget.name}
                  </div>
                  <div class="col col-4" data-label="Amount">
                    ${expense.expense}
                  </div>
                  <div
                    class="col col-5"
                    data-label="Payment Status"
                    onClick={() => {
                      deleteExpense(user._id, expense._id, token).then(() => {
                        getExpenses(user._id, token);
                      });
                    }}
                  >
                    <i class="fas fa-times"></i>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </div>
  );
  return <React.Fragment>{expensesLayout()}</React.Fragment>;
};

export default Expenses;
