import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import classnames from "classnames";
import { login, isAuthenticated, authenticate } from "../../actions/auth";
import "./styles.css";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    errors: "",
  });

  const { email, password, errors } = input;

  const handleChange = (name) => (event) => {
    setInput({ ...input, errors: false, [name]: event.target.value });
  };

  const loginUser = (event) => {
    event.preventDefault();
    login({ email, password })
      .then((res) => {
        authenticate(res, () => {
          setInput({
            ...input,
          });
        });
      })
      .catch((err) => {
        setInput({ ...input, errors: err.response.data });
      });
  };

  const redirectUser = () => {
    if (isAuthenticated()) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  const loginLayout = () => (
    <section
      class="login-card"
      style={{
        background: `url(${process.env.PUBLIC_URL}/assets/background.png) no-repeat center center fixed`,
      }}
    >
      <div class="login-content">
        <div class="login-logo">
          <img src="./assets/logo.png" alt="" />
        </div>
        <div class="login-heading">
          <h3>Login to your Account</h3>
          <p>Use your credentials to access your account</p>
        </div>
        <div class="login-form">
          <form class="form-content" noValidate onSubmit={loginUser}>
            <div class="form-group">
              <input
                type="text"
                id="email"
                name="email"
                onChange={handleChange("email")}
                className={classnames("form-control", {
                  "is-invalid": errors.email,
                })}
                placeholder="Email"
                required
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
              <label for="email" class="form-label">
                Email
              </label>
            </div>

            <div class="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                onChange={handleChange("password")}
                className={classnames("form-control", {
                  "is-invalid": errors.password,
                })}
                required
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
              <label for="password" class="form-label">
                Password
              </label>
            </div>
            <input type="submit" value="Login" class="submit-button" />
          </form>
        </div>
        <div class="register-link">
          <p>
            Dont have an account? <Link to="/register">Register Here</Link>
          </p>
        </div>
      </div>
    </section>
  );

  return (
    <React.Fragment>
      {loginLayout()}
      {redirectUser()}
    </React.Fragment>
  );
};

export default Login;
