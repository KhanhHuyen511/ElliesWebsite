import React from "react";
import Description from "./Description";
import { useParams } from "react-router-dom";

const Detail = () => {
  let { id } = useParams();

  return <div>{id && <Description />}</div>;
};

export default Detail;
