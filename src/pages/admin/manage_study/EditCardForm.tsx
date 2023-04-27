import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './EditCardForm.module.scss';
import { Button, Input } from '../../../components';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { setStudyCard, updateStudyCard } from '../../../redux/slice/adminSlice';
import { StudyCard } from '../../../types';
const cx = classNames.bind(styles);

interface Props {
  classNames?: string;
  onClose: () => void;
  pathID: string;
  routeID: string;
  data: StudyCard;
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
      <form className={cx(props.classNames)}>
        Thêm câu
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
        <Button
          isPrimary
          onClick={() => {
            dispatch(
              updateStudyCard({
                path_id: props.pathID,
                route_id: props.routeID,
                card: { id: props.data.id, display, meaning },
              })
            );
            props.onClose();
          }}
          preventDefault
        ></Button>
        <Button
          isPrimary={false}
          onClick={props.onClose}
          preventDefault
        ></Button>
      </form>
    </>
  );
};

export default EditCardForm;
