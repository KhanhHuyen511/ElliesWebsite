import { useState } from 'react';
import style from './ExerciseChild.module.scss';
import classNames from 'classnames/bind';
import React from 'react';
import { ExDetail } from '../../types';
import { VocabCard } from '../../components';
const cx = classNames.bind(style);

const ExerciseChild = ({ data }: { data: ExDetail }) => {
  return (
    <>
      <div>
        <p className={cx('question')}>{data.question}</p>
        {data.vocab && <VocabCard card={data.vocab}></VocabCard>}
      </div>
    </>
  );
};

export default ExerciseChild;
