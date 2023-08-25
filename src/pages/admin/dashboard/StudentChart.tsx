import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { ChartData } from "chart.js/auto";
import { FilterProps } from "./Dashboard";
import { FilterType } from "./FilterDashboard";
import { getDaily, getDaysStringOfMonth, getYearly } from "../../../utils";

const StudentChart = ({ filter }: { filter: FilterProps | undefined }) => {
  const [labels, setLabels] = useState<string[]>();

  console.log("hihi");

  useEffect(() => {
    switch (filter?.type.toString()) {
      case FilterType.Daily.toString():
        setLabels(getDaily);
        break;
      case FilterType.Monthly.toString():
        setLabels(getDaysStringOfMonth(filter.data));
        break;
      case FilterType.Yearly.toString():
        setLabels(getYearly);
        break;
      default:
        break;
    }
  }, [filter?.data, filter?.type]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

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
