import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Input, Popup } from "../../../components";
import {
  getDocCardWithTopicLevel,
  setAExDetail,
} from "../../../redux/slice/adminSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { GameType, LevelType, StudyCard } from "../../../types";
import style from "./DetailExercise.module.scss";
import classNames from "classnames/bind";
import { Col, Row } from "react-flexbox-grid";
const cx = classNames.bind(style);

const CreateExDetail = ({
  id,
  title,
  level,
  isDisplay,
  onClose,
}: {
  id: string;
  title: string;
  level: LevelType;
  isDisplay: boolean;
  onClose: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // load list vocab in special topic. (ex: Greeting)
  const listCards: StudyCard[] | undefined = useSelector(
    (state: RootState) => state.admin.listVocabs
  );

  const [selectedItem, setSelectedItem] = useState<StudyCard>();
  const [option1, setOption1] = useState<string>();
  const [option2, setOption2] = useState<string>();
  const [option3, setOption3] = useState<string>();
  const [option4, setOption4] = useState<string>();
  const [answer, setAnswer] = useState<string>();
  const [keyWord, setKeyWord] = useState<string>();
  const [type, setType] = useState<GameType>(GameType.TranslateToVN);

  useEffect(() => {
    dispatch(getDocCardWithTopicLevel({ topic: title, level }));
  }, [dispatch]);

  const onSubmit = () => {
    if (id && selectedItem) {
      dispatch(
        setAExDetail({
          exId: id,
          vocab: selectedItem,
          options: [
            option1 ? option1 : "",
            option2 ? option2 : "",
            option3 ? option3 : "",
            option4 ? option4 : "",
          ],
          answer: answer ? answer : "",
          type,
          keyWord,
        })
      );
    }
  };

  return (
    <>
      <Popup
        title={"Create new question"}
        onClose={onClose}
        onSubmit={onSubmit}
        isDisplay={isDisplay}
        classNames={cx("create-form")}
      >
        <Row>
          <Col md={6}>
            <table className={cx("table")}>
              <thead>
                <tr>
                  <th></th>
                  <th>STT</th>
                  <th>Vocab</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                {listCards?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Checkbox
                        isChecked={selectedItem && item.id === selectedItem.id}
                        onChecked={() => {
                          setSelectedItem(item);
                        }}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{item?.display}</td>
                    <td>{item.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
          <Col md={6}>
            {type == GameType.FillInSentence && (
              <Input
                label="Keyword"
                value={keyWord}
                placeholder={"#"}
                onChange={(e) => {
                  setKeyWord(e.target.value);
                }}
                isRequired
              ></Input>
            )}
            {type != GameType.SortWords && (
              <>
                <Input
                  label="Option 1"
                  value={option1}
                  placeholder={"fill option 1"}
                  onChange={(e) => {
                    setOption1(e.target.value);
                  }}
                  isRequired
                ></Input>
                <Input
                  label="Option 2"
                  value={option2}
                  placeholder={"fill option 2"}
                  onChange={(e) => {
                    setOption2(e.target.value);
                  }}
                ></Input>
                <Input
                  label="Option 3"
                  value={option3}
                  placeholder={"fill option 3"}
                  onChange={(e) => {
                    setOption3(e.target.value);
                  }}
                ></Input>
                <Input
                  label="Option 4"
                  value={option4}
                  placeholder={"fill option 4"}
                  onChange={(e) => {
                    setOption4(e.target.value);
                  }}
                ></Input>
                <Input
                  label={"Answer"}
                  value={answer}
                  placeholder={"fill answer"}
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

export default CreateExDetail;
