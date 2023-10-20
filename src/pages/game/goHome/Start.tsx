import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAGameRound } from "../../../redux/slice/gameSlice";

const Start = () => {
  const dispatch = useDispatch<AppDispatch>();

  const round = useSelector((state: RootState) => state.game.currentRound);

  useEffect(() => {
    dispatch(
      getAGameRound({
        nameOfGame: "Go home!",
        id: "b4cXJeCpfDnM5KCTDqyf",
      })
    );
  }, []);

  console.log(round);

  return <div>Start</div>;
};

export default Start;
