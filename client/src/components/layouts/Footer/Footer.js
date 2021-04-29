import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../../actions/auth";
import "./styles.css";

class Footer extends Component {
  render() {
    return (
      <div>
        <footer class="footer">
          <div class="footer-inner">
            <div>
              <i class="fa fa-globe fa-2x"></i>
              English (United States)
            </div>
            <ul>
              {!isAuthenticated() ? (
                <li>
                  <Link to="/">&copy; Personal Budget 2021</Link>
                </li>
              ) : (
                <li>
                  <Link to="/user/dashboard">&copy; Personal Budget 2021</Link>
                </li>
              )}
            </ul>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
