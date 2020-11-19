import React, { Component } from "react";
import "./styles.css";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav class="main-nav">
          <img src="assets/logo.png" alt="" class="logo" />
          <ul class="main-menu">
            <li>
              <a href="">Home</a>
            </li>
          </ul>
          <ul class="right-menu">
            <li>
              <a href="">Login</a>
            </li>
            <li>
              <a href="">Register</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
