import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getStudyRoute } from '../../redux/slice/studySlice';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebase/config';
import style from './StudyDetail.module.scss';
import classNames from 'classnames/bind';
import { Button } from '../../components';
const cx = classNames.bind(style);

const StudyDetail = () => {
  let { id } = useParams();

  const route = useSelector((state: RootState) => state.study.currentRoute);
  const dispatch = useDispatch<AppDispatch>();
  const [img, setImg] = useState('');

  useEffect(() => {
    if (id) dispatch(getStudyRoute(id));
  }, [dispatch, id]);

  getDownloadURL(ref(storage, `images/${route.imageFile}`)).then((url) => {
    setImg(url);
  });

  return (
    <>
      <div className='container'>
        <p className={cx('title')}>Chặng {route.name} - ?</p>
        <div className={cx('section-title')}>Mô tả</div>
        <div className={cx('desc')}>??</div>
        <div className={cx('section-title')}>Đạt được sau lộ trình</div>
        <div className={cx('goal')}>??</div>
        <div className={cx('image')}>
          <img src={img} alt='' />
        </div>
        <Button isPrimary onClick={() => {}} className={cx('submit')}>
          Bắt đầu
        </Button>
      </div>
    </>
  );
};

export default StudyDetail;
