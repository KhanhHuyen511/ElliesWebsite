import React, { useEffect } from "react";
import classNames from "classnames/bind";
import style from "./BlogDetail.module.scss";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getABlog,
  removeALike,
  setAComment,
  setALike,
} from "../../redux/slice/forumSlice";
import { Comment } from "../../components";
import { BlogComment } from "../../types";
const cx = classNames.bind(style);

const BlogDetail = ({
  noComment,
  noLike,
}: {
  noComment?: boolean;
  noLike?: boolean;
}) => {
  let { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const userID = useSelector((state: RootState) => state.auth.userID);
  const data = useSelector((state: RootState) => state.forum.currentBlog);

  useEffect(() => {
    if (id) dispatch(getABlog(id));
  }, [dispatch, id, data?.comments?.length]);

  return (
    <div className="container">
      <p className={cx("title")}>{data?.title}</p>
      <div className={cx("blog-info")}>
        <span className={cx("author")}>{data?.userName}</span>
        <div className={cx("other-infos")}>
          <span className={cx("create-date")}>
            {data?.createDate?.toLocaleDateString()}
          </span>
          {!noLike && (
            <div className={cx("like-wrapper")}>
              <HandThumbUpIcon
                className={cx("like-icon", {
                  active: data?.likes?.find((o) => o.userId === userID),
                })}
                width={20}
                height={20}
                onClick={() => {
                  if (userID && id && userID !== data?.userId) {
                    if (
                      data?.likes?.find((o) => o.userId === userID) ===
                      undefined
                    )
                      dispatch(
                        setALike({
                          userId: userID,
                          id: "",
                          blogId: id,
                          createDate: new Date(),
                        })
                      );
                    else {
                      dispatch(
                        removeALike({
                          userId: userID,
                          id: "",
                          blogId: id,
                          createDate: new Date(),
                        })
                      );
                    }
                  }
                }}
              />
              <p className={cx("like-number")}>{data?.likes?.length}</p>
            </div>
          )}
        </div>
      </div>
      <p className={cx("summary")}>{data?.summary}</p>
      {data?.content && (
        <p
          dangerouslySetInnerHTML={{ __html: data?.content }}
          className={cx("content")}
        ></p>
      )}

      <p className={cx("keyword-wrapper")}>
        Keyword: <span className={cx("keyword")}>#{data?.keyword}</span>
      </p>

      {!noComment && (
        <div className={cx("comment-section")}>
          <p className={cx("sub-title")}>Comments</p>
          <ul className={cx("comments")}>
            <li>
              <Comment blogId={id}></Comment>
            </li>
            {data?.comments &&
              data.comments.map((item, index) => (
                <li key={index}>
                  <Comment data={item}></Comment>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
