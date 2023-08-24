import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./DetailPendingBlog.module.scss";
import classNames from "classnames/bind";
import BlogDetail from "../../forum/BlogDetail";
import { Col, Row } from "react-flexbox-grid";
import { Button, TextArea } from "../../../components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { updateBlogState } from "../../../redux/slice/forumSlice";
import { BlogState } from "../../../types";
const cx = classNames.bind(style);

const DetailPendingBlog = () => {
  let { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  let note: string;

  const AcceptBlog = () => {
    if (id)
      dispatch(
        updateBlogState({ blogId: id, newState: BlogState.Posted })
      ).then(() => navigate(-1));
  };

  const CancelBlog = () => {
    if (id)
      dispatch(
        updateBlogState({
          blogId: id,
          newState: BlogState.Canceled,
          note: note,
        })
      ).then(() => navigate(-1));
  };

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
              onChange={(e) => {
                note = e.target.value;
              }}
            />
            <div className={cx("cta-wrapper")}>
              <Button isPrimary onClick={AcceptBlog}>
                Accept
              </Button>
              <Button isPrimary={false} isDanger onClick={CancelBlog}>
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
