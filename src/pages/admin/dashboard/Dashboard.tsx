import style from "./Dashboard.module.scss";
import classNames from "classnames/bind";
import { Col, Row } from "react-flexbox-grid";
import "chart.js/auto";
import StudentChart from "./StudentChart";
import LevelChart from "./LevelChart";
import FilterDashboard, { FilterType } from "./FilterDashboard";
import CommonFigure from "./CommonFigure";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import {
  getDataAccount,
  getDataBlog,
  getDataStudent,
} from "../../../redux/slice/dashboardSlice";
const cx = classNames.bind(style);

export interface FilterProps {
  type: FilterType;
  data: any;
}

const Dashboard = () => {
  const [filterOptions, setFilterOptions] = useState<FilterProps>({
    type: FilterType.Monthly,
    data: undefined,
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getDataStudent());
    dispatch(getDataBlog());
    dispatch(getDataAccount());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <p className={cx("page-title")}>Dashboard</p>
        <p className={cx("greeting")}>Hi, have a good day~</p>
        <FilterDashboard
          onClick={(filter: FilterProps) => {
            setFilterOptions(filter);
          }}
        />
        <Row>
          <Col lg={9} className={cx("bar-chart-wrapper")}>
            <p className={cx("sub-title")}>Students</p>
            <StudentChart filter={filterOptions} />
            <div className={cx("detail")}>Detail</div>
          </Col>
          <Col lg={3}>
            <div className={cx("pie-chart-wrapper")}>
              <p className={cx("sub-title")}>Levels</p>
              <LevelChart />
            </div>
            <div className={cx("figure-wrapper")}>
              <p className={cx("sub-title")}>Common</p>
              <CommonFigure />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
