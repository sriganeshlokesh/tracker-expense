import React, { useState, useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";
import { monthlyBudget } from "../../actions/apiCore";
import { isAuthenticated } from "../../actions/auth";

const MonthChart = () => {
  const [month, setMonth] = useState([]);
  const { user, token } = isAuthenticated();

  const getMonthlyBudget = (userId, token) => {
    monthlyBudget(userId, token)
      .then((res) => {
        setMonth(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMonthlyBudget(user._id, token);
  }, []);

  let monthlyData = Array.from(Array(12)).fill(0);
  month.map((item, i) => {
    monthlyData[parseInt(item._id) - 1] = parseInt(item.total);
  });

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Monthly Budget",
        backgroundColor: [
          "#FF8811",
          "#542344",
          "#2E933C",
          "#FE5F55",
          "#473BF0",
          "#ECD444",
          "#CC4BC2",
          "#55286F",
          "#6D98BA",
          "#00FFE7",
          "#475B63",
          "#774936",
        ],
        borderColor: "#fff",
        borderWidth: 1,
        hoverBackgroundColor: [
          "#FF8811",
          "#542344",
          "#2E933C",
          "#FE5F55",
          "#473BF0",
          "#ECD444",
          "#CC4BC2",
          "#55286F",
          "#6D98BA",
          "#00FFE7",
          "#475B63",
          "#774936",
        ],
        hoverBorderColor: "#FFF",
        data: monthlyData,
      },
    ],
  };

  return (
    <HorizontalBar
      data={data}
      width={400}
      height={400}
      options={{
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
      }}
    />
  );
};

export default MonthChart;
