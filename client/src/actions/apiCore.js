import axios from "axios";

// Add Budget
export const addBudget = (data, token) => {
  return axios
    .post(`/api/budget/create`, data, {
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
export const getBudgets = (token) => {
  return axios
    .get(`/api/budget/all/budget`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getSomeBudgets = (token) => {
  return axios
    .get(`/api/budget/all/budget?limit=3`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getChartBudgets = (token, month) => {
  return axios
    .get(`/api/budget/month/chart?month=${month}&year=2020`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getBudgetChart = (token) => {
  return axios
    .get(`/api/budget/all/budget?order=desc&limit=5`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getLineChart = (token, month) => {
  return axios
    .get(`/api/budget/line/chart?month=${month}&year=2020`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const getChartExpenses = (token) => {
  return axios
    .get(`/api/expense/all/expense?limit=5&sortBy=expense&order=desc`, {
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
export const addExpense = (data, token) => {
  return axios
    .post(`/api/expense/create`, data, {
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

// Get All Expenses
export const getAllExpenses = (token) => {
  return axios
    .get(`/api/expense/all/expense`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

// Get All Expenses
export const getSomeExpenses = (token) => {
  return axios
    .get(`/api/expense/all/expense?limit=3`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

// Delete Expense
export const deleteExpense = (expenseId, token) => {
  return axios
    .delete(`/api/expense/${expenseId}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return {
        success: true,
      };
    })
    .catch((err) => console.log(err));
};

// Get Budget Total
export const budgetTotal = (token) => {
  return axios
    .get(`/api/budget/sum/budget`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

// Get Expense Total
export const expenseTotal = (token) => {
  return axios
    .get(`/api/expense/sum/expense`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

// Get Budget Based on Month
export const monthlyBudget = (token) => {
  return axios
    .get(`/api/budget/month/budget`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
