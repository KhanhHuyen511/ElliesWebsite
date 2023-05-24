import React, { useEffect } from 'react';
import style from './IndexExercise.module.scss';
import classNames from 'classnames/bind';
import { Button, Checkbox } from '../../../components';
import { Ex } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { getExercises } from '../../../redux/slice/adminSlice';
const cx = classNames.bind(style);

const IndexExercise = () => {
  const dispatch = useDispatch<AppDispatch>();
  const list = useSelector((state: RootState) => state.admin.listEx);

  useEffect(() => {
    dispatch(getExercises());
  }, [dispatch]);

  return (
    <>
      <div className={cx('container')}>
        <div className={cx('wrapper-filter')}></div>
        <div className={cx('section')}>
          <h2>Manage Exercise</h2>
          <>
            <table className={cx('table')}>
              <thead>
                <tr>
                  <th></th>
                  <th>Chủ đề</th>
                  <th>Mô tả</th>
                  <th>Số câu hỏi</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item, i) => (
                    <tr key={i}>
                      <td>
                        {item.id && (
                          <Checkbox
                            value={item.id}
                            // isChecked={getCheckedItems(item)}
                            onChecked={() => {
                              // setSelectedItem(item);
                            }}
                          ></Checkbox>
                        )}
                      </td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.listItems?.length}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        </div>
      </div>
    </>
  );
};

export default IndexExercise;
