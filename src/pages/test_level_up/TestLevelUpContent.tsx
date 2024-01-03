import React, { useEffect, useState } from "react";
import { TestType } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getTestList } from "../../redux/slice/adminSlice";
import classNames from "classnames/bind";
import style from "./TestLevelUp.module.scss";
import { Button } from "../../components";
import { toast } from "react-toastify";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
import { SpeakerWaveIcon } from "@heroicons/react/24/outline";
const cx = classNames.bind(style);

interface TestLevelUpContentProps {
  onExit: () => void;
  onFinish: (result: boolean[]) => void;
}

const TestLevelUpContent = ({ onExit, onFinish }: TestLevelUpContentProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [list, setList] = useState<TestType[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<TestType>();
  const [result, setResult] = useState<boolean[]>([]);
  const [tempOption, setTempOption] = useState<string>();
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const [audio, setAudio] = useState("");

  if (currentQuestion?.audio)
    getDownloadURL(ref(storage, `audios/${currentQuestion?.audio}`)).then(
      (url) => {
        setAudio(url);
      }
    );

  const playAudio = () => {
    var sound = new Audio(audio);
    sound.play();
  };

  useEffect(() => {
    const fetchList = async () => {
      const { payload: newData } = await dispatch(getTestList());

      const data = newData as TestType[];
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

  return (
    <>
      <div className={cx("wrapper")}>
        {list && list.length > 0 && currentQuestion && (
          <>
            <p className={cx("question-label")}>
              {currentQuestion.question.label}
            </p>
            <p className={cx("question-ques")}>
              {currentQuestion.question.ques}
            </p>
            {currentQuestion.audio && (
              <SpeakerWaveIcon width={24} height={24} onClick={playAudio} />
            )}
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

      <Button isPrimary={false} onClick={onExit}>
        Exit
      </Button>
      {isFinished === true && (
        <Button isPrimary={false} onClick={handleFinish}>
          Finish All
        </Button>
      )}
    </>
  );
};

export default TestLevelUpContent;
