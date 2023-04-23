import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreateRouteForm.module.scss';
import { Button, Input } from '../../../components';
import { useDispatch } from 'react-redux';
import { setStudyRoute } from '../../../redux/slice/adminSlice';
import { AppDispatch } from '../../../redux/store';
const cx = classNames.bind(styles);

interface Props {
  classNames?: string;
  onClose: () => void;
  pathID: string;
}

const CreateRouteForm = (props: Props) => {
  const [name, setName] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <form className={cx(props.classNames)}>
        <Input
          label='Name'
          type='text'
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder='abc'
        />
        Thêm chặng
        <Button
          isPrimary
          preventDefault
          onClick={() => {
            dispatch(
              setStudyRoute({ path_id: props.pathID, route: { name: name } })
            );
            props.onClose();
          }}
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

export default CreateRouteForm;
