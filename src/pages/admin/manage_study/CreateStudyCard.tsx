import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreateRouteForm.module.scss';
import { Button, Input } from '../../../components';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { setStudyCard } from '../../../redux/slice/adminSlice';
const cx = classNames.bind(styles);

interface Props {
  classNames?: string;
  onClose: () => void;
  pathID: string;
  routeID: string;
}

const CreateStudyCard = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [display, setDisplay] = useState<string>('');
  const [meaning, setMeaning] = useState<string>('');

  return (
    <form className={cx(props.classNames)}>
      Thêm câu
      <Input
        type='text'
        onChange={(e) => {
          setDisplay(e.target.value);
        }}
        label={'Display'}
        placeholder={'abc'}
      ></Input>
      <Input
        type='text'
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
            setStudyCard({
              path_id: props.pathID,
              route_id: props.routeID,
              card: { display, meaning },
            })
          );
          props.onClose();
        }}
        preventDefault
      ></Button>
      <Button isPrimary={false} onClick={props.onClose} preventDefault></Button>
    </form>
  );
};

export default CreateStudyCard;
