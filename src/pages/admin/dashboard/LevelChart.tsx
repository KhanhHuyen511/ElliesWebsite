import React from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { ChartData } from "chart.js/auto";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const LevelChart = () => {
  const levels = useSelector((state: RootState) => state.dashboard.levelRate);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        align: "start" as const,
      },
    },
  };

  const labels = ["Basic", "Medium", "Advanced"];

  const data = {
    labels,
    datasets: [
      {
        label: "# item",
        data: levels,
        backgroundColor: ["#b4cfff", "rgba(79, 126, 255, 1)", "#113077"],
        borderWidth: 0,
      },
    ],
  } as ChartData<"pie">;

  return <Pie options={options} data={data}></Pie>;
};

export default LevelChart;
