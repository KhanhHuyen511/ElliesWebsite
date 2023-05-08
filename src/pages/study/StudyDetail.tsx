import React, { useEffect, useState } from 'react';
import { StudyRoute } from '../../types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getStudyRoute } from '../../redux/slice/studySlice';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebase/config';

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
      <div>{route?.id}</div>
      <img src={img} alt='' />
    </>
  );
};

export default StudyDetail;
