import { useState } from "react";
import { Input } from "../../../components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { StudyCard, StudyCardType } from "../../../types";
import Popup from "../../../components/popup/Popup";
import { removeDocCard, updateDocCard } from "../../../redux/slice/adminSlice";
import style from "./IndexDocument.module.scss";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../firebase/config";
import React from "react";

const RemoveVocabForm = ({
  vocab,
  docId,
  onClose,
  isDisplay,
  type,
}: {
  vocab: StudyCard;
  docId: string;
  onClose: () => void;
  isDisplay: boolean;
  type: StudyCardType;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [display, setDisplay] = useState<string>(
    vocab.display ? vocab.display : ""
  );
  const [meaning, setMeaning] = useState<string>(
    vocab.meaning ? vocab.meaning : ""
  );
  const [image, setImage] = useState<any>(
    vocab.imageFile &&
      getDownloadURL(ref(storage, `images/${vocab.imageFile}`)).then((url) => {
        setImage(url);
      })
  );

  const [audio, setAudio] = useState<any>(
    vocab.audio &&
      getDownloadURL(ref(storage, `audios/${vocab.audio}`)).then((url) => {
        setAudio(url);
      })
  );

  return (
    <>
      <Popup
        classNames={""}
        title={"Xóa"}
        onClose={onClose}
        onSubmit={() => {
          dispatch(removeDocCard({ docId: docId, data: vocab, type: type }));
        }}
        isDisplay={isDisplay}
      >
        <Input
          type="text"
          value={display}
          onChange={(e) => {
            setDisplay(e.target.value);
          }}
          label={"Tiếng Anh"}
          placeholder={"abc"}
          isDisabled
        ></Input>
        <Input
          type="text"
          value={meaning}
          onChange={(e) => {
            setMeaning(e.target.value);
          }}
          label={"Nghĩa"}
          placeholder={"abc"}
          isDisabled
        ></Input>
        <Input
          type="file"
          label={"Cập nhật ảnh"}
          placeholder={""}
          onChange={() => {}}
          isDisabled
        ></Input>
        {image && (
          <div className={style.image}>
            <img src={image} alt="" />
          </div>
        )}
        <Input
          type="file"
          label={"Cập nhật âm thanh"}
          placeholder={""}
          onChange={(e) => {}}
        ></Input>
        {audio && <audio controls src={audio}></audio>}
      </Popup>
    </>
  );
};

export default RemoveVocabForm;
