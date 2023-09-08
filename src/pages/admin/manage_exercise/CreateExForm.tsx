import React, { useState } from "react";
import { Input, Popup } from "../../../components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { setExercise } from "../../../redux/slice/adminSlice";
import { LevelType } from "../../../types";

interface Props {
  classNames?: string;
  onClose: () => void;
  isDisplay: boolean;
}

const CreateExForm = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState<LevelType>(LevelType.Beginner);

  return (
    <>
      <Popup
        title={"Tạo bài luyện tập mới"}
        classNames={""}
        onClose={props.onClose}
        onSubmit={() => {
          dispatch(
            setExercise({ data: { id: "", title, description, level } })
          );
        }}
        isDisplay={props.isDisplay}
      >
        <Input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          label={"Chủ đề"}
          placeholder={"abc"}
        ></Input>
        <Input
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          label={"Mô tả"}
          placeholder={"abc"}
        />
        <select
          defaultValue={level}
          // className={cx("filter-type")}
          onChange={(e) => {
            setLevel(e.target.value as unknown as LevelType);
          }}
        >
          <option value={LevelType.Beginner}>{LevelType[0]}</option>
          <option value={LevelType.Intermediate}>{LevelType[1]}</option>
          <option value={LevelType.Advanced}>{LevelType[2]}</option>
        </select>
      </Popup>
    </>
  );
};

export default CreateExForm;
