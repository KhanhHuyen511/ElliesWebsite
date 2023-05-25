import { useEffect, useState } from 'react';
import style from './ExerciseChild.module.scss';
import classNames from 'classnames/bind';
import React from 'react';
import { ExDetail, GameType } from '../../types';
import { AnswerPanel, Button, VocabCard } from '../../components';
import { Col, Row } from 'react-flexbox-grid';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
const cx = classNames.bind(style);

const ExerciseChild = ({
  data,
  onNext,
}: {
  data: ExDetail;
  onNext: (result: ExDetail) => void;
}) => {
  const [selectedItem, setSelectedItem] = useState<string>();
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    setSelectedItem(undefined);
    setIsDone(false);
  }, [data]);

  const checkAnswer = (selected: string) => {
    if (selected !== selectedItem) {
      setSelectedItem(selected);
    }
  };

  return (
    <>
      <div className={cx('wrapper')}>
        <p className={cx('question')}>{data.question}</p>
        {data.vocab && (
          <VocabCard
            card={data.vocab}
            isQuestion
            isShowVN={data.type === GameType[1]}
          ></VocabCard>
        )}
        <Row className={cx('options')}>
          {data.options &&
            data.options.length > 0 &&
            data.options.map((item) => (
              <Col
                xs={6}
                className={cx('item')}
                onClick={() => {
                  checkAnswer(item);
                }}
              >
                <AnswerPanel
                  isActive={item === selectedItem}
                  isTrue={isDone && item === data.answer}
                  isFalse={
                    isDone && item !== data.answer && item === selectedItem
                  }
                  isDisable={isDone}
                >
                  {item}
                </AnswerPanel>
              </Col>
            ))}
        </Row>
        <div className={cx('cta')}>
          <Button
            isPrimary={false}
            onClick={() => {
              if (!isDone) setIsDone(true);
              else {
                onNext({
                  ...data,
                  exRight: data.answer === selectedItem,
                });
              }
            }}
            haveIcon
          ></Button>
        </div>
        {isDone && data.answer === selectedItem ? (
          <CheckIcon className={cx('result-icon')} />
        ) : (
          isDone && (
            <XMarkIcon className={cx('result-icon', 'false')}></XMarkIcon>
          )
        )}
      </div>
    </>
  );
};

export default ExerciseChild;
