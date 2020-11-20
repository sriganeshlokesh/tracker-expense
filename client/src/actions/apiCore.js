import axios from "axios";

// Add Budget
export const addBudget = (id, data, token) => {
  return axios
    .post(`/api/budget/create/${id}`, data, {
      headers: {
        Authorization: token,
      },
    })
    .then(() => {
      return {
        success: true,
      };
    })
    .catch((err) => console.log(err));
};

// Get All Budgets
export const getBudgets = (id, token) => {
  return axios
    .get(`/api/budget/all/budget/${id}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

// Add Expense
export const addExpense = (id, data, token) => {
  return axios
    .post(`/api/expense/create/${id}`, data, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return {
        success: true,
      };
    })
    .catch((err) => {
      if (err.response) {
        return err.response.data;
      }
    });
};
