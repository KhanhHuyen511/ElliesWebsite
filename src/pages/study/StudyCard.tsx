import { useState } from "react";
import style from "./StudyCard.module.scss";
import classNames from "classnames/bind";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
import { StudyCard } from "../../types";
import { HeartIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addToSaved, removeFromSaved } from "../../redux/slice/savedSlice";
const cx = classNames.bind(style);

const StudyCardDetail = ({ card }: { card: StudyCard }) => {
  const [img, setImg] = useState("");
  const [audio, setAudio] = useState("");

  if (card.imageFile)
    getDownloadURL(ref(storage, `images/${card.imageFile}`)).then((url) => {
      setImg(url);
    });

  if (card.audio)
    getDownloadURL(ref(storage, `audios/${card.audio}`)).then((url) => {
      setAudio(url);
    });

  const playAudio = () => {
    var sound = new Audio(audio);
    sound.play();
  };

  const dispatch = useDispatch<AppDispatch>();

  const userID = useSelector((state: RootState) => state.auth.userID);

  const userSaved = useSelector((state: RootState) => state.saved.savedList);

  const checkSaved = () => {
    if (userID && card.id)
      return userSaved.find((o) => o.id === card.id) !== undefined;
  };

  const [isSaved, setIsSaved] = useState(checkSaved);

  const addToSavedSection = () => {
    if (userID) {
      dispatch(addToSaved({ userId: userID, card }));
      setIsSaved(true);
    }
  };

  const removeFromSavedSection = () => {
    if (userID && card.id) {
      dispatch(removeFromSaved({ userId: userID, cardId: card.id }));
      setIsSaved(false);
    }
  };

  return (
    <div>
      <div className={cx("body")}>
        <div className={cx("display")}>
          <p className={cx("display-text")}>{card.display}</p>
          <div className={cx("pronoun")}>
            <SpeakerWaveIcon width={24} height={24} onClick={playAudio} />
            {/* <p className={cx('pronoun-text')}>??</p> */}
            <HeartIcon
              width={32}
              height={32}
              className={cx("heart-icon", { "is-saved": isSaved })}
              onClick={() => {
                if (!isSaved) addToSavedSection();
                else removeFromSavedSection();
              }}
            />
          </div>
        </div>
        <div className={cx("image")}>
          <img src={img} alt="" />
        </div>
        <p className={cx("meaning")}>{card.meaning}</p>
        <p className={cx("example")}>{card.example}</p>
      </div>
    </div>
  );
};

export default StudyCardDetail;
