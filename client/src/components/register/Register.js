import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import classnames from "classnames";
import { register, authenticate } from "../../actions/auth";
import "./styles.css";

const Register = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: "",
    redirect: false,
  });

  const { name, email, password, password2, errors, redirect } = input;

  const handleChange = (name) => (event) => {
    setInput({ ...input, errors: false, [name]: event.target.value });
  };

  const registerUser = (event) => {
    event.preventDefault();
    register({ name, email, password, password2 }).then((res) => {
      authenticate(res, () => {
        setInput({
          ...input,
          redirect: true,
        });
      });
    });
  };

  const redirectUser = () => {
    if (redirect) {
      return <Redirect to="/user/dashboard" />;
    }
  };

  const registerLayout = () => (
    <section
      class="register-card"
      style={{
        background: `url(${process.env.PUBLIC_URL}/assets/background.png) no-repeat center center fixed`,
      }}
    >
      <div className="register-content">
        <div className="register-logo">
          <img src="./assets/logo.png" alt="" />
        </div>
        <div className="register-heading">
          <h3>Create an Account</h3>
          <p>Setup a new account in a minute</p>
        </div>
        <div className="register-form">
          <form className="form-content" noValidate onSubmit={registerUser}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange("name")}
                className={classnames("form-control", {
                  "is-invalid": errors.name,
                })}
                placeholder="Name"
                required
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
              <label for="name" className="form-label">
                Name
              </label>
            </div>
            <div className="form-group">
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
              <label for="email" className="form-label">
                Email
              </label>
            </div>

            <div className="form-group">
              <input
                type="password"
                onChange={handleChange("password")}
                className={classnames("form-control", {
                  "is-invalid": errors.password,
                })}
                placeholder="Password"
                name="password"
                id="password"
                required
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
              <label for="password" className="form-label">
                Password
              </label>
            </div>
            <div class="form-group">
              <input
                type="password"
                onChange={handleChange("password2")}
                className={classnames("form-control", {
                  "is-invalid": errors.password2,
                })}
                placeholder="Password2"
                name="password2"
                id="password2"
                required
              />
              {errors.password2 && (
                <div className="invalid-feedback">{errors.password2}</div>
              )}
              <label for="password2" className="form-label">
                Confirm Password
              </label>
            </div>
            <input type="submit" value="Register" className="submit-button" />
          </form>
        </div>
        <div className="login-link">
          <p>
            Already have an account? <Link to="/login">Login Here</Link>
          </p>
        </div>
      </div>
    </section>
  );
  return (
    <React.Fragment>
      {registerLayout()}
      {redirectUser()}
    </React.Fragment>
  );
};

export default Register;
