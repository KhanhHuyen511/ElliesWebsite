import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./PendingBlogCard.module.scss";
import { Blog } from "../../types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getStudentName } from "../../redux/slice/studentSlice";
const cx = classNames.bind(style);

const PendingBlogCard = ({ data }: { data: Blog }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [userName, setUserName] = useState("");

  // const userID = useSelector((state: RootState) => state.auth.userID);

  useEffect(() => {
    dispatch(getStudentName(data.userId)).then((action) => {
      setUserName(action.payload as string);
    });
  }, [data.userId, dispatch]);

  return (
    <>
      <div
        className={cx("card")}
        onClick={() => navigate(`/pending_blog_detail/${data.id}`)}
      >
        <p className={cx("card-title")}>{data.title}</p>
        <div className={cx("card-body")}>
          <div className={cx("card-content")}>
            {data.summary && (
              <p
                className={cx("card-desc")}
                dangerouslySetInnerHTML={{ __html: data.summary }}
              ></p>
            )}
            <div className={cx("bottom-wrapper")}>
              <div className={cx("blogger-wrapper")}>
                <p>Blogger:</p>
                <span className={cx("username")}>{userName}</span>
              </div>
              <p className={cx("card-date")}>
                {data.createDate?.toLocaleDateString()}
                <span className={cx("card-keyword-wrapper")}>
                  Từ khoá:{" "}
                  <span className={cx("keyword")}>#{data.keyword}</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingBlogCard;
