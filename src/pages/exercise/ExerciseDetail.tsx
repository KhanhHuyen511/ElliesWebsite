import React, { useEffect, useState } from 'react';
import style from './ExerciseDetail.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { ExDetail } from '../../types';
import { Button } from '../../components';
import ExDesc from './ExDesc';
import ExerciseChild from './ExerciseChild';
import { getAEx } from '../../redux/slice/exSlice';
const cx = classNames.bind(style);

const ExerciseDetail = () => {
  let { id } = useParams();

  const data = useSelector((state: RootState) => state.ex.currentEx);
  const [exDetails, setExDetails] = useState<ExDetail[]>();
  const [currentExDetail, setCurrentExDetail] = useState<ExDetail>();
  const [currentExDetailIndex, setCurrentExDetailIndex] = useState<number>();
  const dispatch = useDispatch<AppDispatch>();
  const [isPrepare, setIsPrepare] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (id) dispatch(getAEx(id));
  }, [dispatch, id]);

  const Next = () => {
    if (currentExDetailIndex && data?.listItems) {
      const nextIndex = currentExDetailIndex + 1;
      if (nextIndex <= data?.listItems.length) {
        setCurrentExDetailIndex(nextIndex);
        setCurrentExDetail(data.listItems[currentExDetailIndex]);
      } else {
        setCurrentExDetail(undefined);
        setIsFinished(true);
        // update history of user
        // if (id) dispatch(setStudyRouteState({ routeID: id, userID }));
      }
    }
  };

  return (
    <>
      <div className='container'>
        {isPrepare && <p className={cx('title')}>Luyện tập - {data?.title}</p>}
        {isPrepare && !exDetails && data && (
          <>
            <ExDesc data={data}></ExDesc>
            <Button
              isPrimary
              onClick={() => {
                if (id && data.listItems && data.listItems.length > 0) {
                  setCurrentExDetail(data.listItems[0]);
                  setCurrentExDetailIndex(1);
                  setIsPrepare(false);
                }
              }}
              className={cx('submit')}
            >
              Bắt đầu
            </Button>
          </>
        )}
        {currentExDetail && (
          <>
            <ExerciseChild data={currentExDetail} onNext={Next}></ExerciseChild>
            <p className={cx('page-number')}>
              <span>{currentExDetailIndex}/</span>
              {data?.listItems?.length}
            </p>
          </>
        )}
        {/* {studyCards && <StudyFinish cards={studyCards}></StudyFinish>} */}
        {/* {isFinished && studyCards && (
          <>
            <StudyFinish cards={studyCards}></StudyFinish>
            <div className={cx('cta-finish')}>
              <Button
                isPrimary={false}
                onClick={() => {
                  setStudyCards(undefined);
                  setIsFinished(false);
                }}
                className={cx('cta-finish-btn')}
              >
                Xem lại
              </Button>
              <Button
                isPrimary
                onClick={() => {}}
                icon='boilt'
                className={cx('cta-finish-btn')}
              >
                Luyện tập
              </Button>
            </div>
            <div className={cx('home')}>
              <HomeIcon
                width={48}
                height={48}
                className={cx('home-icon')}
                onClick={() => {
                  navigate('/');
                }}
              ></HomeIcon>
            </div>
          </>
        )} */}
      </div>
    </>
  );
};

export default ExerciseDetail;
