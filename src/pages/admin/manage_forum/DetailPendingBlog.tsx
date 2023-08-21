import React from "react";
import { useParams } from "react-router-dom";
import style from "./DetailPendingBlog.module.scss";
import classNames from "classnames/bind";
import BlogDetail from "../../forum/BlogDetail";
import { Col, Row } from "react-flexbox-grid";
import { Button, TextArea } from "../../../components";
const cx = classNames.bind(style);

const DetailPendingBlog = () => {
  let { id } = useParams();

  return (
    <>
      <div className="container">
        <Row className={cx("wrapper")}>
          <Col lg={6}>
            <BlogDetail noComment noLike></BlogDetail>
          </Col>
          <Col lg={4} lgOffset={2}>
            <p className={cx("sub-title")}>Note</p>
            <TextArea
              label={""}
              placeholder={"Write something..."}
              onChange={() => {}}
            />
            <div className={cx("cta-wrapper")}>
              <Button isPrimary onClick={() => {}}>
                Accept
              </Button>
              <Button isPrimary={false} isDanger onClick={() => {}}>
                Cancel
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DetailPendingBlog;
