import React from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { ChartData } from "chart.js/auto";

const StudentChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Completed a Route",
        data: [40, 20, 50],
        backgroundColor: "rgba(251, 184, 37, 1)",
      },
      {
        label: "Checked In",
        data: [20, 30, 49],
        backgroundColor: "rgba(79, 126, 255, 1)",
      },
    ],
  } as ChartData<"bar">;

  return <Bar options={options} data={data}></Bar>;
};

export default StudentChart;
