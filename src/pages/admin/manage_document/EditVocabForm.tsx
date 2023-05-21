import React, { useState } from 'react';
import { Button, Input } from '../../../components';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { StudyCard } from '../../../types';
import Popup from '../../../components/popup/Popup';
import { updateVocab } from '../../../redux/slice/adminSlice';

const EditVocabForm = ({
  vocab,
  onClose,
  isDisplay,
}: {
  vocab: StudyCard;
  onClose: () => void;
  isDisplay: boolean;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [display, setDisplay] = useState<string>(
    vocab.display ? vocab.display : ''
  );
  const [meaning, setMeaning] = useState<string>(
    vocab.meaning ? vocab.meaning : ''
  );

  return (
    <>
      <Popup
        classNames={''}
        title={'Chỉnh sửa từ vựng'}
        onClose={onClose}
        onSubmit={() =>
          dispatch(
            updateVocab({
              id: vocab.id,
              display,
              meaning,
            })
          )
        }
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
      </Popup>
    </>
  );
};

export default EditVocabForm;
