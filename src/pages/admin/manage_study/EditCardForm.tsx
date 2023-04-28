import React, { useState } from 'react';
import { Button, Input } from '../../../components';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { setStudyCard, updateStudyCard } from '../../../redux/slice/adminSlice';
import { StudyCard } from '../../../types';
import Popup from '../../../components/popup/Popup';

interface Props {
  classNames?: string;
  onClose: () => void;
  pathID: string;
  routeID: string;
  data: StudyCard;
  isDisplay: boolean;
}

const EditCardForm = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [display, setDisplay] = useState<string>(
    props.data.display ? props.data.display : ''
  );
  const [meaning, setMeaning] = useState<string>(
    props.data.meaning ? props.data.meaning : ''
  );

  return (
    <>
      <Popup
        classNames={''}
        title={'Chỉnh sửa câu'}
        onClose={props.onClose}
        onSubmit={() =>
          dispatch(
            updateStudyCard({
              path_id: props.pathID,
              route_id: props.routeID,
              card: { id: props.data.id, display, meaning },
            })
          )
        }
        isDisplay={props.isDisplay}
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

export default EditCardForm;
