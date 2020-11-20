import React from "react";
import { Link } from "react-router-dom";
import SideNav from "../layouts/sidenav/SideNav";
import { isAuthenticated } from "../../actions/auth";
import "./styles.css";

const Dashboard = () => {
  const { user } = isAuthenticated();

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
                <h3>5</h3>
                <p>Budgets</p>
              </div>
            </div>
            <div class="card-content">
              <p class="icon-center">
                <i class="fas fa-wallet fa-2x"></i>
              </p>
              <div class="card-body">
                <h3>15</h3>
                <p>Expenses</p>
              </div>
            </div>
            <div class="card-content">
              <p class="icon-center">
                <i class="fas fa-calendar-week fa-2x"></i>
              </p>
              <div class="card-body">
                <h3>20</h3>
                <p>Days Left</p>
              </div>
            </div>
            <div class="card-content">
              <p class="icon-center">
                <i class="fas fa-thermometer-half fa-2x"></i>
              </p>
              <div class="card-body">
                <h3>Good</h3>
                <p>Status</p>
              </div>
            </div>
          </div>

          {/* <div class="budget-circle">
            <div class="circle-content">
              <h1>Budget</h1>
              <p>
                <canvas id="myChart" width="400" height="400"></canvas>
              </p>
            </div>
          </div> */}

          <div class="chart-cards">
            <div class="total-budget">
              <h1>Top 10 Budgets</h1>
              <p>
                <canvas id="myChart" width="400" height="400"></canvas>
              </p>
            </div>
            <div class="total-budget">
              <h1>Top 10 Expenses</h1>
              <p>
                <canvas id="myChart" width="400" height="400"></canvas>
              </p>
            </div>
            <div class="total-budget">
              <h1>Budget Limit</h1>
              <p>
                <canvas id="myChart" width="400" height="400"></canvas>
              </p>
            </div>
            <div class="total-budget">
              <h1>Expense Comparision</h1>
              <p>
                <canvas id="myChart" width="400" height="400"></canvas>
              </p>
            </div>
          </div>

          <div class="list-cards">
            <div class="list-content">
              <h3>Budgets</h3>
              <hr />
              <table class="list-table">
                <thead>
                  <tr>
                    <th>Budget ID</th>
                    <th>Name</th>
                    <th>Limit</th>
                    <th>Left</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>INV-212312312</td>
                    <td>Household</td>
                    <td>200$</td>
                    <td>100$</td>
                  </tr>

                  <tr>
                    <td>INV-212312312</td>
                    <td>Household</td>
                    <td>200$</td>
                    <td>100$</td>
                  </tr>
                  <tr>
                    <td>INV-212312312</td>
                    <td>Household</td>
                    <td>200$</td>
                    <td>100$</td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <div class="list-tag">
                <a href="#" class="list-link">
                  View All Budgets<i class="fas fa-chevron-right"></i>
                </a>
              </div>
            </div>
            <div class="list-content">
              <h3>Expenses</h3>
              <hr />
              <table class="list-table">
                <thead>
                  <tr>
                    <th>Budget ID</th>
                    <th>Name</th>
                    <th>Limit</th>
                    <th>Left</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>INV-212312312</td>
                    <td>Household</td>
                    <td>200$</td>
                    <td>100$</td>
                  </tr>
                  <tr>
                    <td>INV-212312312</td>
                    <td>Household</td>
                    <td>200$</td>
                    <td>100$</td>
                  </tr>
                  <tr>
                    <td>INV-212312312</td>
                    <td>Household</td>
                    <td>200$</td>
                    <td>100$</td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <div class="list-tag">
                <a href="#" class="list-link">
                  View All Expenses<i class="fas fa-chevron-right"></i>
                </a>
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
