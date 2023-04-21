import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './IndexStudy.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { getStudyPaths } from '../../../redux/slice/adminSlice';
import { Button, Checkbox, Input } from '../../../components';
import CreateStudyForm from './CreateStudyForm';
import EditStudyForm from './EditStudyForm';
const cx = classNames.bind(styles);

const CreateStudy = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpenViewForm, setIsOpenViewForm] = useState(false);
  const [selectedItems, SetSelectedItems] = useState<string | string[]>();

  const listStudyPaths = useSelector(
    (state: RootState) => state.admin.listStudyPaths
  );

  useEffect(() => {
    dispatch(getStudyPaths());
  }, [dispatch]);

  console.log(selectedItems);

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
                setIsOpenViewForm(true);
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
            <Button
              isPrimary={false}
              onClick={() => {
                setIsOpenForm(false);
              }}
            >
              Chỉnh sửa
            </Button>
            <Button isPrimary={false} isDanger={true} onClick={() => {}}>
              Xóa
            </Button>
            <label>Tất cả</label>
            <input type='checkbox' checked={false}></input>
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
        classNames={cx('form', 'create', { open: isOpenForm })}
        onClose={() => {
          setIsOpenForm(false);
        }}
      />

      <EditStudyForm
        classNames={cx('form', 'edit', { open: isOpenViewForm })}
        onClose={() => {
          setIsOpenViewForm(false);
        }}
      />

      <div
        className={cx('modal', { display: isOpenForm || isOpenViewForm })}
      ></div>
    </>
  );
};

export default CreateStudy;
