import React, { useEffect, useState } from "react";
import { Button, Checkbox, Input } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  getSentences,
  getVocabs,
  getVocabsByTopic,
  setStudyCard,
} from "../../../redux/slice/adminSlice";
import Popup from "../../../components/popup/Popup";
import style from "./IndexStudy.module.scss";
import { StudyCard } from "../../../types";
import { Col, Row } from "react-flexbox-grid";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

interface Props {
  classNames?: string;
  onClose: () => void;
  pathID: string;
  routeID: string;
  isDisplay: boolean;
}

const CreateStudyCard = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  // const [display, setDisplay] = useState<string>("");
  // const [meaning, setMeaning] = useState<string>("");
  // const [image, setImage] = useState<any>();
  // const [audio, setAudio] = useState<any>();

  // load list vocab in special topic. (ex: Greeting)
  const listVocabs: StudyCard[] | undefined = useSelector(
    (state: RootState) => state.admin.listVocabs
  );
  const listSentences: StudyCard[] | undefined = useSelector(
    (state: RootState) => state.admin.listSentences
  );
  const [selectedItem, setSelectedItem] = useState<StudyCard>();

  useEffect(() => {
    dispatch(getVocabs());
    dispatch(getSentences());
  }, [dispatch]);

  return (
    <>
      <Popup
        title={"Tạo câu mới"}
        classNames={""}
        onClose={props.onClose}
        onSubmit={() => {
          if (selectedItem?.id) {
            dispatch(
              setStudyCard({
                path_id: props.pathID,
                route_id: props.routeID,
                card_id: selectedItem.id,
              })
            );
          }
        }}
        isDisplay={props.isDisplay}
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
          <Col md={6}></Col>
        </Row>
      </Popup>
    </>
  );
};

export default CreateStudyCard;
