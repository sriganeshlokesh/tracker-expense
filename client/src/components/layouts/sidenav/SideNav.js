import React from "react";
import { Link } from "react-router-dom";

const SideNav = () => (
  <ul>
    <Link to="/user/dashboard">
      <li>
        <i class="fas fa-tachometer-alt"></i>Dashboard
      </li>
    </Link>
    <Link to="/user/budgets">
      <li>
        <i class="fas fa-cubes"></i>Budgets
      </li>
    </Link>
    <Link to="/user/expenses">
      <li>
        <i class="fas fa-wallet"></i>Expenses
      </li>
    </Link>
    <Link to="/user/add/budget">
      <li>
        <i class="fas fa-money-bill"></i>Add Budget
      </li>
    </Link>
    <Link to="/user/add/expense">
      <li>
        <i class="fas fa-dollar-sign"></i>Add Expense
      </li>
    </Link>
  </ul>
);

export default SideNav;
