import { useEffect } from "react";
import { Col } from "react-flexbox-grid";
import styles from "./Exercise.module.scss";
import classNames from "classnames/bind";
import { ExCard, UserExCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getExAgain,
  getListExsByLevel,
  getListUserExs,
} from "../../redux/slice/exSlice";
import { useNavigate } from "react-router-dom";
import { Ex, ExState, UserEx } from "../../types";
import { getTimes } from "../../utils/utils";
const cx = classNames.bind(styles);

const Exercise = () => {
  const userExs = useSelector((state: RootState) => state.ex.listUserExs);
  const exs = useSelector((state: RootState) => state.ex.listExs);
  const exAgain = useSelector((state: RootState) => state.ex.currentExAgain);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const userID = useSelector((state: RootState) => state.auth.userID) || "";

  useEffect(() => {
    dispatch(getListUserExs(userID));
    dispatch(getListExsByLevel(userID));
    dispatch(getExAgain(userID));
  }, [dispatch, userID]);

  const checkUserExs = (item: Ex) => {
    let itemUserExs = userExs?.filter((i: UserEx) => i.ex.id === item.id);

    itemUserExs = itemUserExs?.sort(
      (a, b) => getTimes(a.didDate) - getTimes(b.didDate)
    );

    if (itemUserExs && itemUserExs[itemUserExs.length - 1]) {
      const lastItem = itemUserExs[itemUserExs.length - 1];
      const itemState = lastItem.state;

      if (itemState !== undefined) {
        console.log(itemState);
        return itemState;
      }
    }

    return ExState.Normal;
  };

  return (
    <>
      <div className="container">
        <Col xs={12} md={8} lg={6}>
          <p className={cx("title")}>Luyện tập</p>
          <ul className={cx("")}>{}</ul>
          <p className={cx("sub-title")}>Topics</p>
          <ul className={cx("list")}>
            {exs &&
              exs.length > 0 &&
              exs.map((item, index) => (
                <li key={index} className={cx("item")}>
                  <ExCard data={item} state={checkUserExs(item)} />
                </li>
              ))}
          </ul>
          <p className={cx("sub-title")}>Do wrong sentences</p>
          <ul className={cx("list")}>
            {exAgain !== undefined && (
              <li className={cx("item")}>
                <ExCard data={exAgain} state={ExState.DoAgain} />
              </li>
            )}
          </ul>
          <p className={cx("sub-title")}>History</p>
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
