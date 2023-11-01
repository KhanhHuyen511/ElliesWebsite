import React, { useEffect, useState } from "react";
import Description from "./Description";
import { useParams } from "react-router-dom";
import Start from "./Start";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { getAGameRound } from "../../../redux/slice/gameSlice";

const Detail = () => {
  let { id } = useParams();
  const [isFinished, setIsFinished] = useState(false);
  const [isStart, setIsStart] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(
        getAGameRound({
          nameOfGame: "Go home!",
          id: id,
        })
      );
    }
  }, []);

  return <div>{!isStart ? <Description /> : <Start />}</div>;
};

export default Detail;
