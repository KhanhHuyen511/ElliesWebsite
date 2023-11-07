import { useEffect } from "react";
import { GameCard } from "../../../components";
import { Col } from "react-flexbox-grid";
import style from "../IndexPage.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAllGameRounds } from "../../../redux/slice/gameSlice";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);

const Index = () => {
  const rounds = useSelector((state: RootState) => state.game.rounds);
  const userID = useSelector((state: RootState) => state.auth.userID);

  const dispatch = useDispatch<AppDispatch>();
  const navigator = useNavigate();

  useEffect(() => {
    if (userID)
      dispatch(getAllGameRounds({ nameOfGame: "Go home!", userID: userID }));
  }, []);

  return (
    <div className="container">
      <Col xs={12} md={8} lg={6}>
        <p className={cx("page-title")}>Go Home!</p>
        <div className={cx("list")}>
          {rounds &&
            rounds.map((item, index) => (
              <GameCard
                key={index}
                title={`Round ${item.name}`}
                withCircle={index % 2 === 0}
                onClick={() => {
                  navigator(`./${item.id}`);
                }}
              />
            ))}
        </div>
      </Col>
    </div>
  );
};

export default Index;
