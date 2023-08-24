import React, { useEffect, useState } from "react";
import { Blog, BlogState } from "../../types";
import style from "./PersonalBlogManage.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { getListBlogsByUserId } from "../../redux/slice/forumSlice";
import { BlogCard } from "../../components";
const cx = classNames.bind(style);

const PersonalBlogManage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [tabType, setTabType] = useState<BlogState>(BlogState.Pending);

  const userID = useSelector((state: RootState) => state.auth.userID);

  const initialTabList = {
    Pending: [] as Blog[],
    Posted: [] as Blog[],
    Canceled: [] as Blog[],
  };

  // get user list
  const list = useSelector((state: RootState) => state.forum.listUserBlogs);
  const [tabList, setTabList] = useState(initialTabList);

  console.log(list);

  useEffect(() => {
    if (userID)
      dispatch(getListBlogsByUserId(userID)).then(() => {
        setTabListItems();
      });
  }, [dispatch, userID]);

  const setTabListItems = () => {
    if (list && list.length > 0) {
      setTabList({
        Pending: list.filter((o) => o.state === BlogState.Pending),
        Posted: list.filter((o) => o.state === BlogState.Posted),
        Canceled: list.filter((o) => o.state === BlogState.Canceled),
      });
    }
  };

  const getListByType = (type: BlogState) => {
    switch (type) {
      case BlogState.Pending:
        return tabList.Pending;
      case BlogState.Posted:
        return tabList.Posted;
      case BlogState.Canceled:
        return tabList.Canceled;
      default:
        return tabList.Pending;
    }
  };

  return (
    <>
      <ul className={cx("tab-wrapper")}>
        <li
          className={cx("item", { "is-active": tabType === BlogState.Pending })}
          onClick={() => setTabType(BlogState.Pending)}
        >
          {BlogState[0]}
        </li>
        <li
          className={cx("item", { "is-active": tabType === BlogState.Posted })}
          onClick={() => setTabType(BlogState.Posted)}
        >
          {BlogState[1]}
        </li>
        <li
          className={cx("item", {
            "is-active": tabType === BlogState.Canceled,
          })}
          onClick={() => setTabType(BlogState.Canceled)}
        >
          {BlogState[2]}
        </li>
      </ul>
      <ul className={cx("list")}>
        {getListByType(tabType).map((item, index) => (
          <li key={index}>
            <BlogCard data={item} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default PersonalBlogManage;
