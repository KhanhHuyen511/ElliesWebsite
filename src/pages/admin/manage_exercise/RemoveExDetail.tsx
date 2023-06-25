import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Popup } from "../../../components";
import {
  removeAExDetail,
  updateAExDetail,
} from "../../../redux/slice/adminSlice";
import { AppDispatch } from "../../../redux/store";
import { ExDetail, GameType } from "../../../types";
import style from "./DetailExercise.module.scss";
import classNames from "classnames/bind";
import { Col, Row } from "react-flexbox-grid";
import React from "react";
const cx = classNames.bind(style);

const RemoveExDetail = ({
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

  return (
    <>
      <Popup
        title={"Xóa câu hỏi "}
        onClose={onClose}
        onSubmit={() => {
          if (data) {
            dispatch(
              removeAExDetail({
                exId,
                id: data.id,
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
                  <th>Từ vựng</th>
                  <th>Nghĩa</th>
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
            {data.type == GameType.FillInSentence && (
              <Input
                label={"Từ khoá"}
                value={data.keyWord}
                placeholder={""}
                onChange={() => {}}
                isDisabled
              ></Input>
            )}
            {data.type != GameType.SortWords && (
              <>
                {" "}
                <Input
                  label={"Sự lựa chọn 1"}
                  value={data.options ? data.options[0] : ""}
                  placeholder={"abc"}
                  onChange={() => {}}
                  isDisabled
                ></Input>
                <Input
                  label={"Sự lựa chọn 2"}
                  value={data.options ? data.options[1] : ""}
                  placeholder={"abc"}
                  onChange={() => {}}
                ></Input>
                <Input
                  label={"Sự lựa chọn 3"}
                  value={data.options ? data.options[2] : ""}
                  placeholder={"abc"}
                  onChange={() => {}}
                ></Input>
                <Input
                  label={"Sự lựa chọn 4"}
                  value={data.options ? data.options[3] : ""}
                  placeholder={"abc"}
                  onChange={() => {}}
                ></Input>
                <Input
                  label={"Đáp án đúng"}
                  value={data.answer}
                  placeholder={"abc"}
                  onChange={() => {}}
                  isRequired
                ></Input>
              </>
            )}
            <Input
              label={"Loại câu hỏi "}
              value={data.type.toString()}
              placeholder={""}
              onChange={() => {}}
              isDisabled
            ></Input>
          </Col>
        </Row>
      </Popup>
    </>
  );
};

export default RemoveExDetail;
