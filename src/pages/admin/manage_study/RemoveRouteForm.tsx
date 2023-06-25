import React, { useState } from "react";
import { Button, Input } from "../../../components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import {
  setStudyCard,
  removeStudyCard,
  removeStudyRoute,
} from "../../../redux/slice/adminSlice";
import { StudyCard, StudyRoute } from "../../../types";
import Popup from "../../../components/popup/Popup";

interface Props {
  classNames?: string;
  onClose: () => void;
  pathID: string;
  routeID: string;
  data: StudyRoute;
  isDisplay: boolean;
}

const RemoveRouteForm = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Popup
        classNames={""}
        title={"Xóa chặng"}
        onClose={props.onClose}
        onSubmit={() => {
          if (props.data.id) {
            dispatch(
              removeStudyRoute({
                path_id: props.pathID,
                route_id: props.routeID,
              })
            );
          }
        }}
        isDisplay={props.isDisplay}
      >
        <Input
          type="text"
          value={props.data.name}
          onChange={() => {}}
          label={"Tên"}
          placeholder={"abc"}
          isDisabled
        ></Input>
        <Input
          type="text"
          value={props.data.cards?.length.toString()}
          onChange={() => {}}
          label={"Số lượng từ/câu"}
          placeholder={"abc"}
          isDisabled
        ></Input>
      </Popup>
    </>
  );
};

export default RemoveRouteForm;
