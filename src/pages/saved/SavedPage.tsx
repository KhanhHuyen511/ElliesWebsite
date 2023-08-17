import React from "react";
import { Col } from "react-flexbox-grid";
import style from "./SavedPage.module.scss";
import classNames from "classnames/bind";
import { Input } from "../../components";
import { HeartIcon } from "@heroicons/react/24/outline";
const cx = classNames.bind(style);

const SavedPage = () => {
  return (
    <>
      <div className={cx("wrapper", "container")}>
        <Col xs={12} md={8} lg={6}>
          <p className={cx("page-title")}>Saved</p>

          <Input
            label={"Search"}
            placeholder={"Enter your keyword"}
            onChange={() => {}}
          ></Input>

          <ul className={cx("search-list")}>
            <li className={cx("item", "is-active")}>All</li>
            <li className={cx("item")}>Word</li>
            <li className={cx("item")}>Sentence</li>
          </ul>

          <ul className={cx("saved-list")}>
            <li className={cx("item")}>
              <p className={cx("display")}>Egg</p>
              <p className={cx("meaning")}>Qua trung</p>
              <div className={cx("icon-wrapper")}>
                <img src="/images/avatar.png" className={cx("image")} alt="" />
                <HeartIcon className={cx("icon")} />
              </div>
            </li>
          </ul>
        </Col>
      </div>
    </>
  );
};

export default SavedPage;
