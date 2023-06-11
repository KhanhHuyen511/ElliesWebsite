import React, { useState } from "react";
import styles from "./ParaphCard.module.scss";
import classNames from "classnames/bind";
import { BookOpenIcon, HeartIcon } from "@heroicons/react/24/outline";
import { Doc, StudyCard, StudyCardType } from "../../types";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
import { Col, Row } from "react-flexbox-grid";
const cx = classNames.bind(styles);

const ParaphCard = ({ card }: { card: StudyCard }) => {
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

  // const playAudio = () => {
  //   var sound = new Audio(audio);
  //   sound.play();
  // };

  return (
    <>
      <Row className={cx("body")}>
        <Col xs={9} className={cx("display")}>
          {audio && (
            <audio controls src={audio} className={cx("audio")}></audio>
          )}
          <p className={cx("display-text")}>{card.display}</p>
          <p className={cx("meaning-text")}>{card.meaning}</p>
          <div className={cx("pronoun")}>
            {/* <SpeakerWaveIcon width={24} height={24} onClick={playAudio} /> */}
            {/* <p className={cx('pronoun-text')}>??</p> */}
            {/* <HeartIcon width={32} height={32} className={cx("heart-icon")} /> */}
          </div>
        </Col>
        <Col xs={3}>
          <img src={img} alt="" className={cx("image")} />
        </Col>
      </Row>
    </>
  );
};

export default ParaphCard;
