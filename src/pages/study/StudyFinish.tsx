import React from 'react';
import style from './StudyFinish.module.scss';
import classNames from 'classnames/bind';
import { HeartIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components';
import { StudyCard } from '../../types';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(style);

const StudyFinish = ({ cards }: { cards: StudyCard[] }) => {
  const playAudio = (audio: string) => {
    getDownloadURL(ref(storage, `audios/${audio}`)).then((url) => {
      var sound = new Audio(audio);
      sound.play();
    });
  };

  return (
    <>
      <div>
        <p className={cx('studied-text')}>Bạn đã học được</p>
        <table className={cx('list-card')}>
          <thead>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </thead>
          <tbody>
            {cards.map((item) => (
              <tr>
                <td>
                  <span className={cx('card-display')}>{item.display}</span>
                </td>
                <td>
                  <div className={cx('card-pronoun')}>
                    <SpeakerWaveIcon
                      width={24}
                      height={24}
                      onClick={() => {
                        playAudio(item.audio);
                      }}
                    />
                    <p className={cx('pronoun-text')}>??</p>
                  </div>
                </td>
                <td>
                  <p className={cx('card-meaning')}>{item.meaning}</p>
                </td>
                <td>
                  <HeartIcon width={24} height={24}></HeartIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={cx('cta')}>
          <Button
            isPrimary={false}
            onClick={() => {}}
            className={cx('cta-btn')}
          >
            Xem lại
          </Button>
          <Button
            isPrimary
            onClick={() => {}}
            icon='boilt'
            className={cx('cta-btn')}
          >
            Luyện tập
          </Button>
        </div>
      </div>
    </>
  );
};

export default StudyFinish;
