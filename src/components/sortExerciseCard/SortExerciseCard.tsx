import React, { useEffect, useState } from "react";
import { ExDetail, StudyCard } from "../../types";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
import style from "./SortExerciseCard.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const SortExerciseCard = ({
  card,
  onChange,
}: {
  card: StudyCard;
  onChange: (answer: string) => void;
}) => {
  const [img, setImg] = useState("");
  const [listWords, setListWords] = useState<string[]>([]);
  const [listAnswer, setListAnswer] = useState<string[]>([]);

  const getAnswer = () => {
    return listAnswer.join(" ");
  };

  if (card.imageFile)
    getDownloadURL(ref(storage, `images/${card.imageFile}`)).then((url) => {
      setImg(url);
    });

  const splitIntoWords = () => {
    if (card.display) {
      let words = card.display.split(" ");

      // blend words
      const mixedWords = [];

      while (words.length > 0) {
        const randomIndex = Math.floor(Math.random() * words.length);
        mixedWords.push(words[randomIndex]);
        words[randomIndex] = words[words.length - 1];
        words.pop();
      }

      setListWords(mixedWords);
    }
  };

  const addToAnswer = (item: string) => {
    setListAnswer([...listAnswer, item]);
  };

  const addToWords = (item: string) => {
    setListWords([...listWords, item]);
  };

  const removeWord = (index: number) => {
    if (listWords) {
      listWords.splice(index, 1);
      setListWords(listWords);
    }
  };

  const removeOutOfAnswer = (index: number) => {
    if (listAnswer) {
      listAnswer.splice(index, 1);
      setListAnswer(listAnswer);
    }
  };

  useEffect(() => {
    splitIntoWords();
    setListAnswer([]);
  }, [card]);

  useEffect(() => {
    onChange(getAnswer());
  }, [listAnswer]);

  return (
    <>
      <div className={cx("body")}>
        <div className={cx("answer-wrapper")}>
          <ul className={cx("list")}>
            {listAnswer &&
              listAnswer.map((item, index) => (
                <li
                  className={cx("item")}
                  onClick={() => {
                    removeOutOfAnswer(index);
                    addToWords(item);
                  }}
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>
        <div className={cx("image")}>
          <img src={img} alt="" />
        </div>
        <div>
          <ul className={cx("list", "words")}>
            {listWords &&
              listWords.map((item, index) => (
                <li
                  className={cx("item")}
                  onClick={() => {
                    addToAnswer(item);
                    removeWord(index);
                  }}
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SortExerciseCard;
