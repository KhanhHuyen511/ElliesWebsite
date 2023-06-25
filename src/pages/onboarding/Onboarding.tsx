import React, { FormEvent, useState } from "react";
import style from "./Onboarding.module.scss";
import classNames from "classnames/bind";
import { Button } from "../../components";
import { ToastContainer, toast } from "react-toastify";
import ChooseRoute from "./ChooseRoute";
import { LevelType } from "../../types";
const cx = classNames.bind(style);

const Onboarding = () => {
  const [age, setAge] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [q1, setQ1] = useState<string>("");
  const [q2, setQ2] = useState<string>("");
  const [q3, setQ3] = useState<string>("");
  const [q4, setQ4] = useState<string>("");
  const [q5, setQ5] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(false);
  const [level, setLevel] = useState<LevelType>(LevelType.Beginner);

  const onChangeAge = (e: any) => {
    setAge(e.target.value);
  };

  const onChangePurpose = (e: any) => {
    setPurpose(e.target.value);
  };

  const onChangeQuestion = (e: any, order: number) => {
    switch (order) {
      case 0:
        setQ1(e.target.value);
        break;
      case 1:
        setQ2(e.target.value);
        break;
      case 2:
        setQ3(e.target.value);
        break;
      case 3:
        setQ4(e.target.value);
        break;
      case 4:
        setQ5(e.target.value);
        break;
      default:
        break;
    }
  };

  const questions = [
    {
      question: "Hãy dịch nghĩa của từ này: Butterfly",
      options: ["Con cá", "Tuyệt vời", "Con bướm", "Xinh đẹp"],
      answer: "Con bướm",
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
    const temp = [age, purpose, q1, q2, q3, q4, q5];
    // check if user fill all questions
    // if don't
    if (temp.filter((i) => i === "").length > 0) {
      toast.warning(
        "Hình như bạn đã bỏ sót câu hỏi nào rồi! Hãy trả lời tất cả nhé ~"
      );
    } else {
      setIsDone(true);

      // check result -> define level -> recommend study path
      const results: boolean[] = [
        q1 === questions[0].answer,
        q2 === questions[1].answer,
        q3 === questions[2].answer,
        q4 === questions[3].answer,
        q5 === questions[4].answer,
      ];

      if (results[0] && results[1] && results[2]) {
        if (results[3] && results[4]) setLevel(LevelType.Advanced);
        else setLevel(LevelType.Intermediate);
      } else {
        setLevel(LevelType.Beginner);
      }
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
