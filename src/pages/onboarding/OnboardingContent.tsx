import React, { useEffect, useState } from "react";
import { OnboardingType, TestEnum, TestType } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getOnboardingList } from "../../redux/slice/adminSlice";
import classNames from "classnames/bind";
import style from "./Onboarding.module.scss";
import { Button } from "../../components";
import { toast } from "react-toastify";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
const cx = classNames.bind(style);

interface OnboardingContentProps {
  onFinish: (result: boolean[]) => void;
}

const OnboardingContent = ({ onFinish }: OnboardingContentProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [list, setList] = useState<OnboardingType[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<TestType>();
  const [result, setResult] = useState<boolean[]>([]);
  const [tempOption, setTempOption] = useState<string>();
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    const fetchList = async () => {
      const { payload: newData } = await dispatch(getOnboardingList());

      const data = newData as OnboardingType[];
      setList(data);
      setCurrentQuestion(data[0]);
    };

    fetchList();
  }, [dispatch]);

  const prevCard = () => {
    setCurrentIndex((pre) => pre - 1);
    setCurrentQuestion(list[currentIndex - 1]);
    resetTempOption();
  };
  const nextCard = () => {
    if (tempOption && currentQuestion) {
      updateResult(tempOption, currentQuestion?.answer);

      if (currentIndex < list.length - 1) {
        setCurrentIndex((pre) => pre + 1);
        setCurrentQuestion(list[currentIndex + 1]);
      }

      if (currentIndex === list.length - 1) {
        setIsFinished(true);
      }

      resetTempOption();
    } else toast.warning("Please select option");
  };

  const resetTempOption = () => {
    setTempOption(undefined);
  };

  const updateResult = (option: string, answer: string) => {
    if (option === answer) setResult((prev) => [...prev, true]);
    else setResult((prev) => [...prev, false]);
  };

  const handleFinish = () => {
    onFinish(result);
  };

  const splitIntoWords = (question: string) => {
    if (question) {
      let words = question.split(" ");

      // blend words
      const mixedWords = [];

      while (words.length > 0) {
        const randomIndex = Math.floor(Math.random() * words.length);
        mixedWords.push(words[randomIndex]);
        words[randomIndex] = words[words.length - 1];
        words.pop();
      }

      return mixedWords.join("/ ");
    }
  };

  const [audio, setAudio] = useState<any>();

  useEffect(() => {
    currentQuestion?.audio &&
      getDownloadURL(ref(storage, `audios/${currentQuestion?.audio}`)).then(
        (url) => {
          setAudio(url);
        }
      );
  }, [currentQuestion?.audio]);

  return (
    <>
      <div className={cx("wrapper")}>
        {list && list.length > 0 && currentQuestion && (
          <>
            <p className={cx("question-label")}>
              {currentQuestion.question.label}
            </p>
            {currentQuestion.audio && audio && <audio controls src={audio} />}
            <p className={cx("question-ques")}>
              {currentQuestion.type == TestEnum.SortWords
                ? splitIntoWords(currentQuestion.question.ques)
                : currentQuestion.question.ques}
            </p>
            <ul className={cx("options")}>
              {currentQuestion.options.map((option, index) => (
                <li
                  key={`option-${index}`}
                  onClick={() => {
                    setTempOption(option);
                  }}
                  className={cx({
                    active: tempOption === option,
                  })}
                >
                  {option}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <p className={cx("page-number")}>
        <span>{currentIndex + 1}/</span>
        {list.length}
      </p>
      <div className={cx("cta")}>
        <Button isPrimary={false} onClick={prevCard} icon="prev"></Button>
        <Button isPrimary={false} onClick={nextCard} haveIcon></Button>
      </div>

      {isFinished === true && (
        <Button isPrimary={false} onClick={handleFinish}>
          Finish All
        </Button>
      )}
    </>
  );
};

export default OnboardingContent;
