import { useState } from "react";
import { Input } from "../../../components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { StudyCard, StudyCardType } from "../../../types";
import Popup from "../../../components/popup/Popup";
import { removeDocCard } from "../../../redux/slice/adminSlice";
import style from "./IndexDocument.module.scss";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../firebase/config";
import { useForm } from "react-hook-form";

const RemoveVocabForm = ({
  vocab,
  docId,
  onClose,
  isDisplay,
  type,
  onReload,
}: {
  vocab: StudyCard;
  docId: string;
  onClose: () => void;
  isDisplay: boolean;
  type: StudyCardType;
  onReload?: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      display: vocab.display || "",
      meaning: vocab.meaning || "",
      image: vocab.imageFile,
      audio: vocab.audio,
    },
  });

  const onSubmit = async () => {
    await dispatch(removeDocCard({ docId: docId, data: vocab, type: type }));

    onReload && onReload();
  };

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

  const handleClose = () => {
    setTimeout(() => onClose(), 250);
  };

  return (
    <>
      <Popup
        title={`Delete - ${vocab.display}`}
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
        isDisplay={isDisplay}
      >
        <Input
          type="text"
          register={register("display")}
          label={"Display"}
          isDisabled
        ></Input>
        <Input
          type="text"
          register={register("meaning")}
          label={"Meaning"}
          isDisabled
        ></Input>
        <Input
          type="file"
          label={"Image"}
          register={register("image")}
          isDisabled
        ></Input>
        {getValues("image") && (
          <div className={style.image}>
            <img src={image} alt="" />
          </div>
        )}
        <Input type="file" label={"Audio"} register={register("audio")}></Input>
        {getValues("audio") && <audio controls src={audio}></audio>}
      </Popup>
    </>
  );
};

export default RemoveVocabForm;
