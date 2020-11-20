import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Home = () => {
  const homeLayout = () => (
    <div className="container">
      <header class="heading">
        <div class="heading-content">
          <h2>Personal Budget</h2>
          <p>
            The simplest definition of a budget is "telling your money where to
            go
          </p>
          <Link to="/login" class="btn-2">
            Get Started <i class="fa fa-chevron-right"></i>
          </Link>
        </div>
        <img
          src="./assets/logo-heading.png"
          alt="heading"
          class="heading-image"
        />
      </header>

      <section class="class-cards">
        <div class="card-body">
          <img src="/assets/logo1.png" alt="" />
          <h3>Budget is Key</h3>
          <p>Track monthly budgets with ease.</p>
        </div>
        <div class="card-body">
          <img src="/assets/logo2.png" alt="" />
          <h3>Go Easy on yourself</h3>
          <p>Slow and steady wins the race.</p>
        </div>
        <div class="card-body">
          <img src="/assets/logo3.png" alt="" />
          <h3>Ease as it gets</h3>
          <p>We speak financials fluently.</p>
        </div>
      </section>
      <section class="get-started">
        <img
          src="./assets/footer-heading.png"
          alt=""
          class="get-started-image"
        />
        <div class="content">
          <h2>Keep Moving With Us!</h2>
          <p>United We Move and now let's keep moving together!</p>
          <Link to="/login" class="btn">
            Get Started <i class="fa fa-chevron-right"></i>
          </Link>
        </div>
      </section>
    </div>
  );
  return <React.Fragment>{homeLayout()}</React.Fragment>;
};

export default Home;
