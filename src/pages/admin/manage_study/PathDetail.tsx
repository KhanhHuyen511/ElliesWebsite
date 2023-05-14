import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PathDetail.module.scss';
import { Button, Checkbox, Input } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import {
  getStudyPath,
  getStudyRoute,
  updateStudyPath,
} from '../../../redux/slice/adminSlice';
import { StudyCard, StudyPath, StudyRoute } from '../../../types';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-flexbox-grid';
import CreateRouteForm from './CreateRouteForm';
import EditRouteForm from './EditRouteForm';
import CreateStudyCard from './CreateStudyCard';
import EditCardForm from './EditCardForm';
const cx = classNames.bind(styles);

const PathDetail = () => {
  let { id } = useParams();

  console.log(id);

  const dispatch = useDispatch<AppDispatch>();

  const data: StudyPath = useSelector(
    (state: RootState) => state.admin.currentStudyPath
  );

  const currentRoute: StudyRoute = useSelector(
    (state: RootState) => state.admin.currentStudyRoute
  );

  useEffect(
    () => {
      if (id) dispatch(getStudyPath(id));
      setListStudyRoute(data.studyRoutes);
      setName(data.name);
      setTopic(data.topic);
      setLevel(data.level);
    }, // eslint-disable-next-line
    [dispatch, id, data.name, currentRoute]
  );

  const [name, setName] = useState<string>();
  const [level, setLevel] = useState<string>();
  const [topic, setTopic] = useState<string>();
  const [listStudyRoute, setListStudyRoute] = useState<StudyRoute[]>();
  const [currentStudyRoute, setCurrentStudyRoute] = useState<StudyRoute>();
  const [isOpenRouteForm, setIsOpenRouteForm] = useState<boolean>(false);
  const [isOpenEditRouteForm, setIsOpenEditRouteForm] =
    useState<boolean>(false);
  const [isOpenEditCardForm, setIsOpenEditCardForm] = useState<boolean>(false);
  const [isOpenCardForm, setIsOpenCardForm] = useState<boolean>(false);
  const [selectRoute, setSelectRoute] = useState<string>();
  const [curretntStudyCard, setCurrentStudyCard] = useState<StudyCard>();

  return (
    <div className={cx('wrapper', 'container')}>
      <Row>
        <Col md={6}>
          <form>
            <p className={cx('form-title')}>Chi tiết lộ trình học</p>
            <div className={cx('form-body')}>
              <Input
                label='Name'
                type='text'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder='abc'
              />
              <Input
                label='Topic'
                type='text'
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                }}
                placeholder='abc'
              />
              <Input
                label='Level'
                type='text'
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
                placeholder='abc'
              />
            </div>
            <Button
              isPrimary
              preventDefault
              onClick={() => {
                dispatch(updateStudyPath({ id: id, name, level, topic }));
              }}
              className={cx('submit-btn')}
            >
              Cập nhật
            </Button>
            <div>
              <div className={cx('handler', 'list')}>
                <Button
                  isPrimary={false}
                  preventDefault
                  onClick={() => {
                    setIsOpenRouteForm(true);
                  }}
                >
                  Thêm chặng
                </Button>
                <Button
                  isPrimary={false}
                  onClick={() => {
                    if (id && selectRoute) {
                      dispatch(getStudyRoute({ path_id: id, id: selectRoute }));
                      setCurrentStudyRoute(currentRoute);
                    }
                  }}
                  preventDefault
                >
                  Xem chặng
                </Button>
                <Button
                  isPrimary={false}
                  onClick={() => {
                    if (id && selectRoute) {
                      dispatch(getStudyRoute({ path_id: id, id: selectRoute }));
                      setCurrentStudyRoute(currentRoute);
                    }
                    setIsOpenEditRouteForm(true);
                  }}
                  preventDefault
                >
                  Chỉnh sửa chặng
                </Button>
                <Button isPrimary={false} onClick={() => {}} preventDefault>
                  Xóa chặng
                </Button>
              </div>
              <table className={cx('table')}>
                <thead>
                  <tr>
                    <th></th>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Số từ</th>
                    <th>Số câu</th>
                  </tr>
                </thead>
                <tbody>
                  {listStudyRoute?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Checkbox
                          onChecked={() => {
                            setSelectRoute(item.id);
                          }}
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.vocabs?.length}</td>
                      <td>{item.sentences?.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </Col>
        <Col md={6}>
          <>
            <p className={cx('form-title')}>Chi tiết chặng</p>
            <div className={cx('handler', 'list')}>
              <Button
                isPrimary={false}
                preventDefault
                onClick={() => {
                  setIsOpenCardForm(true);
                }}
              >
                Thêm câu
              </Button>
              <Button
                isPrimary={false}
                onClick={() => {
                  setIsOpenEditCardForm(true);
                }}
                preventDefault
              >
                Chỉnh sửa câu
              </Button>
              <Button isPrimary={false} onClick={() => {}} preventDefault>
                Xóa câu
              </Button>
            </div>
            <table className={cx('table')}>
              <thead>
                <tr>
                  <th></th>
                  <th>STT</th>
                  <th>Loại</th>
                  <th>Tên</th>
                  <th>Nghĩa</th>
                </tr>
              </thead>
              <tbody>
                {currentStudyRoute?.vocabs?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Checkbox
                        onChecked={() => {
                          setCurrentStudyCard(item);
                        }}
                      ></Checkbox>
                    </td>
                    <td>{index + 1}</td>
                    <td>{item.type}</td>
                    <td>{item.display}</td>
                    <td>{item.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        </Col>
      </Row>

      {id && (
        <CreateRouteForm
          isDisplay={isOpenRouteForm}
          pathID={id}
          onClose={() => {
            setIsOpenRouteForm(false);
          }}
        />
      )}

      {id && selectRoute && (
        <EditRouteForm
          pathID={id}
          id={selectRoute}
          onClose={() => {
            setIsOpenEditRouteForm(false);
          }}
          isDisplay={isOpenEditRouteForm}
        />
      )}

      {id && selectRoute && (
        <CreateStudyCard
          pathID={id}
          routeID={selectRoute}
          onClose={() => {
            setIsOpenCardForm(false);
          }}
          isDisplay={isOpenCardForm}
        />
      )}

      {id && curretntStudyCard && selectRoute && (
        <EditCardForm
          data={curretntStudyCard}
          pathID={id}
          routeID={selectRoute}
          onClose={() => {
            setIsOpenEditCardForm(false);
          }}
          isDisplay={isOpenEditCardForm}
        />
      )}
    </div>
  );
};

export default PathDetail;
