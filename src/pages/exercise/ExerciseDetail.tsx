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
                  // dispatch(getStudyCards(id)).then((data) => {
                  //   setStudyCards(data.payload as StudyCard[]);
                  //   if (
                  //     data.payload &&
                  //     (data.payload as StudyCard[]).length > 0
                  //   ) {
                  //     setCurrentCard((data.payload as StudyCard[])[0]);
                  //     setCurrentCardIndex(1);
                  //   }
                  // }
                  // );
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
            <ExerciseChild data={currentExDetail}></ExerciseChild>
            <p className={cx('page-number')}>
              <span>{currentExDetailIndex}/</span>
              {data?.listItems?.length}
            </p>
            {/* <div className={cx('cta')}>
              <Button
                isPrimary={false}
                onClick={() => PrevCard()}
                icon='prev'
              ></Button>
              <Button
                isPrimary={false}
                onClick={() => NextCard()}
                haveIcon
              ></Button>
            </div> */}
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
