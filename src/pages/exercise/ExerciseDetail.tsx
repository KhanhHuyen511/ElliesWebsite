import { useEffect, useState } from "react";
import style from "./ExerciseDetail.module.scss";
import classNames from "classnames/bind";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Ex, ExAgain, ExDetail } from "../../types";
import { Button } from "../../components";
import ExDesc from "./ExDesc";
import ExerciseChild from "./ExerciseChild";
import ExerciseFinish from "./ExerciseFinish";
import {
  getAEx,
  getExAgain,
  setCompleteExState,
} from "../../redux/slice/exSlice";
const cx = classNames.bind(style);

const ExerciseDetail = () => {
  let { id, is_again } = useParams();

  const userID = useSelector((state: RootState) => state.auth.userID) || "";
  const completeID = useSelector((state: RootState) => state.ex.completeID);

  const data1 = useSelector((state: RootState) => state.ex.currentEx);
  const data2 = useSelector((state: RootState) => state.ex.currentExAgain);

  const [currentExDetail, setCurrentExDetail] = useState<ExDetail>();
  const [currentExDetailIndex, setCurrentExDetailIndex] = useState<number>();
  const dispatch = useDispatch<AppDispatch>();
  const [isPrepare, setIsPrepare] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [userExs, setUserExs] = useState<ExDetail[]>();
  const [data, setData] = useState<Ex | ExAgain>();

  const navigate = useNavigate();

  useEffect(() => {
    if (id && is_again !== undefined) {
      if (is_again === "false") {
        dispatch(getAEx(id));
        setData(data1);
      } else {
        dispatch(getExAgain(id));
        setData(data2);
      }
    }
  }, [dispatch, id]);

  const Next = () => {
    if (currentExDetailIndex && data?.listItems) {
      const nextIndex = currentExDetailIndex + 1;
      if (nextIndex <= data?.listItems.length) {
        setCurrentExDetailIndex(nextIndex);
        setCurrentExDetail(data.listItems[currentExDetailIndex]);
      } else {
        setCurrentExDetail(undefined);
        setIsFinished(true);
      }
    }
  };

  const UpdateToResult = (result?: ExDetail) => {
    if (result) {
      if (!userExs) setUserExs([result]);
      else setUserExs([...userExs, result]);
    }

    if (
      data?.listItems?.length &&
      userExs &&
      result &&
      id &&
      userExs?.length === data?.listItems?.length - 1
    ) {
      dispatch(
        setCompleteExState({
          resultList: [...userExs, result],
          exId:
            is_again === "false"
              ? data.id
              : (data as ExAgain).exId
              ? (data as ExAgain).exId
              : "",
          userID,
          title: data.title,
          id: data.id,
        })
      );
    }

    if (data?.listItems?.length === 1 && result && id) {
      dispatch(
        setCompleteExState({
          resultList: [result],
          exId:
            is_again === "false"
              ? data.id
              : (data as ExAgain).exId
              ? (data as ExAgain).exId
              : "",
          userID,
          title: data.title,
          id: data.id,
        })
      );
    }
  };

  return (
    <>
      <div className="container">
        {isPrepare && <p className={cx("title")}>Luyện tập - {data?.title}</p>}
        {isPrepare && data !== undefined && (
          <>
            <ExDesc data={data}></ExDesc>
            <Button
              isPrimary
              onClick={() => {
                if (id && data && data.listItems && data.listItems.length > 0) {
                  setCurrentExDetail(data.listItems[0]);
                  setCurrentExDetailIndex(1);
                  setIsPrepare(false);
                }
              }}
              className={cx("submit")}
            >
              Bắt đầu
            </Button>
          </>
        )}
        {currentExDetail && (
          <>
            <ExerciseChild
              data={currentExDetail}
              onNext={(result) => {
                UpdateToResult(result);
                Next();
              }}
            ></ExerciseChild>
            <p className={cx("page-number")}>
              <span>{currentExDetailIndex}/</span>
              {data?.listItems?.length}
            </p>
          </>
        )}
        {isFinished && userExs && (
          <>
            <ExerciseFinish data={userExs}></ExerciseFinish>
            <div className={cx("cta-finish")}>
              <Button
                isPrimary={false}
                onClick={() => {
                  setIsFinished(false);
                  setUserExs(undefined);
                  setIsPrepare(true);
                }}
                className={cx("cta-finish-btn")}
              >
                Làm lại
              </Button>
              <Button
                isPrimary
                onClick={() => {
                  navigate(`/exercise/result_detail/${completeID}`);
                }}
                className={cx("cta-finish-btn")}
              >
                Xem kết quả chi tiết
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ExerciseDetail;
