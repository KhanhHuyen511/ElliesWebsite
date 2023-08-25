import React from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { ChartData } from "chart.js/auto";

const LevelChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  const labels = ["Basic", "Medium", "Advanced"];

  const data = {
    labels,
    datasets: [
      {
        label: "# of Votes",
        data: [60, 19, 11],
        backgroundColor: ["#b4cfff", "rgba(79, 126, 255, 1)", "#113077"],
        borderWidth: 0,
      },
    ],
  } as ChartData<"pie">;

  return <Pie options={options} data={data}></Pie>;
};

export default LevelChart;
