import { useState } from "react";
import styles from "./Comment.module.scss";
import classNames from "classnames/bind";
import TextArea from "../textarea/TextArea";
import {
  CursorArrowRippleIcon,
  HandThumbUpIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { BlogComment } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  pinAComment,
  removeAComment,
  setAComment,
  unPinAComment,
} from "../../redux/slice/forumSlice";
const cx = classNames.bind(styles);

interface Prop {
  data?: BlogComment;
  blogId?: string;
}

const Comment = (prop: Prop) => {
  // onClear

  const dispatch = useDispatch<AppDispatch>();

  const userID = useSelector((state: RootState) => state.auth.userID);
  const userName = useSelector((state: RootState) => state.auth.userName);
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const [content, setContent] = useState("");

  const [isPinned, setIsPinned] = useState(prop.data?.isPinned);

  const DeleteComment = () => {
    if (prop.data) dispatch(removeAComment(prop.data));
  };

  const PinComment = async () => {
    if (prop.data) {
      if (!isPinned)
        dispatch(pinAComment(prop.data)).then(() => setIsPinned(true));
      else dispatch(unPinAComment(prop.data)).then(() => setIsPinned(false));
    }
  };

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("info")}>
          <div className={cx("author-wrapper")}>
            <div
              className={cx("avatar")}
              // onClick={() => navigate('/profile')}
            >
              <img
                src="/images/avatar.png"
                className={cx("avatar-img")}
                alt=""
              />
            </div>
            <p className={cx("author")}>
              {prop.data === undefined ? userName : prop.data.userName}
            </p>
          </div>
          <p className={cx("create-date")}>
            {prop.data
              ? prop.data?.createDate.toLocaleDateString()
              : Date.now().toLocaleString()}
          </p>
        </div>
        <TextArea
          label=""
          value={prop.data ? prop.data.content : content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="Nhập bình luận"
          isDisabled={prop.data !== undefined}
          classNames={cx("textarea", { empty: prop.data === undefined })}
        />
        <div className={cx("foot-section")}>
          {prop.data === undefined ? (
            <PaperAirplaneIcon
              width={24}
              height={24}
              onClick={() => {
                if (prop.blogId && userID && content !== "")
                  dispatch(
                    setAComment({
                      id: "",
                      userId: userID,
                      blogId: prop.blogId,
                      content: content,
                      liked: 0,
                      createDate: new Date(),
                    })
                  ).then(() => setContent(""));
              }}
              className={cx("send-icon")}
            />
          ) : (
            <>
              {isPinned && <p className={cx("pinned")}>pinned</p>}
              <div className={cx("action-wrapper")}>
                {userRole === "admin" && (
                  <div className={cx("icon-wrapper")}>
                    <XMarkIcon
                      className={cx("delete-icon")}
                      width={20}
                      height={20}
                      onClick={DeleteComment}
                    />
                    <CursorArrowRippleIcon
                      className={cx("pin-icon")}
                      width={20}
                      height={20}
                      onClick={PinComment}
                    />
                  </div>
                )}
                <div className={cx("like-wrapper")}>
                  <HandThumbUpIcon
                    className={cx("like-icon")}
                    width={20}
                    height={20}
                  />
                  <p className={cx("like-number")}>{prop.data.liked}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Comment;
