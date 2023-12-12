import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Popup } from "../../../components";
import { updateAExDetail } from "../../../redux/slice/adminSlice";
import { AppDispatch } from "../../../redux/store";
import { ExDetail, GameType } from "../../../types";
import style from "./DetailExercise.module.scss";
import classNames from "classnames/bind";
import { Col, Row } from "react-flexbox-grid";
const cx = classNames.bind(style);

const EditExDetail = ({
  exId,
  data,
  title,
  isDisplay,
  onClose,
}: {
  exId: string;
  data: ExDetail;
  title: string;
  isDisplay: boolean;
  onClose: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [option1, setOption1] = useState<string>(
    data.options ? data.options[0] : ""
  );
  const [option2, setOption2] = useState<string>(
    data.options ? data.options[1] : ""
  );
  const [option3, setOption3] = useState<string>(
    data.options ? data.options[2] : ""
  );
  const [option4, setOption4] = useState<string>(
    data.options ? data.options[3] : ""
  );
  const [answer, setAnswer] = useState<string>(data.answer ? data.answer : "");
  const [keyWord, setKeyWord] = useState<string>(
    data.keyWord ? data.keyWord : ""
  );
  const [type, setType] = useState<GameType>(data.type);

  return (
    <>
      <Popup
        title={"Cập nhật câu hỏi"}
        onClose={onClose}
        onSubmit={() => {
          if (data) {
            dispatch(
              updateAExDetail({
                exId,
                data,
                options: [option1, option2, option3, option4],
                answer: answer !== data.answer ? answer : undefined,
                type: type !== data.type ? type : undefined,
                keyWord,
              })
            );
          }
        }}
        isDisplay={isDisplay}
        classNames={cx("create-form")}
      >
        <Row>
          <Col md={6}>
            <table className={cx("table")}>
              <thead>
                <tr>
                  <th>Display</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.vocab?.display}</td>
                  <td>{data.vocab?.meaning}</td>
                </tr>
              </tbody>
            </table>
          </Col>
          <Col md={6}>
            {type == GameType.FillInSentence && (
              <Input
                label="Keyword"
                value={keyWord}
                placeholder={""}
                onChange={(e) => {
                  setKeyWord(e.target.value);
                }}
                isRequired
              ></Input>
            )}
            {type != GameType.SortWords && (
              <>
                {" "}
                <Input
                  label="Option 1"
                  value={option1}
                  placeholder={""}
                  onChange={(e) => {
                    setOption1(e.target.value);
                  }}
                  isRequired
                ></Input>
                <Input
                  label="Option 2"
                  value={option2}
                  placeholder={""}
                  onChange={(e) => {
                    setOption2(e.target.value);
                  }}
                ></Input>
                <Input
                  label="Option 3"
                  value={option3}
                  placeholder={""}
                  onChange={(e) => {
                    setOption3(e.target.value);
                  }}
                ></Input>
                <Input
                  label="Option 4"
                  value={option4}
                  placeholder={""}
                  onChange={(e) => {
                    setOption4(e.target.value);
                  }}
                ></Input>
                <Input
                  label="Answer"
                  value={answer}
                  placeholder={""}
                  onChange={(e) => {
                    setAnswer(e.target.value);
                  }}
                  isRequired
                ></Input>
              </>
            )}
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value as unknown as GameType);
              }}
            >
              <option value={GameType.TranslateToVN}>{GameType[0]}</option>
              <option value={GameType.TranslateToEN}>{GameType[1]}</option>
              <option value={GameType.TranslateSentenceToVN}>
                {GameType[2]}
              </option>
              <option value={GameType.TranslateSentenceToEN}>
                {GameType[3]}
              </option>
              <option value={GameType.FillInSentence}>{GameType[4]}</option>
              <option value={GameType.SortWords}>{GameType[5]}</option>
            </select>
          </Col>
        </Row>
      </Popup>
    </>
  );
};

export default EditExDetail;
