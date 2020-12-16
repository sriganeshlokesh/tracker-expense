import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { getLineChart } from "../../actions/apiCore";
import { isAuthenticated } from "../../actions/auth";

const MonthChart = () => {
  const [budgets, setBudgets] = useState({
    title: [],
    budget: [],
  });
  const { token } = isAuthenticated();

  // const { budget } = months;
  const month = new Date().getMonth() + 1;
  const getMonthlyBudget = (token, month) => {
    getLineChart(token, month)
      .then((res) => {
        setBudgets({
          ...budgets,
          title: res.map((data) => {
            return data.name;
          }),
          budget: res.map((data) => {
            return data.budget;
          }),
        });
      })
      .catch((err) => console.log(err));
  };

  const data = {
    labels: budgets.title,
    datasets: [
      {
        label: "Budget Category",
        data: budgets.budget,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  useEffect(() => {
    getMonthlyBudget(token, month);
  }, []);

  return <Line data={data} width={400} height={300} />;
};

export default MonthChart;
