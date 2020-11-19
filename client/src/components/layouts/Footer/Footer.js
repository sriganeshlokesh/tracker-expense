import React, { Component } from "react";
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
              <li>
                <a href="">&copy; Personal Budget 2020</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
