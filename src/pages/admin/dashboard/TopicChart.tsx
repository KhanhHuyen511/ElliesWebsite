import React from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { ChartData } from "chart.js/auto";

const TopicChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  const labels = ["Greeting", "Job", "Home"];

  const data = {
    labels,
    datasets: [
      {
        label: "# of Votes",
        data: [60, 19, 11],
        backgroundColor: ["#fbcf67", "#fbb825", "#da291c"],
        borderWidth: 0,
      },
    ],
  } as ChartData<"pie">;

  return <Pie options={options} data={data}></Pie>;
};

export default TopicChart;
