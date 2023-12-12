import { useEffect } from "react";
import { Col, Row } from "react-flexbox-grid";
import style from "./IndexForum.module.scss";
import classNames from "classnames/bind";
import { BlogCard, PendingBlogCard } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  getListBlogs,
  getListPendingBlogs,
} from "../../../redux/slice/forumSlice";
import { AppDispatch, RootState } from "../../../redux/store";
const cx = classNames.bind(style);

const IndexForum = () => {
  const dispatch = useDispatch<AppDispatch>();

  const list = useSelector((state: RootState) => state.forum.listBlogs);
  const pendingList = useSelector(
    (state: RootState) => state.forum.listPendingBlogs
  );

  useEffect(() => {
    dispatch(getListBlogs());
    dispatch(getListPendingBlogs());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <Row>
          <Col xs={12} md={8} lg={6}>
            <p className={cx("title")}>Manage forum</p>
            <ul className={cx("list")}>
              {list &&
                list.length > 0 &&
                list.map((item, index) => (
                  <li key={index} className={cx("item")}>
                    <BlogCard data={item} />
                  </li>
                ))}
            </ul>
          </Col>
          <Col xs={12} md={8} lg={4} lgOffset={2}>
            <p className={cx("sub-title")}>Pending post</p>
            <ul className={cx("list")}>
              {pendingList &&
                pendingList.length > 0 &&
                pendingList.map((item, index) => (
                  <li key={index} className={cx("item")}>
                    <PendingBlogCard data={item} />
                  </li>
                ))}
            </ul>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default IndexForum;
