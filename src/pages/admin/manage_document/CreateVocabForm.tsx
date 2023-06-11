import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Input, TextArea } from "../../../components";
import Popup from "../../../components/popup/Popup";
import { setDocCard } from "../../../redux/slice/adminSlice";
import { AppDispatch } from "../../../redux/store";
import { StudyCardType } from "../../../types";
import style from "./IndexDocument.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

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

  const onClear = () => {
    console.log("clear");
    setDisplay("");
    setMeaning("");
    setAudio(undefined);
    setImage(undefined);
  };

  // useEffect(() => onClear, []);

  return (
    <>
      <Popup
        title={"Tạo từ vựng mới"}
        classNames={""}
        onClose={() => {
          props.onClose();
          onClear();
        }}
        onSubmit={() => {
          dispatch(
            setDocCard({
              data: {
                display,
                meaning,
                imageFile: image,
                audio,
              },
              type: props.type,
              doc_id: props.doc_id,
            })
          );
          onClear();
        }}
        isDisplay={props.isDisplay}
      >
        {props.type === StudyCardType.Paraph ? (
          <>
            <TextArea
              label={"Display"}
              placeholder={""}
              onChange={(e) => setDisplay(e.target.value)}
              classNames={cx("paraph-text")}
            />
            <TextArea
              label={"Meaning"}
              placeholder={""}
              onChange={(e) => setMeaning(e.target.value)}
              classNames={cx("paraph-text")}
            />
          </>
        ) : (
          <>
            <Input
              type="text"
              onChange={(e) => {
                setDisplay(e.target.value);
              }}
              value={display}
              label={"Display"}
              placeholder={"abc"}
            ></Input>
            <Input
              type="text"
              value={meaning}
              onChange={(e) => {
                setMeaning(e.target.value);
              }}
              label={"Meaning"}
              placeholder={"abc"}
            ></Input>
          </>
        )}

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
