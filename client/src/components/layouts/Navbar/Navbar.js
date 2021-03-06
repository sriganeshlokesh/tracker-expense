import React from "react";
import { Link, withRouter } from "react-router-dom";
import {
  isAuthenticated,
  logout,
} from "../../../actions/auth";

import "semantic-ui-css/semantic.min.css";
import "./styles.css";

const Navbar = ({ history }) => {
  return (
    <div className="container">
      <nav class="main-nav">
        <img
          src={process.env.PUBLIC_URL + "/assets/logo.png"}
          alt=""
          class="logo"
        />
        <ul class="main-menu">
          {!isAuthenticated() && (
            <li>
              <Link to="/">Home</Link>
            </li>
          )}
        </ul>
        <ul class="right-menu">
          {!isAuthenticated() && (
            <React.Fragment>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </React.Fragment>
          )}
          {isAuthenticated() && (
            <React.Fragment>
              <li>
                <span
                  style={{ cursor: "pointer", color: "#000000" }}
                  onClick={() =>
                    logout(() => {
                      history.push("/");
                    })
                  }
                >
                  Logout
                </span>
              </li>
              <li>
                <span>
                  <Link
                    to="/user/dashboard"
                    style={{ cursor: "pointer", color: "#000000" }}
                  >
                    Dashboard
                  </Link>
                </span>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default withRouter(Navbar);
