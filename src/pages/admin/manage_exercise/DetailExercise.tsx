import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Input, TextArea } from '../../../components';
import style from './DetailExercise.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-flexbox-grid';
import { Ex, ExDetail } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { getAExercise, updateAExercise } from '../../../redux/slice/adminSlice';
import CreateExDetail from './CreateExDetail';
const cx = classNames.bind(style);

const DetailExercise = () => {
  const dispatch = useDispatch<AppDispatch>();

  const data: Ex | undefined = useSelector(
    (state: RootState) => state.admin.currentEx
  );

  let { id } = useParams();

  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [isOpenCreateForm, setIsOpenCreateForm] = useState<boolean>(false);

  useEffect(() => {
    if (id) dispatch(getAExercise(id));
    setTitle(data?.title);
    setDescription(data?.description);
  }, [dispatch, id, data?.title, data?.description]);

  return (
    <>
      <div className='container'>
        {data && (
          <>
            <Row>
              <Col md={6}>
                <form>
                  <p className={cx('form-title')}>Chi tiết bài luyện tập</p>
                  <div className={cx('form-body')}>
                    <Input
                      label='Chủ đề'
                      type='text'
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      placeholder='abc'
                    />
                    <TextArea
                      label='Mô tả'
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      placeholder='abc'
                      classNames={cx('textarea')}
                    />
                  </div>
                  <Button
                    isPrimary
                    preventDefault
                    onClick={() => {
                      if (id)
                        dispatch(updateAExercise({ id, title, description }));
                    }}
                    className={cx('submit-btn')}
                  >
                    Cập nhật
                  </Button>
                </form>
              </Col>
              <Col md={6}>
                <form>
                  <div className={cx('handler', 'list')}>
                    <Button
                      isPrimary={false}
                      preventDefault
                      onClick={() => {
                        setIsOpenCreateForm(true);
                      }}
                    >
                      Thêm câu hỏi
                    </Button>
                    <Button
                      isPrimary={false}
                      onClick={() => {
                        // if (id && selectRoute) {
                        //   dispatch(getStudyRoute({ path_id: id, id: selectRoute }));
                        //   setCurrentStudyRoute(currentRoute);
                        // }
                      }}
                      preventDefault
                    >
                      Xem câu hỏi
                    </Button>
                    <Button
                      isPrimary={false}
                      onClick={() => {
                        // if (id && selectRoute) {
                        //   dispatch(getStudyRoute({ path_id: id, id: selectRoute }));
                        //   setCurrentStudyRoute(currentRoute);
                        // }
                        // setIsOpenEditRouteForm(true);
                      }}
                      preventDefault
                    >
                      Chỉnh sửa câu hỏi
                    </Button>
                    <Button isPrimary={false} onClick={() => {}} preventDefault>
                      Xóa câu hỏi
                    </Button>
                  </div>
                  <table className={cx('table')}>
                    <thead>
                      <tr>
                        <th></th>
                        <th>STT</th>
                        <th>Từ vựng</th>
                        <th>Loại câu hỏi</th>
                        <th>Đáp án</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.listItems?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Checkbox
                              onChecked={() => {
                                // setSelectRoute(item.id);
                              }}
                            />
                          </td>
                          <td>{index + 1}</td>
                          <td>{item.vocab?.display}</td>
                          <td>{item.type}</td>
                          <td>{item.answer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </form>
              </Col>
            </Row>
            {id && isOpenCreateForm && title && (
              <CreateExDetail
                id={id}
                title={data.title}
                isDisplay={isOpenCreateForm}
                onClose={() => setIsOpenCreateForm(false)}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DetailExercise;
