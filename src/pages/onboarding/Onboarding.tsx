import React, { FormEvent, useState } from "react";
import style from "./Onboarding.module.scss";
import classNames from "classnames/bind";
import { Button } from "../../components";
import { ToastContainer, toast } from "react-toastify";
import ChooseRoute from "./ChooseRoute";
import { LevelType } from "../../types";
import getLevel from "./CheckResult";
const cx = classNames.bind(style);

const Onboarding = () => {
  const [age, setAge] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [q, setQ] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [level, setLevel] = useState<LevelType>(LevelType.Beginner);

  const onChangeAge = (e: any) => {
    setAge(e.target.value);
  };

  const onChangePurpose = (e: any) => {
    setPurpose(e.target.value);
  };

  const onChangeQuestion = (e: any, order: number) => {
    let newQ = q;
    newQ[order] = e.target.value;
    setQ(newQ);
  };

  const questions = [
    {
      question: "Hãy dịch nghĩa của từ này: Butterfly",
      options: ["Con cá", "Tuyệt vời", "Con bướm", "Xinh đẹp"],
      answer: "Con bướm",
    },
    {
      question: "Hãy chọn nghĩa phù hợp nhất của từ này: Consider",
      options: ["Xem xét", "Tôn trọng", "Cho phép", "Đánh giá"],
      answer: "Xem xét",
    },
    {
      question: "Hãy chọn câu có nghĩa sau: Đã lâu rồi tôi không gặp bạn.",
      options: [
        "Haven’t seen you for a long time!",
        "Nice to meet you",
        "How’s it going?",
        "I don't usually meet you everyday!",
      ],
      answer: "Haven’t seen you for a long time!",
    },
    {
      question:
        "Hãy điền vào chỗ trống để hoàn thành một câu có nghĩa: ___ you ___ to Paris before?",
      options: ["Haven’t/been", "Do/go", "Did/went", "Have/are"],
      answer: "Haven’t/been",
    },
    {
      question: "Nghe đoạn âm thanh sau và chọn câu mà bạn nghe được.",
      audio: "onboarding.mp3",
      options: [
        "It take him 10 minutes to do this exercise yesterday.",
        "It took him 10 minutes to do this exercise yesterday.",
        "It took him 10 minutes to do his exercise yesterday.",
        "All are Incorrect.",
      ],
      answer: "It took him 10 minutes to do this exercise yesterday.",
    },
    {
      question: "Nghe đoạn âm thanh sau và chọn câu mà bạn nghe được nhé!",
      audio: "onboarding.mp3",
      options: [
        "Everything has beauty, but not everyone sees it.",
        "Every thing has beauty, but not everyone sees it.",
        "Everything have beauty, but everyone see it.",
        "All are Incorrect.",
      ],
      answer: "Everything has beauty, but not everyone sees it.",
    },
    {
      question:
        "Hãy sắp xếp các từ sau thành câu có nghĩa: through/ ears,/ while/ women/ eyes!/ love/ men/ love/ through",
      audio: "",
      options: [
        "Women love through ears, while men love through eyes!",
        "Women through love ears, while men throsugh love eyes!",
        "Men love through ears, while women love through eyes!",
        "Men through love ears, while women through love eyes!",
      ],
      answer: "Women love through ears, while men love through eyes!",
    },
    {
      question: "Nghe đoạn hội thoại sau và trả lời câu hỏi sau",
      audio: "",
      paraph_question: "What are conversation infer to?",
      options: [
        "They will go to the Geneva Bank together.",
        "The man want to go to nearest street.",
        "They will have a meeting on Geneva Street.",
        "The man want to go to the nearest bank, that is on Geneva Street.",
      ],
      answer:
        "The man want to go to the nearest bank, that is on Geneva Street.",
    },
    {
      question: "Nghe và chọn từ điền vào đoạn hội thoại sau",
      audio: "",
      options: [
        "umbrellas - have no black umbrella - yellow umbrella - this year",
        "umbrellas - have black umbrellas - yellow umbrella - next year.",
        "umbrella - have black umbrellas - yellow umbrella - next year.",
        "umbrella - have no black umbrella - yellow umbrellas - this year.",
      ],
      answer:
        "umbrella - have no black umbrella - yellow umbrellas - this year.",
    },
    {
      question: "Hãy đọc đoạn văn sau và trả lời câu hỏi bên dưới",
      paraph:
        "Thirty years ago, people couldn’t have imagined social media like Twitter and Facebook. Now we can’t live without them. But this is only the start. Right now, scientists are putting microchips in some disabled people’s brains, to help them see, hear and communicate better. In the future, we may all use these technologies. We won’t need smartphones to use social media or search the internet because the internet will be in our heads!",
      paraph_question:
        "What does the writer say about the future of communication?",
      options: [
        "We can’t know what the most popular social media will be.",
        "Microchips will become faster.",
        "We won’t use the internet as much.",
        "We won’t need devices like smartphones.",
      ],
      answer: "We won’t need devices like smartphones.",
    },
  ];

  const getListQuestions = () => {
    return (
      <ul>
        {questions &&
          questions.map((item, index) => (
            <li className={cx("item")} key={index}>
              <p className={cx("question")}>{item.question}</p>
              {item.audio && (
                <audio
                  src={`/audios/${item.audio}`}
                  controls
                  className={cx("audio")}
                ></audio>
              )}
              {item.paraph && item.paraph_question && (
                <>
                  <p className={cx("paraph")}>{item.paraph}</p>
                  <p className={cx("paraph", "question")}>
                    {item.paraph_question}
                  </p>
                </>
              )}
              <ul
                className={cx("sub-list")}
                onChange={(e) => onChangeQuestion(e, index)}
              >
                {item.options &&
                  item.options.map((e, i) => (
                    <li key={i}>
                      <label>
                        <input
                          type="radio"
                          value={e}
                          name={item.question}
                        ></input>
                        {e}
                      </label>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
      </ul>
    );
  };

  const checkResult = () => {
    const temp = [age, purpose, ...q];
    // check if user fill all questions
    // if don't
    if (temp.filter((i) => i === "").length > 0) {
      toast.warning(
        "Hình như bạn đã bỏ sót câu hỏi nào rồi! Hãy trả lời tất cả nhé ~"
      );
    } else {
      setIsDone(true);

      // check result -> define level -> recommend study path
      let result: number = 0;

      q.forEach((i, index) => {
        if (index in [0, 1, 2]) {
          if (i === questions[index].answer) {
            result += 1.5;
          }
        } else if (index in [3, 4, 5, 6]) {
          if (i === questions[index].answer) {
            result += 1;
          }
        } else if (i === questions[index].answer) {
          result += 0.5;
        }
      });

      console.log(result);

      const level = getLevel(result);

      if (level) setLevel(level);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        {isDone === false ? (
          <div>
            <p className={cx("title")}>
              Hãy làm chút khảo sát để chúng tôi có thêm hiểu biết về bạn nhé!
            </p>
            <ul className={cx("list")}>
              <li className={cx("item")}>
                <p className={cx("question")}>Bạn bao nhiêu tuổi?</p>
                <ul className={cx("sub-list")} onChange={(e) => onChangeAge(e)}>
                  <li>
                    <label>
                      <input type="radio" value={`< 18`} name="age"></input>
                      {`< 18`}
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" value={`18 - 25`} name="age"></input>
                      {`18 - 25`}
                    </label>
                  </li>
                  <li>
                    <label>
                      <input type="radio" value={`> 25`} name="age"></input>
                      {`> 25`}
                    </label>
                  </li>
                </ul>
              </li>
              <li className={cx("item")}>
                <p className={cx("question")}>
                  Bạn học tiếng Anh để phục vụ nhu cầu gì?
                </p>
                <ul
                  className={cx("sub-list")}
                  onChange={(e) => onChangePurpose(e)}
                >
                  <li>
                    <label>
                      <input
                        type="radio"
                        value="Giao tiếp"
                        name="purpose"
                      ></input>
                      Giao tiếp
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        value="Công việc"
                        name="purpose"
                      ></input>
                      Công việc
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        type="radio"
                        value="Học tập"
                        name="purpose"
                      ></input>
                      Học tập
                    </label>
                  </li>
                </ul>
              </li>
              <hr></hr>
              <li className={cx("item")}>
                <p className={cx("sub-title")}>
                  Cùng đánh giá sơ qua trình độ hiện tại của bạn bằng cách trả
                  lời những câu hỏi dưới đây!
                </p>
                <>{getListQuestions()}</>
              </li>
            </ul>
            <Button
              isPrimary
              onClick={() => {
                checkResult();
              }}
            >
              Hoàn thành
            </Button>
          </div>
        ) : (
          <ChooseRoute level={level}></ChooseRoute>
        )}
      </div>
    </>
  );
};

export default Onboarding;
