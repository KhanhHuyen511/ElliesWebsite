import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Input, Popup } from '../../../components';
import {
  getVocabsByTopic,
  setAExDetail,
  updateAExDetail,
} from '../../../redux/slice/adminSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { ExDetail, GameType, StudyCard } from '../../../types';
import style from './DetailExercise.module.scss';
import classNames from 'classnames/bind';
import { Col, Row } from 'react-flexbox-grid';
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

  const [option1, setOption1] = useState<string>(data.options[0]);
  const [option2, setOption2] = useState<string>(data.options[1]);
  const [option3, setOption3] = useState<string>(data.options[2]);
  const [option4, setOption4] = useState<string>(data.options[3]);
  const [answer, setAnswer] = useState<string>(data.answer);
  const [type, setType] = useState<string>(data.type);

  return (
    <>
      <Popup
        title={'Tạo câu hỏi mới'}
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
              })
            );
          }
        }}
        isDisplay={isDisplay}
        classNames={cx('create-form')}
      >
        <Row>
          <Col md={6}>
            <table className={cx('table')}>
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
            <Input
              label={'Sự lựa chọn 1'}
              value={option1}
              placeholder={'abc'}
              onChange={(e) => {
                setOption1(e.target.value);
              }}
              isRequired
            ></Input>
            <Input
              label={'Sự lựa chọn 2'}
              value={option2}
              placeholder={'abc'}
              onChange={(e) => {
                setOption2(e.target.value);
              }}
            ></Input>
            <Input
              label={'Sự lựa chọn 3'}
              value={option3}
              placeholder={'abc'}
              onChange={(e) => {
                setOption3(e.target.value);
              }}
            ></Input>
            <Input
              label={'Sự lựa chọn 4'}
              value={option4}
              placeholder={'abc'}
              onChange={(e) => {
                setOption4(e.target.value);
              }}
            ></Input>
            <Input
              label={'Đáp án đúng'}
              value={answer}
              placeholder={'abc'}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              isRequired
            ></Input>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option>{GameType[0]}</option>
              <option>{GameType[1]}</option>
            </select>
          </Col>
        </Row>
      </Popup>
    </>
  );
};

export default EditExDetail;
