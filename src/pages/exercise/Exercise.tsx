import { useEffect } from "react";
import { Col } from "react-flexbox-grid";
import styles from "./Exercise.module.scss";
import classNames from "classnames/bind";
import { ExCard, UserExCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getListExsByLevel, getListUserExs } from "../../redux/slice/exSlice";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

const Exercise = () => {
  const userExs = useSelector((state: RootState) => state.ex.listUserExs);
  const exs = useSelector((state: RootState) => state.ex.listExs);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const userID = useSelector((state: RootState) => state.auth.userID) || "";

  useEffect(() => {
    dispatch(getListUserExs(userID));
    dispatch(getListExsByLevel(userID));
  }, [dispatch, userID]);

  return (
    <>
      <div className="container">
        <Col xs={12} md={8} lg={6}>
          <p className={cx("title")}>Luyện tập</p>
          <ul className={cx("")}>{}</ul>
          <p className={cx("sub-title")}>Từ vựng</p>
          <ul className={cx("list")}>
            {exs &&
              exs.length > 0 &&
              exs.map((item, index) => (
                <li key={index} className={cx("item")}>
                  <ExCard data={item} />
                </li>
              ))}
          </ul>
          <p className={cx("sub-title")}>Đã làm</p>
          <ul className={cx("list")}>
            {userExs &&
              userExs.length > 0 &&
              userExs.map((item, index) => (
                <li
                  key={index}
                  className={cx("item")}
                  onClick={() => navigate(`/exercise/result_detail/${item.id}`)}
                >
                  <UserExCard data={item} />
                </li>
              ))}
          </ul>
        </Col>
      </div>
    </>
  );
};

export default Exercise;
