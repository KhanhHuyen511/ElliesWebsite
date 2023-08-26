import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { ChartData } from "chart.js/auto";
import { FilterProps } from "./Dashboard";
import { FilterType } from "./FilterDashboard";
import {
  getDaily,
  getDate,
  getDaysStringOfMonth,
  getYearly,
} from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getDataStudent } from "../../../redux/slice/dashboardSlice";

const StudentChart = ({ filter }: { filter: FilterProps | undefined }) => {
  const [labels, setLabels] = useState<string[]>();

  useEffect(() => {
    switch (filter?.type.toString()) {
      // case FilterType.Daily.toString():
      //   setLabels(getDaily);
      //   break;
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

  const dispatch = useDispatch<AppDispatch>();

  const checkedIn = useSelector(
    (state: RootState) => state.dashboard.checkedInNumber
  );
  const completeRoute = useSelector(
    (state: RootState) => state.dashboard.completedRoutes
  );

  useEffect(() => {
    dispatch(getDataStudent());
  }, []);

  const getCheckinData = () => {
    // checked in number
    let monthCheckedIn = checkedIn.filter(
      (i) =>
        i.getMonth() ===
        (filter?.data ? filter.data.getMonth() : new Date().getMonth())
    );

    if (monthCheckedIn && labels) {
      let array: number[] = [];

      labels.map(
        (i, index) =>
          (array[index] = monthCheckedIn.filter(
            (i) => i.getDate() === index + 1
          ).length)
      );

      return array;
    }

    return [];
  };

  const getCompletedRouteData = () => {
    // completed in Route number
    let monthComplete = completeRoute.filter(
      (i) =>
        i.updateDate.getMonth() ===
        (filter?.data ? filter.data.getMonth() : new Date().getMonth())
    );

    if (monthComplete && labels) {
      let array: number[] = [];

      labels.map(
        (i, index) =>
          (array[index] = monthComplete.filter(
            (i) => i.updateDate.getDate() === index + 1
          ).length)
      );

      return array;
    }

    return [];
  };

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
        data: getCompletedRouteData(),
        backgroundColor: "rgba(251, 184, 37, 1)",
      },
      {
        label: "Checked In",
        data: getCheckinData(),
        backgroundColor: "rgba(79, 126, 255, 1)",
      },
    ],
  } as ChartData<"bar">;

  return <Bar options={options} data={data}></Bar>;
};

export default StudentChart;
