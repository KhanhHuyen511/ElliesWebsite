import React, { useState } from "react";
import { Button, Input } from "../../../components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { setStudyPath } from "../../../redux/slice/adminSlice";
import { StudyRoute } from "../../../types";
import Popup from "../../../components/popup/Popup";

interface Props {
  classNames?: string;
  onClose: () => void;
  isDisplay: boolean;
}

const CreateStudyForm = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [topic, setTopic] = useState("");

  return (
    <>
      <Popup
        classNames={""}
        title={"Tao moi lo trinh hoc"}
        onClose={props.onClose}
        onSubmit={() => dispatch(setStudyPath({ name, topic, level }))}
        isDisplay={props.isDisplay}
      >
        <Input
          label="Tên"
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="abc"
        />
        <Input
          label="Chủ đề"
          type="text"
          onChange={(e) => {
            setTopic(e.target.value);
          }}
          placeholder="abc"
        />
        <Input
          label="Cấp độ"
          type="text"
          onChange={(e) => {
            setLevel(e.target.value);
          }}
          placeholder="abc"
        />
      </Popup>
    </>
  );
};

export default CreateStudyForm;
