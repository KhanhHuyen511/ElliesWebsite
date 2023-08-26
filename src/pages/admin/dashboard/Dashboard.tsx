import style from "./Dashboard.module.scss";
import classNames from "classnames/bind";
import { Button, Input } from "../../../components";
import { Col, Row } from "react-flexbox-grid";
import "chart.js/auto";
import StudentChart from "./StudentChart";
import LevelChart from "./LevelChart";
import TopicChart from "./TopicChart";
import FilterDashboard, { FilterType } from "./FilterDashboard";
import { useState } from "react";
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
            <div className={cx("detail")}>detail</div>
          </Col>
          <Col lg={3}>
            <div className={cx("pie-chart-wrapper")}>
              <p className={cx("sub-title")}>Levels</p>
              <LevelChart />
              {/* <div className={cx("detail")}>detail</div> */}
            </div>
            <div className={cx("pie-chart-wrapper")}>
              <p className={cx("sub-title")}>Topics</p>
              <TopicChart />
              {/* <div className={cx("detail")}>detail</div> */}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
