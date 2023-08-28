import React from "react";
import style from "./DashboardItem.module.scss";
import classNames from "classnames/bind";
import { BoltIcon } from "@heroicons/react/24/outline";
const cx = classNames.bind(style);

export interface DashboardItemData {
  value: number;
  label: string;
  unit: string;
  name: string;
  color?: string;
}

interface Props {
  data: DashboardItemData;
  isShowCircle?: boolean;
}

const DashboardItem = ({ data, isShowCircle }: Props) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("top-wrapper")}>
        <p className={cx("dashboard-title")}>{data.name}</p>
        <div
          className={cx("icon-wrapper")}
          style={
            {
              "--color": `var(--${data.color})`,
            } as React.CSSProperties
          }
        >
          <BoltIcon className={cx("icon")} />
        </div>
      </div>
      {isShowCircle ? (
        <div
          className={cx("progress-wrapper")}
          style={
            {
              "--i": `${data.value}%`,
              "--color": `var(--${data.color})`,
            } as React.CSSProperties
          }
        >
          <p className={cx("progress-text")}>
            <span>{data.label}</span>
            <span>{data.unit}</span>
          </p>
        </div>
      ) : (
        <div className={cx("figure-wrapper")}>
          <span>{data.label}</span>
          <span>{data.unit}</span>
        </div>
      )}
    </div>
  );
};

export default DashboardItem;
