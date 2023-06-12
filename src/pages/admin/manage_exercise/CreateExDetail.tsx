import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Input, Popup } from "../../../components";
import {
  getDocCardWithTopic,
  setAExDetail,
} from "../../../redux/slice/adminSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { GameType, StudyCard, StudyCardType } from "../../../types";
import style from "./DetailExercise.module.scss";
import classNames from "classnames/bind";
import { Col, Row } from "react-flexbox-grid";
const cx = classNames.bind(style);

const CreateExDetail = ({
  id,
  title,
  isDisplay,
  onClose,
}: {
  id: string;
  title: string;
  isDisplay: boolean;
  onClose: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // load list vocab in special topic. (ex: Greeting)
  const listVocabs: StudyCard[] | undefined = useSelector(
    (state: RootState) => state.admin.listVocabs
  );
  const listSentences: StudyCard[] | undefined = useSelector(
    (state: RootState) => state.admin.listSentences
  );

  const [selectedItem, setSelectedItem] = useState<StudyCard>();
  const [option1, setOption1] = useState<string>();
  const [option2, setOption2] = useState<string>();
  const [option3, setOption3] = useState<string>();
  const [option4, setOption4] = useState<string>();
  const [answer, setAnswer] = useState<string>();
  const [type, setType] = useState<GameType>(GameType.TranslateToVN);

  useEffect(() => {
    dispatch(getDocCardWithTopic({ topic: title, type: StudyCardType.Vocab }));
    dispatch(
      getDocCardWithTopic({ topic: title, type: StudyCardType.Sentence })
    );
  }, [dispatch]);

  return (
    <>
      <Popup
        title={"Tạo câu hỏi mới"}
        onClose={onClose}
        onSubmit={() => {
          if (id && answer && type && selectedItem) {
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
                answer,
                type,
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
                  <th></th>
                  <th>STT</th>
                  <th>Từ vựng</th>
                  <th>Nghĩa</th>
                </tr>
              </thead>
              <tbody>
                {listVocabs?.map((item, index) => (
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
                {listSentences?.map((item, index) => (
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
            <Input
              label={"Nhập sự lựa chọn 1"}
              value={option1}
              placeholder={"abc"}
              onChange={(e) => {
                setOption1(e.target.value);
              }}
              isRequired
            ></Input>
            <Input
              label={"Nhập sự lựa chọn 2"}
              value={option2}
              placeholder={"abc"}
              onChange={(e) => {
                setOption2(e.target.value);
              }}
            ></Input>
            <Input
              label={"Nhập sự lựa chọn 3"}
              value={option3}
              placeholder={"abc"}
              onChange={(e) => {
                setOption3(e.target.value);
              }}
            ></Input>
            <Input
              label={"Nhập sự lựa chọn 4"}
              value={option4}
              placeholder={"abc"}
              onChange={(e) => {
                setOption4(e.target.value);
              }}
            ></Input>
            <Input
              label={"Nhập đáp án đúng"}
              value={answer}
              placeholder={"abc"}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              isRequired
            ></Input>
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
            </select>
          </Col>
        </Row>
      </Popup>
    </>
  );
};

export default CreateExDetail;
