import React from "react";
import { Input } from "../../../components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import {
  removeStudyPath,
  removeStudyRoute,
} from "../../../redux/slice/adminSlice";
import { StudyPath } from "../../../types";
import Popup from "../../../components/popup/Popup";

interface Props {
  classNames?: string;
  onClose: () => void;
  pathID: string;
  data: StudyPath;
  isDisplay: boolean;
}

const RemovePathForm = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  console.log(props.pathID);

  return (
    <>
      <Popup
        classNames={""}
        title={"Xóa lộ trình"}
        onClose={props.onClose}
        onSubmit={() => {
          if (props.data.id) {
            dispatch(
              removeStudyPath({
                path_id: props.pathID,
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
          value={props.data.topic}
          onChange={() => {}}
          label={"Chủ đề"}
          placeholder={"abc"}
          isDisabled
        ></Input>
        <Input
          type="text"
          value={props.data.level}
          onChange={() => {}}
          label={"Cấp độ"}
          placeholder={"abc"}
          isDisabled
        ></Input>
      </Popup>
    </>
  );
};

export default RemovePathForm;
