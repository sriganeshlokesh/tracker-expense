import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./actions/PrivateRoute";
import Navbar from "./components/layouts/Navbar/Navbar";
import Footer from "./components/layouts/Footer/Footer";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Home from "./components/landing/Home";
import Dashboard from "./components/dashboard/Dashboard";
import AddBudget from "./components/add_budget/AddBudget";
import AddExpense from "./components/add_expense/AddExpense";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
          <PrivateRoute path="/user/add/budget" exact component={AddBudget} />
          <PrivateRoute path="/user/add/expense" exact component={AddExpense} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
