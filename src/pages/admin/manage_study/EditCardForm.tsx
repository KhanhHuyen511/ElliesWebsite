import React, { useState } from "react";
import { Button, Input } from "../../../components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { setStudyCard, removeStudyCard } from "../../../redux/slice/adminSlice";
import { StudyCard } from "../../../types";
import Popup from "../../../components/popup/Popup";

interface Props {
  classNames?: string;
  onClose: () => void;
  pathID: string;
  routeID: string;
  data: StudyCard;
  isDisplay: boolean;
}

const EditCardForm = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Popup
        classNames={""}
        title={"Chỉnh sửa câu"}
        onClose={props.onClose}
        onSubmit={() => {
          if (props.data.id) {
            dispatch(
              removeStudyCard({
                path_id: props.pathID,
                route_id: props.routeID,
                card_id: props.data.id,
              })
            );
          }
        }}
        isDisplay={props.isDisplay}
      >
        <Input
          type="text"
          value={props.data.display}
          onChange={() => {}}
          label={"Display"}
          placeholder={"abc"}
          isDisabled
        ></Input>
        <Input
          type="text"
          value={props.data.meaning}
          onChange={() => {}}
          label={"Meaning"}
          placeholder={"abc"}
          isDisabled
        ></Input>
      </Popup>
    </>
  );
};

export default EditCardForm;
