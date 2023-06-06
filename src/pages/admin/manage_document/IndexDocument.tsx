import React, { useEffect, useState } from 'react';
import styles from './IndexDocument.module.scss';
import classNames from 'classnames/bind';
import VocabDoc from './VocabDoc';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { getSentences, getVocabs } from '../../../redux/slice/adminSlice';
import { CategoryPanel } from '../../../components';
import {
  AcademicCapIcon,
  BookOpenIcon,
  QueueListIcon,
  SpeakerWaveIcon,
} from '@heroicons/react/24/outline';
import { StudyCardType } from '../../../types';

const cx = classNames.bind(styles);

const IndexDocument = () => {
  const dispatch = useDispatch<AppDispatch>();

  const listVocabs = useSelector((state: RootState) => state.admin.listVocabs);
  const listSentences = useSelector(
    (state: RootState) => state.admin.listSentences
  );

  const [currentType, setCurrentType] = useState('vocabs');

  useEffect(() => {
    dispatch(getVocabs());
    dispatch(getSentences());
  }, [dispatch]);

  return (
    <>
      <div className={cx('container')}>
        <div className={cx('wrapper-filter')}></div>
        <div className={cx('section')}>
          <h2>Manage Document</h2>

          <ul className={cx('doc-cate-wrapper')}>
            <CategoryPanel
              label={'Vocabs'}
              isActive={currentType === 'vocabs'}
              classNames={cx('cate-item')}
              icon={<AcademicCapIcon />}
              onClick={() => setCurrentType('vocabs')}
            />
            <CategoryPanel
              label={'Sentences'}
              isActive={currentType === 'sentences'}
              classNames={cx('cate-item')}
              icon={<QueueListIcon />}
              onClick={() => setCurrentType('sentences')}
            />
            <CategoryPanel
              label={'Audios'}
              isActive={currentType === 'audios'}
              classNames={cx('cate-item')}
              icon={<SpeakerWaveIcon />}
              onClick={() => setCurrentType('audios')}
            />
            <CategoryPanel
              label={'Books'}
              isActive={currentType === 'books'}
              classNames={cx('cate-item')}
              icon={<BookOpenIcon />}
              onClick={() => setCurrentType('books')}
            />
          </ul>

          {currentType === 'vocabs' ? (
            <VocabDoc list={listVocabs} type={StudyCardType.Vocab} />
          ) : currentType === 'sentences' ? (
            <VocabDoc list={listSentences} type={StudyCardType.Sentence} />
          ) : (
            // <VocabDoc list={listSentences} />
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default IndexDocument;
