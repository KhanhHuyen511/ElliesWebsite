import React from "react";
import classNames from "classnames/bind";
import style from "./IndexOnboarding.module.scss";
import { Input, Popup } from "../../../components";
import { GameType, LevelType, OnboardingType } from "../../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useForm } from "react-hook-form";
import { editOnboardingQuestion } from "../../../redux/slice/adminSlice";
const cx = classNames.bind(style);

interface EditOnboardingFormProps {
  isDisplay: boolean;
  onClose: () => void;
  onReload: () => void;
  data: OnboardingType;
}

const EditOnboardingForm = ({
  isDisplay,
  onClose,
  onReload,
  data: { options, question, answer, type, level, id },
}: EditOnboardingFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

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
    },
  });

  const onSubmit = () => {
    dispatch(
      editOnboardingQuestion({
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
        {getValues("type") == GameType.FillInSentence && (
          <Input
            label="Keyword"
            placeholder={"#"}
            register={register("question.keyword")}
            isRequired
          ></Input>
        )}
        {getValues("type") != GameType.SortWords && (
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
            setValue("type", e.target.value as unknown as GameType);
          }}
        >
          <option value={GameType.TranslateToVN}>{GameType[0]}</option>
          <option value={GameType.TranslateToEN}>{GameType[1]}</option>
          <option value={GameType.TranslateSentenceToVN}>{GameType[2]}</option>
          <option value={GameType.TranslateSentenceToEN}>{GameType[3]}</option>
          <option value={GameType.FillInSentence}>{GameType[4]}</option>
          <option value={GameType.SortWords}>{GameType[5]}</option>
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

export default EditOnboardingForm;
