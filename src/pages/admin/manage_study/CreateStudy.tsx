import React from 'react';
import classNames from 'classnames/bind';
import styles from './CreateStudy.module.scss';
const cx = classNames.bind(styles);

const CreateStudy = () => {
  return (
    <>
      <div className={cx('container')}>
        <div className={cx('wrapper-filter')}></div>
        <div className={cx('section')}>
          <h2>abcd</h2>
          <table className={cx('table')}>
            <tr>
              <th>Lộ trình</th>
              <th>Số route</th>
              <th>Chủ đề</th>
              <th>Mức độ</th>
            </tr>
            <tr>
              <td>lotrinh</td>
              <td>soroute</td>
              <td>chude</td>
              <td>mucdo</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default CreateStudy;
