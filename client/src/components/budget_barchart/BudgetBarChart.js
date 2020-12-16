import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { getLineChart } from "../../actions/apiCore";
import { isAuthenticated } from "../../actions/auth";

const BudgetBarChart = () => {
  const { token } = isAuthenticated();
  const [chartBudget, setChartBudget] = useState({
    budget: [],
    capacity: [],
    title: [],
  });
  const month = new Date().getMonth() + 1;
  const getChartBudget = (token, month) => {
    getLineChart(token, month)
      .then((res) => {
        setChartBudget({
          ...chartBudget,
          budget: res.map((data) => {
            return data.budget;
          }),
          capacity: res.map((data) => {
            return data.capacity;
          }),
          title: res.map((data) => {
            return data.name;
          }),
        });
      })
      .catch((err) => console.log(err));
  };

  const { budget, capacity, title } = chartBudget;

  const data = {
    labels: title,
    datasets: [
      {
        label: "Budget",
        data: budget,
        backgroundColor: "rgba(244, 208, 111, 0.7)",
        hoverBackgroundColor: "rgba(244, 208, 111, 0.7)",
        hoverBorderWidth: 2,
        hoverBorderColor: "lightgrey",
      },
      {
        label: "Expense",
        data: capacity,
        backgroundColor: "rgba(57, 47, 90, 0.7)",
        hoverBackgroundColor: "rgba(57, 47, 90, 0.7)",
        hoverBorderWidth: 2,
        hoverBorderColor: "lightgrey",
      },
    ],
  };

  let options = {
    maintainAspectRatio: false,
    animation: {
      duration: 10,
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          gridLines: { display: false },
        },
      ],
      yAxes: [
        {
          stacked: false,
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    }, // scales
    legend: { display: true },
  }; // options

  useEffect(() => {
    getChartBudget(token, month);
  }, []);

  return <Bar data={data} width={400} height={400} options={options} />;
};

export default BudgetBarChart;
