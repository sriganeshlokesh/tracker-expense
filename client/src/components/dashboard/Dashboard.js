import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import SideNav from "../layouts/sidenav/SideNav";
import BudgetChart from "../budget_chart/BudgetChart";
import ExpenseChart from "../expense_chart/ExpenseChart";
import BudgetBarChart from "../budget_barchart/BudgetBarChart";
import MonthChart from "../month_chart/MonthChart";
import {
  getAllExpenses,
  getBudgets,
  getSomeExpenses,
  getSomeBudgets,
} from "../../actions/apiCore";
import { isAuthenticated } from "../../actions/auth";
import "./styles.css";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);

  const { user, token } = isAuthenticated();

  const getExpenses = (token) => {
    getAllExpenses(token)
      .then((res) => {
        setExpenses(res);
      })
      .catch((err) => console.log(err));
  };

  const getExpensesData = (token) => {
    getSomeExpenses(token)
      .then((res) => {
        setExpenseData(res);
      })
      .catch((err) => console.log(err));
  };

  const getSomeBudgetData = (token) => {
    getSomeBudgets(token)
      .then((res) => {
        setBudgetData(res);
      })
      .catch((err) => console.log(err));
  };

  const getBudgetsData = (token) => {
    getBudgets(token)
      .then((res) => {
        setBudgets(res);
      })
      .catch((err) => {
        setBudgets({
          error: err,
        });
      });
  };

  useEffect(() => {
    getExpenses(token);
    getBudgetsData(token);
    getExpensesData(token);
    getSomeBudgetData(token);
  }, []);

  const dashboardLayout = () => (
    <div className="container">
      <section class="dashboard">
        <div class="side-nav">
          <SideNav />
        </div>
        <div class="dashboard-content">
          <div class="dashboard-heading">
            <h1>Welcome, {user.name}</h1>
            <p>Dashboard</p>
          </div>

          <div class="dashboard-cards">
            <div class="card-content">
              <p class="icon-center">
                <i class="fas fa-cubes fa-2x"></i>
              </p>
              <div class="card-body">
                <h3>{budgets.length}</h3>
                <p>Budgets</p>
              </div>
            </div>
            <div class="card-content">
              <p class="icon-center">
                <i class="fas fa-wallet fa-2x"></i>
              </p>
              <div class="card-body">
                <h3>{expenses.length}</h3>
                <p>Expenses</p>
              </div>
            </div>

            <div class="card-content">
              <p class="icon-center">
                <i class="fas fa-thermometer-half fa-2x"></i>
              </p>
              <div class="card-body">
                <h3>{moment().format("MMMM")}</h3>
                <p>Month</p>
              </div>
            </div>
          </div>

          <div class="chart-cards">
            <div class="total-budget">
              <h1>Top 5 Budgets</h1>
              <div className="chart-content">
                {budgetData.length > 0 ? (
                  <BudgetChart />
                ) : (
                  <div>
                    <h2>No Budget to Display</h2>
                    <h3>Add Budget</h3>
                  </div>
                )}
              </div>
            </div>
            <div class="total-budget" id="budget">
              <h1>Budget & Expenditure</h1>
              <div className="chart-content">
                {budgetData.length > 0 ? (
                  <BudgetBarChart />
                ) : (
                  <div>
                    <h2>No Budget/Expense to Display</h2>
                    <h3>Add Budget & Expense</h3>
                  </div>
                )}
              </div>
            </div>
            <div class="total-budget">
              <h1>Monthly Budget</h1>
              <div className="chart-content">
                {budgetData.length > 0 ? (
                  <MonthChart />
                ) : (
                  <div>
                    <h2>No Budget/Expense to Display</h2>
                    <h3>Add Budget & Expense</h3>
                  </div>
                )}
              </div>
            </div>
            <div class="total-budget">
              <h1>Top 5 Expenses</h1>
              <div className="chart-content">
                {expenses.length > 0 ? (
                  <ExpenseChart />
                ) : (
                  <div>
                    <h2>No Expense to Display</h2>
                    <h3>Add Expense</h3>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div class="list-cards">
            <div class="list-content">
              <h3>Budgets</h3>
              <hr />
              {budgetData.length > 0 ? (
                <table class="list-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Limit</th>
                      <th>Left</th>
                      <th>Month</th>
                    </tr>
                  </thead>
                  <tbody>
                    {budgetData.map((budget, index) => (
                      <tr key={index}>
                        <td>{budget.name}</td>
                        <td>{budget.budget}$</td>
                        <td>{budget.budget - budget.capacity}$</td>
                        <td>{moment(budget.month).format("MMMM")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <h3>Budget Data Not Available</h3>
              )}
              <hr />
              <div class="list-tag">
                <Link to="/user/budgets" class="list-link">
                  View All Budgets<i class="fas fa-chevron-right"></i>
                </Link>
              </div>
            </div>
            <div class="list-content">
              <h3>Expenses</h3>
              <hr />
              {expenseData.length > 0 ? (
                <table class="list-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Budget</th>
                      <th>Amount</th>
                      <th>Month</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenseData.map((expense, index) => (
                      <tr key={index}>
                        <td>{expense.name}</td>
                        <td>{expense.budget.name}</td>
                        <td>{expense.expense}$</td>
                        <td>{moment(expense.budget.month).format("MMMM")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <h3>Expense Data Not Available</h3>
              )}
              <hr />
              <div class="list-tag">
                <Link to="/user/expenses" class="list-link">
                  View All Expenses<i class="fas fa-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  return <React.Fragment>{dashboardLayout()}</React.Fragment>;
};

export default Dashboard;
