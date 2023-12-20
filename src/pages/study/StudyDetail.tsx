import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getStudyCards,
  getStudyRoute,
  setStudyPathState,
  setStudyRouteState,
} from "../../redux/slice/studySlice";
import style from "./StudyDetail.module.scss";
import classNames from "classnames/bind";
import { Button } from "../../components";
import StudyDesc from "./StudyDesc";
import StudyCardDetail from "./StudyCard";
import { StudyCard } from "../../types";
import StudyFinish from "./StudyFinish";
import { HomeIcon } from "@heroicons/react/24/outline";
import { Col } from "react-flexbox-grid";
import { getAllSaved } from "../../redux/slice/savedSlice";
const cx = classNames.bind(style);

const StudyDetail = () => {
  let { id } = useParams();

  const userID = useSelector((state: RootState) => state.auth.userID) || "";

  const route = useSelector((state: RootState) => state.study.currentRoute);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [studyCards, setStudyCards] = useState<StudyCard[]>();
  const [currentCard, setCurrentCard] = useState<StudyCard>();
  const [currentCardIndex, setCurrentCardIndex] = useState<number>();
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getStudyRoute({ routeID: id, userID }));
      dispatch(getAllSaved(userID));
    }
  }, [dispatch, id]);

  const NextCard = () => {
    if (currentCardIndex && studyCards) {
      const nextIndex = currentCardIndex + 1;
      if (nextIndex <= studyCards.length) {
        setCurrentCardIndex(nextIndex);
        setCurrentCard(studyCards[currentCardIndex]);
      } else {
        setCurrentCard(undefined);
        setIsFinished(true);
        if (id) dispatch(setStudyRouteState({ routeID: id, userID }));
        if (route.isLast) dispatch(setStudyPathState(userID));
      }
    }
  };

  const PrevCard = () => {
    if (currentCardIndex && studyCards) {
      const prevIndex = currentCardIndex - 1;
      if (prevIndex > 0) {
        setCurrentCardIndex(prevIndex);
        setCurrentCard(studyCards[prevIndex - 1]);
      }
    }
  };

  return (
    <>
      <div className={cx("container", "wrapper")}>
        <Col xs={12} md={8} lg={6}>
          <p className={cx("title")}>Route {route.name}</p>
          {!studyCards && (
            <>
              <StudyDesc route={route}></StudyDesc>
              <Button
                isPrimary
                onClick={() => {
                  if (id)
                    dispatch(getStudyCards({ routeID: id, userID })).then(
                      (data) => {
                        setStudyCards(data.payload as StudyCard[]);
                        if (
                          data.payload &&
                          (data.payload as StudyCard[]).length > 0
                        ) {
                          setCurrentCard((data.payload as StudyCard[])[0]);
                          setCurrentCardIndex(1);
                        }
                      }
                    );
                }}
                className={cx("submit")}
                haveIcon
              >
                Start
              </Button>
            </>
          )}
          {currentCard && (
            <>
              <StudyCardDetail card={currentCard}></StudyCardDetail>
              <p className={cx("page-number")}>
                <span>{currentCardIndex}/</span>
                {studyCards?.length}
              </p>
              <div className={cx("cta")}>
                <Button
                  isPrimary={false}
                  onClick={() => PrevCard()}
                  icon="prev"
                ></Button>
                <Button
                  isPrimary={false}
                  onClick={() => NextCard()}
                  haveIcon
                ></Button>
              </div>
            </>
          )}
          {isFinished && studyCards && (
            <>
              <StudyFinish cards={studyCards}></StudyFinish>
              <div className={cx("cta-finish")}>
                <Button
                  isPrimary={false}
                  onClick={() => {
                    setStudyCards(undefined);
                    setIsFinished(false);
                  }}
                  className={cx("cta-finish-btn")}
                >
                  Xem lại
                </Button>
                <Button
                  isPrimary
                  onClick={() => {
                    navigate("exercise");
                  }}
                  icon="boilt"
                  className={cx("cta-finish-btn")}
                >
                  Luyện tập
                </Button>
              </div>
              <div className={cx("home")}>
                <HomeIcon
                  width={48}
                  height={48}
                  className={cx("home-icon")}
                  onClick={() => {
                    navigate("/");
                  }}
                ></HomeIcon>
              </div>
            </>
          )}
        </Col>
      </div>
    </>
  );
};

export default StudyDetail;
