import { useState } from "react";
import classNames from "classnames/bind";
import style from "./IndexOnboarding.module.scss";
import { Input, Popup } from "../../../components";
import { TestEnum, LevelType } from "../../../types";
import { addOnboardingQuestion } from "../../../redux/slice/adminSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { useForm } from "react-hook-form";
const cx = classNames.bind(style);

interface CreateOnboardingFormProps {
  isDisplay: boolean;
  onClose: () => void;
  onReload: () => void;
}

const CreateOnboardingForm = ({
  isDisplay,
  onClose,
  onReload,
}: CreateOnboardingFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [audio, setAudio] = useState<any>();

  const { register, getValues, setValue, reset, handleSubmit } = useForm({
    defaultValues: {
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      question: {
        label: "",
        vnLabel: "",
        ques: "",
        keyword: "",
        paraph: "",
      },
      answer: "",
      type: TestEnum.TranslateToVN,
      level: LevelType.Beginner,
    },
  });

  const onSubmit = () => {
    dispatch(
      addOnboardingQuestion({
        id: "",
        options: [
          getValues("option1"),
          getValues("option2"),
          getValues("option3"),
          getValues("option4"),
        ],
        audio: audio ? audio : null,
        answer: getValues("answer"),
        type: getValues("type"),
        question: getValues("question"),
        level: getValues("level"),
      })
    );

    reset();
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
          label="VN Label"
          placeholder="fill vn label"
          register={register("question.vnLabel")}
          isRequired
        ></Input>
        <Input
          label="Question"
          placeholder="fill question"
          register={register("question.ques")}
        ></Input>
        {getValues("type") == TestEnum.FillInSentence && (
          <Input
            label="Keyword"
            placeholder={"#"}
            register={register("question.keyword")}
            isRequired
          ></Input>
        )}
        <Input
          label="Paraph"
          placeholder="fill paraph"
          register={register("question.paraph")}
        ></Input>
        <Input
          type="file"
          label={"Audio"}
          onChange={(e) => {
            if (e.target.files) setAudio(e.target.files[0]);
          }}
        ></Input>
        {audio && <audio controls src={URL.createObjectURL(audio)}></audio>}
        {getValues("type") != TestEnum.SortWords && (
          <>
            <Input
              label="Option 1"
              placeholder={"fill option 1"}
              register={register("option1")}
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

export default CreateOnboardingForm;
