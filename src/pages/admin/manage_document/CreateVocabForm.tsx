import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Input } from "../../../components";
import Popup from "../../../components/popup/Popup";
import { setSentence, setVocab } from "../../../redux/slice/adminSlice";
import { AppDispatch } from "../../../redux/store";
import { StudyCardType } from "../../../types";
import style from "./IndexDocument.module.scss";

interface Props {
  classNames?: string;
  onClose: () => void;
  isDisplay: boolean;
  type: StudyCardType;
  doc_id: string;
}

const CreateVocabForm = (props: Props) => {
  const [display, setDisplay] = useState<string>("");
  const [meaning, setMeaning] = useState<string>("");
  const [image, setImage] = useState<any>();
  const [audio, setAudio] = useState<any>();

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Popup
        title={"Tạo từ vựng mới"}
        classNames={""}
        onClose={props.onClose}
        onSubmit={() => {
          if (props.type === StudyCardType.Vocab) {
            dispatch(
              setVocab({
                data: {
                  display,
                  meaning,
                  imageFile: image,
                  audio,
                },
                type: StudyCardType.Vocab,
                doc_id: props.doc_id,
              })
            );
          } else if (props.type === StudyCardType.Sentence) {
            dispatch(
              setSentence({
                data: {
                  display,
                  meaning,
                  imageFile: image,
                  audio,
                },
                type: StudyCardType.Sentence,
                doc_id: props.doc_id,
              })
            );
          }
        }}
        isDisplay={props.isDisplay}
      >
        <Input
          type="text"
          onChange={(e) => {
            setDisplay(e.target.value);
          }}
          label={"Display"}
          placeholder={"abc"}
        ></Input>
        <Input
          type="text"
          onChange={(e) => {
            setMeaning(e.target.value);
          }}
          label={"Meaning"}
          placeholder={"abc"}
        ></Input>

        <Input
          type="file"
          label={"Thêm ảnh"}
          placeholder={""}
          onChange={(e) => {
            if (e.target.files) setImage(e.target.files[0]);
          }}
        ></Input>
        {image && (
          <div className={style.image}>
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
        <Input
          type="file"
          label={"Thêm âm thanh"}
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
