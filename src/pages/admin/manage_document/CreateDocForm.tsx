import React, { useState } from "react";
import { StudyCardType } from "../../../types";
import { Input, Popup } from "../../../components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { setDocument } from "../../../redux/slice/adminSlice";

interface Props {
  classNames?: string;
  onClose: () => void;
  isDisplay: boolean;
  type: StudyCardType;
}

const CreateDocForm = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <>
      <Popup
        title={"Tạo chủ đề mới"}
        classNames={""}
        onClose={props.onClose}
        onSubmit={() => {
          dispatch(setDocument({ data: { id: "", title, description } }));
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
        ></Input>
      </Popup>
    </>
  );
};

export default CreateDocForm;
