import { useState } from "react";
import { Input } from "../../../components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { StudyCard, StudyCardType } from "../../../types";
import Popup from "../../../components/popup/Popup";
import { updateDocCard } from "../../../redux/slice/adminSlice";
import style from "./IndexDocument.module.scss";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../firebase/config";
import { useForm } from "react-hook-form";

const EditVocabForm = ({
  vocab,
  onClose,
  isDisplay,
  type,
  onReload,
}: {
  vocab: StudyCard;
  onClose: () => void;
  isDisplay: boolean;
  type: StudyCardType;
  onReload?: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

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

  const [newAudio, setNewAudio] = useState<any>();
  const [newImage, setNewImage] = useState<any>();

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      display: vocab.display || "",
      meaning: vocab.meaning || "",
    },
  });

  const onSubmit = async () => {
    await dispatch(
      updateDocCard({
        data: {
          id: vocab.id,
          display: getValues("display"),
          meaning: getValues("meaning"),
          imageFile: newImage,
          audio: newAudio,
        },
        oldImage: vocab.imageFile,
        oldAudio: vocab.audio,
        type: type,
      })
    );

    onReload && onReload();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Popup
        title={`Edit - ${vocab.display}`}
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
        isDisplay={isDisplay}
      >
        <Input
          type="text"
          label="Display"
          placeholder={"fill display"}
          register={register("display")}
        ></Input>
        <Input
          type="text"
          label={"Meaning"}
          placeholder={"fill meaning"}
          register={register("meaning")}
        ></Input>
        <Input
          type="file"
          label="Image"
          placeholder={""}
          onChange={(e) => {
            if (e.target.files) setNewImage(e.target.files[0]);
          }}
        ></Input>
        {!newImage && image && (
          <div className={style.image}>
            <img src={image} alt="" />
          </div>
        )}
        {newImage && (
          <div className={style.image}>
            <img src={URL.createObjectURL(newImage)} alt=""></img>
          </div>
        )}
        <Input
          type="file"
          label="Audio"
          placeholder={""}
          onChange={(e) => {
            if (e.target.files) setNewAudio(e.target.files[0]);
          }}
        ></Input>
        {!newAudio && audio && <audio controls src={audio}></audio>}
        {newAudio && (
          <audio controls src={URL.createObjectURL(newAudio)}></audio>
        )}
      </Popup>
    </>
  );
};

export default EditVocabForm;
