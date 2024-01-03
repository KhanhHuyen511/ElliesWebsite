import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, TextArea } from "../../../components";
import Popup from "../../../components/popup/Popup";
import { setDocCard } from "../../../redux/slice/adminSlice";
import { AppDispatch } from "../../../redux/store";
import { StudyCardType } from "../../../types";
import style from "./IndexDocument.module.scss";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
const cx = classNames.bind(style);

interface Props {
  classNames?: string;
  onClose: () => void;
  onReload?: () => void;
  isDisplay: boolean;
  type: StudyCardType;
  doc_id: string;
}

const CreateVocabForm = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [image, setImage] = useState<any>();
  const [audio, setAudio] = useState<any>();

  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      display: "",
      meaning: "",
    },
  });

  const onSubmit = async () => {
    await dispatch(
      setDocCard({
        data: {
          display: getValues("display"),
          meaning: getValues("meaning"),
          imageFile: image,
          audio: audio,
        },
        type: props.type,
        doc_id: props.doc_id,
      })
    );

    reset();
    props.onReload && props.onReload();
  };

  return (
    <>
      <Popup
        title={`Create new ${
          props.type === StudyCardType.Vocab ? "vocab" : "sentence"
        }`}
        classNames={""}
        onClose={() => {
          props.onClose();
        }}
        onSubmit={handleSubmit(onSubmit)}
        isDisplay={props.isDisplay}
      >
        {props.type === StudyCardType.Paraph ? (
          <>
            <TextArea
              label={"Display"}
              placeholder={""}
              classNames={cx("paraph-text")}
              register={register("display")}
            />
            <TextArea
              label={"Meaning"}
              placeholder={""}
              classNames={cx("paraph-text")}
              register={register("meaning")}
            />
          </>
        ) : (
          <>
            <Input
              type="text"
              label={"Display"}
              placeholder={"fill display"}
              register={register("display")}
            ></Input>
            <Input
              type="text"
              label={"Meaning"}
              placeholder={"fill meaning"}
              register={register("meaning")}
            ></Input>
          </>
        )}

        <Input
          type="file"
          label={"Image"}
          placeholder={""}
          onChange={(e) => {
            if (e.target.files) setImage(e.target.files[0]);
          }}
        ></Input>
        {image !== undefined && (
          <div className={style.image}>
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
        <Input
          type="file"
          label={"Audio"}
          placeholder={""}
          onChange={(e) => {
            if (e.target.files) setAudio(e.target.files[0]);
          }}
        ></Input>
        {audio && <audio controls src={URL.createObjectURL(audio)}></audio>}
      </Popup>
    </>
  );
};

export default CreateVocabForm;
