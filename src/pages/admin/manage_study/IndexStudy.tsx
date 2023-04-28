import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './IndexStudy.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { getStudyPath, getStudyPaths } from '../../../redux/slice/adminSlice';
import { Button, Checkbox, Input } from '../../../components';
import CreateStudyForm from './CreateStudyForm';
import { StudyPath } from '../../../types';
import { useNavigate } from 'react-router-dom';
import Popup from '../../../components/popup/Popup';
const cx = classNames.bind(styles);

const IndexStudy = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isOpenForm, setIsOpenForm] = useState(false);
  const [selectedItems, SetSelectedItems] = useState<string>();

  const listStudyPaths = useSelector(
    (state: RootState) => state.admin.listStudyPaths
  );

  useEffect(() => {
    dispatch(getStudyPaths());
  }, [dispatch, listStudyPaths]);

  const navigate = useNavigate();

  return (
    <>
      <div className={cx('container')}>
        <div className={cx('wrapper-filter')}></div>
        <div className={cx('section')}>
          <h2>Manage Study</h2>

          <div className={cx('handler')}>
            <Button
              isPrimary={false}
              onClick={() => {
                navigate('/path_detail/' + selectedItems);
              }}
            >
              Xem chi tiết
            </Button>
            <Button
              isPrimary={false}
              onClick={() => {
                setIsOpenForm(true);
              }}
            >
              Tạo mới
            </Button>
            <Button isPrimary={false} isDanger={true} onClick={() => {}}>
              Xóa
            </Button>
            <Checkbox label='Tất cả' onChecked={() => {}}></Checkbox>
          </div>

          <table className={cx('table')}>
            <thead>
              <tr>
                <th></th>
                <th>Lộ trình</th>
                <th>Số route</th>
                <th>Chủ đề</th>
                <th>Mức độ</th>
              </tr>
            </thead>
            <tbody>
              {listStudyPaths.map((item, i) => (
                <tr key={i}>
                  <td>
                    <Checkbox
                      value={item.id}
                      onChecked={() => {
                        SetSelectedItems(item.id);
                      }}
                    ></Checkbox>
                  </td>
                  <td>{item.name}</td>
                  <td>??</td>
                  <td>{item.topic}</td>
                  <td>{item.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateStudyForm
        onClose={() => {
          setIsOpenForm(false);
        }}
        isDisplay={isOpenForm}
      />
    </>
  );
};

export default IndexStudy;
