import React, { useState } from 'react';
import { Button, Input } from '../../../components';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { StudyCard, StudyCardType } from '../../../types';
import Popup from '../../../components/popup/Popup';
import { updateSentence, updateVocab } from '../../../redux/slice/adminSlice';
import style from './IndexDocument.module.scss';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../../firebase/config';

const EditVocabForm = ({
  vocab,
  onClose,
  isDisplay,
  type,
}: {
  vocab: StudyCard;
  onClose: () => void;
  isDisplay: boolean;
  type: StudyCardType;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [display, setDisplay] = useState<string>(
    vocab.display ? vocab.display : ''
  );
  const [meaning, setMeaning] = useState<string>(
    vocab.meaning ? vocab.meaning : ''
  );
  const [image, setImage] = useState<any>(
    vocab.imageFile &&
      getDownloadURL(ref(storage, `images/${vocab.imageFile}`)).then((url) => {
        setImage(url);
      })
  );
  const [newImage, setNewImage] = useState<any>();

  const [audio, setAudio] = useState<any>(
    vocab.audio &&
      getDownloadURL(ref(storage, `audios/${vocab.audio}`)).then((url) => {
        setAudio(url);
      })
  );

  const [newAudio, setNewAudio] = useState<any>();

  return (
    <>
      <Popup
        classNames={''}
        title={'Chỉnh sửa từ vựng'}
        onClose={onClose}
        onSubmit={() => {
          switch (type) {
            case StudyCardType.Vocab:
              dispatch(
                updateVocab({
                  data: {
                    id: vocab.id,
                    display,
                    meaning,
                    imageFile: newImage,
                    audio: newAudio,
                  },
                  oldImage: vocab.imageFile,
                  oldAudio: vocab.audio,
                })
              );
              break;
            case StudyCardType.Sentence:
              dispatch(
                updateSentence({
                  data: {
                    id: vocab.id,
                    display,
                    meaning,
                    imageFile: newImage,
                    audio: newAudio,
                  },
                  oldImage: vocab.imageFile,
                  oldAudio: vocab.audio,
                })
              );
              break;
            default:
              break;
          }
        }}
        isDisplay={isDisplay}
      >
        <Input
          type='text'
          value={display}
          onChange={(e) => {
            setDisplay(e.target.value);
          }}
          label={'Display'}
          placeholder={'abc'}
        ></Input>
        <Input
          type='text'
          value={meaning}
          onChange={(e) => {
            setMeaning(e.target.value);
          }}
          label={'Meaning'}
          placeholder={'abc'}
        ></Input>
        <Input
          type='file'
          label={'Cập nhật ảnh'}
          placeholder={''}
          onChange={(e) => {
            if (e.target.files) setNewImage(e.target.files[0]);
          }}
        ></Input>
        {!newImage && image && (
          <div className={style.image}>
            <img src={image} alt='' />
          </div>
        )}
        {newImage && (
          <div className={style.image}>
            <img src={URL.createObjectURL(newImage)} alt=''></img>
          </div>
        )}
        <Input
          type='file'
          label={'Cập nhật âm thanh'}
          placeholder={''}
          onChange={(e) => {
            if (e.target.files) setNewAudio(e.target.files[0]);
          }}
        ></Input>
        {!newAudio && audio && <audio controls src={audio}></audio>}
        {newAudio && (
          <audio controls src={URL.createObjectURL(newAudio)}></audio>
        )}
      </Popup>
    </>
  );
};

export default EditVocabForm;
