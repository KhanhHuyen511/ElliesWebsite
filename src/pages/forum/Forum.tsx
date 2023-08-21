import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./Forum.module.scss";
import { Col } from "react-flexbox-grid";
import { BlogCard, Button, CategoryPanel } from "../../components";
import {
  AcademicCapIcon,
  FireIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getListBlogs } from "../../redux/slice/forumSlice";
import PersonalBlogManage from "./PersonalBlogManage";
const cx = classNames.bind(style);

enum TabType {
  Blogs,
  Yours,
}

const Forum = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const list = useSelector((state: RootState) => state.forum.listBlogs);
  const [tabType, setTabType] = useState(TabType.Blogs);

  useEffect(() => {
    dispatch(getListBlogs());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <Col xs={12} md={8} lg={6}>
          <p className={cx("title")}>Diễn đàn</p>
          <ul className={cx("")}>{}</ul>
        </Col>

        <ul className={cx("forum-cate-wrapper")}>
          <CategoryPanel
            label={"Blogs"}
            isActive={tabType === TabType.Blogs}
            classNames={cx("cate-item")}
            icon={<AcademicCapIcon />}
            onClick={() => setTabType(TabType.Blogs)}
          />
          <CategoryPanel
            label={"Yours"}
            isActive={tabType === TabType.Yours}
            classNames={cx("cate-item")}
            icon={<FireIcon />}
            onClick={() => setTabType(TabType.Yours)}
          />
        </ul>

        {tabType === TabType.Blogs ? (
          <>
            <div className={cx("create-wrapper")}>
              <p className={cx("sub-title")}>Nổi bật</p>
              <Button
                isPrimary={true}
                onClick={() => {
                  navigate("/forum/create");
                }}
              >
                Tạo mới
              </Button>
            </div>

            <ul className={cx("list")}>
              {list &&
                list.length > 0 &&
                list.map((item, index) => (
                  <li key={index} className={cx("item")}>
                    <BlogCard data={item} />
                  </li>
                ))}
            </ul>
          </>
        ) : (
          <PersonalBlogManage></PersonalBlogManage>
        )}
      </div>
    </>
  );
};

export default Forum;
