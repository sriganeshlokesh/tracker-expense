import axios from "axios";

export const login = (user) => {
  return axios
    .post("/api/auth/login", user)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const register = (user) => {
  return axios
    .post("/api/auth/register", user)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", JSON.stringify(data));
    next();
  }
};

export const logout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    next();
    return axios
      .get(`api/auth/logout`)
      .then((res) => {
        console.log("signout", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("token")) {
    return JSON.parse(localStorage.getItem("token"));
  } else {
    return false;
  }
};
