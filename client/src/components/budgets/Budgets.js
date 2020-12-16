import React, { useState, useEffect } from "react";
import moment from "moment";
import SideNav from "../layouts/sidenav/SideNav";
import { getBudgets } from "../../actions/apiCore";
import { isAuthenticated } from "../../actions/auth";
import "./styles.css";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);

  const { token } = isAuthenticated();

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
    getBudgetsData(token);
  }, []);

  const budgetsLayout = () => (
    <div className="container">
      <section class="dashboard">
        <div class="side-nav">
          <SideNav />
        </div>
        <section class="budget-section">
          <div class="budget-section-heading">
            <h1>Budgets</h1>
          </div>
          <div class="budget-table">
            <ul class="responsive-table">
              <li class="table-header">
                <div class="col col-1">Budget Id</div>
                <div class="col col-2">Budget Name</div>
                <div class="col col-3">Budget Limit</div>
                <div class="col col-3">Budget Month</div>
                <div class="col col-4">Budget Status</div>
              </li>
              {budgets.map((budget, index) => (
                <li class="table-row" key={index}>
                  <div class="col col-1" data-label="Job Id">
                    {budget._id}
                  </div>
                  <div class="col col-2" data-label="Customer Name">
                    {budget.name}
                  </div>
                  <div class="col col-3" data-label="Amount">
                    ${budget.budget}
                  </div>
                  <div class="col col-4" data-label="Month">
                    {moment(budget.month).format("MMMM")}
                  </div>
                  <div class="col col-5" data-label="Payment Status">
                    {budget.capacity < budget.budget ? "Good" : "Exceeded"}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>
    </div>
  );
  return <React.Fragment>{budgetsLayout()}</React.Fragment>;
};

export default Budgets;
