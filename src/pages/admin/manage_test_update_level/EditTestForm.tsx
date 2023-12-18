import { useState } from "react";
import classNames from "classnames/bind";
import style from "./IndexTestUpdateLevel.module.scss";
import { Input, Popup } from "../../../components";
import { TestEnum, LevelType, TestType } from "../../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useForm } from "react-hook-form";
import { editTestQuestion } from "../../../redux/slice/adminSlice";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../firebase/config";
const cx = classNames.bind(style);

interface EditTestFormProps {
  isDisplay: boolean;
  onClose: () => void;
  onReload: () => void;
  data: TestType;
}

const EditTestForm = ({
  isDisplay,
  onClose,
  onReload,
  data: { options, question, answer, type, level, id, audio },
}: EditTestFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [fbAudio, setFbAudio] = useState<any>(
    audio &&
      getDownloadURL(ref(storage, `audios/${audio}`)).then((url) => {
        setFbAudio(url);
      })
  );

  const [newAudio, setNewAudio] = useState<any>();

  const { register, getValues, setValue, handleSubmit } = useForm({
    defaultValues: {
      option1: options[0],
      option2: options[1],
      option3: options[2],
      option4: options[3],
      question,
      answer,
      type,
      level,
      audio,
    },
  });

  const onSubmit = () => {
    dispatch(
      editTestQuestion({
        id,
        options: [
          getValues("option1"),
          getValues("option2"),
          getValues("option3"),
          getValues("option4"),
        ],
        answer: getValues("answer"),
        type: getValues("type"),
        question: getValues("question"),
        level: getValues("level"),
      })
    );

    onReload();
  };
  return (
    <>
      <Popup
        title={"Create new question"}
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
        isDisplay={isDisplay}
        classNames={cx("create-form")}
      >
        <p className={cx("sub-title")}>Question</p>
        <Input
          label="Label"
          placeholder="fill label"
          register={register("question.label")}
          isRequired
        ></Input>
        <Input
          label="Question"
          placeholder="fill question"
          register={register("question.ques")}
          isRequired
        ></Input>
        <Input
          type="file"
          label="Audio"
          onChange={(e) => {
            if (e.target.files) setNewAudio(e.target.files[0]);
          }}
        ></Input>
        {!newAudio && fbAudio && <audio controls src={fbAudio}></audio>}
        {newAudio && (
          <audio controls src={URL.createObjectURL(newAudio)}></audio>
        )}
        {getValues("type") == TestEnum.FillInSentence && (
          <Input
            label="Keyword"
            placeholder={"#"}
            register={register("question.keyword")}
            isRequired
          ></Input>
        )}
        {getValues("type") != TestEnum.SortWords && (
          <>
            <Input
              label="Option 1"
              placeholder={"fill option 1"}
              register={register("option1")}
              isRequired
            ></Input>
            <Input
              label="Option 2"
              placeholder={"fill option 2"}
              register={register("option2")}
            ></Input>
            <Input
              label="Option 3"
              placeholder={"fill option 3"}
              register={register("option3")}
            ></Input>
            <Input
              label="Option 4"
              placeholder={"fill option 4"}
              register={register("option4")}
            ></Input>
            <Input
              label={"Answer"}
              placeholder={"fill answer"}
              isRequired
              register={register("answer")}
            ></Input>
          </>
        )}
        Type
        <select
          defaultValue={getValues("type")}
          onChange={(e) => {
            setValue("type", e.target.value as unknown as TestEnum);
          }}
        >
          <option value={TestEnum.Basic}>{TestEnum[0]}</option>
          <option value={TestEnum.TranslateToVN}>{TestEnum[1]}</option>
          <option value={TestEnum.TranslateToEN}>{TestEnum[2]}</option>
          <option value={TestEnum.FillInSentence}>{TestEnum[3]}</option>
          <option value={TestEnum.SortWords}>{TestEnum[4]}</option>
          <option value={TestEnum.Audio}>{TestEnum[5]}</option>
        </select>
        Level
        <select
          defaultValue={getValues("level")}
          onChange={(e) => {
            setValue("level", e.target.value as unknown as LevelType);
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

export default EditTestForm;
