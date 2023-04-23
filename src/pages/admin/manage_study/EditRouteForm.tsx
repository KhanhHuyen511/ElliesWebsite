import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './EditRouteForm.module.scss';
import { Button, Input } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStudyRoute,
  setStudyRoute,
  updateStudyRoute,
} from '../../../redux/slice/adminSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { StudyRoute } from '../../../types';
const cx = classNames.bind(styles);

interface Props {
  classNames?: string;
  onClose: () => void;
  pathID: string;
  id: string;
}

const EditRouteForm = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const currentRoute: StudyRoute = useSelector(
    (state: RootState) => state.admin.currentStudyRoute
  );

  console.log(currentRoute);

  useEffect(() => {
    setName(currentRoute.name);
  }, [dispatch, currentRoute.name]);

  const [name, setName] = useState<string>();

  return (
    <>
      <form className={cx(props.classNames)}>
        <Input
          label='Name'
          type='text'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder='abc'
        />
        Cập nhật
        <Button
          isPrimary
          preventDefault
          onClick={() => {
            dispatch(
              updateStudyRoute({
                path_id: props.pathID,
                route: { id: props.id, name: name },
              })
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

export default EditRouteForm;
