/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import style from "./Dashboard.module.scss";
import classNames from "classnames/bind";
import { Button, Input } from "../../../components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const cx = classNames.bind(style);

enum FilterType {
  Daily,
  Monthly,
  Yearly,
}

const FilterDashboard = () => {
  const [filterType, setFilterType] = useState<FilterType>(FilterType.Daily);
  const [selectedDate, setSelectedDate] = useState<any>(new Date());

  return (
    <div className={cx("filter-wrapper")}>
      <select
        defaultValue={filterType}
        className={cx("filter-type")}
        onChange={(e) => {
          setFilterType(e.target.value as unknown as FilterType);
        }}
      >
        <option value={FilterType.Daily}>{FilterType[0]}</option>
        <option value={FilterType.Monthly}>{FilterType[1]}</option>
        <option value={FilterType.Yearly}>{FilterType[2]}</option>
      </select>

      <div className={cx("filter-date")}>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          maxDate={new Date()}
          todayButton={"Today"}
          wrapperClassName={cx("date-picker")}
          popperClassName={cx("propper")}
          className={cx("date-input")}
          showYearPicker={filterType == FilterType.Yearly}
          showMonthYearPicker={filterType == FilterType.Monthly}
        />
      </div>
      <Button isPrimary onClick={() => {}}>
        View
      </Button>
    </div>
  );
};

export default FilterDashboard;
