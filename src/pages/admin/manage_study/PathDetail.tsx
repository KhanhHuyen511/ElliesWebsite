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
import CreateRouteForm from './CreateRouteForm';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-flexbox-grid';
import CreateStudyCard from './CreateStudyCard';
import EditRouteForm from './EditRouteForm';
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

  useEffect(() => {
    if (id) dispatch(getStudyPath(id));
    setListStudyRoute(data.studyRoutes);
    setName(data.name);
    setTopic(data.topic);
    setLevel(data.level);
  }, [dispatch, id, data.name, currentRoute]);

  const [name, setName] = useState<string>();
  const [level, setLevel] = useState<string>();
  const [topic, setTopic] = useState<string>();
  const [listStudyRoute, setListStudyRoute] = useState<StudyRoute[]>();
  const [currentStudyRoute, setCurrentStudyRoute] = useState<StudyRoute>();
  const [listStudyCard, setListStudyCard] = useState<StudyCard[]>();
  const [isOpenRouteForm, setIsOpenRouteForm] = useState<boolean>(false);
  const [isOpenEditRouteForm, setIsOpenEditRouteForm] =
    useState<boolean>(false);
  const [isOpenCardForm, setIsOpenCardForm] = useState<boolean>(false);
  const [selectRoute, setSelectRoute] = useState<string>();

  return (
    <div className={cx('wrapper', 'container')}>
      <Row>
        <Col md={6}>
          <form>
            <p className={cx('form-title')}>Chi tiết lộ trình học</p>
            <div className={cx('form-body')}>
              <div className={cx('input')}>
                <Input
                  label='Name'
                  type='text'
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder='abc'
                />
              </div>
              <div className={cx('input')}>
                <Input
                  label='Topic'
                  type='text'
                  value={topic}
                  onChange={(e) => {
                    setTopic(e.target.value);
                  }}
                  placeholder='abc'
                />
              </div>
              <div className={cx('input')}>
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
            </div>
            <Button
              isPrimary
              preventDefault
              onClick={() => {
                dispatch(updateStudyPath({ id: id, name, level, topic }));
              }}
            >
              Cập nhật
            </Button>
            <div>
              <div className={cx('handler')}>
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
                      console.log(currentStudyRoute);
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
                      console.log(currentStudyRoute);
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
                      <td>??</td>
                      <td>??</td>
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
            <div className={cx('handler')}>
              <Button
                isPrimary={false}
                preventDefault
                onClick={() => {
                  setIsOpenCardForm(true);
                }}
              >
                Thêm câu
              </Button>
              <Button isPrimary={false} onClick={() => {}} preventDefault>
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
                    <td></td>
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
          pathID={id}
          classNames={cx('form', 'route', { open: isOpenRouteForm })}
          onClose={() => {
            setIsOpenRouteForm(false);
          }}
        />
      )}

      {id && selectRoute && (
        <EditRouteForm
          pathID={id}
          id={selectRoute}
          classNames={cx('form', 'route', { open: isOpenEditRouteForm })}
          onClose={() => {
            setIsOpenEditRouteForm(false);
          }}
        />
      )}

      {id && selectRoute && (
        <CreateStudyCard
          pathID={id}
          routeID={selectRoute}
          classNames={cx('form', 'card', { open: isOpenCardForm })}
          onClose={() => {
            setIsOpenCardForm(false);
          }}
        />
      )}

      <div
        className={cx('modal', {
          display: isOpenCardForm || isOpenRouteForm || isOpenEditRouteForm,
        })}
      ></div>
    </div>
  );
};

export default PathDetail;
