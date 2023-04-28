import React, { useState } from 'react';
import { Button, Input } from '../../../components';
import { useDispatch } from 'react-redux';
import { setStudyRoute } from '../../../redux/slice/adminSlice';
import { AppDispatch } from '../../../redux/store';
import Popup from '../../../components/popup/Popup';

interface Props {
  classNames?: string;
  onClose: () => void;
  pathID: string;
  isDisplay: boolean;
}

const CreateRouteForm = (props: Props) => {
  const [name, setName] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Popup
        classNames={''}
        onSubmit={() =>
          setStudyRoute({ path_id: props.pathID, route: { name: name } })
        }
        onClose={props.onClose}
        title='Tạo chặng mới'
        isDisplay={props.isDisplay}
      >
        <Input
          label='Name'
          type='text'
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder='abc'
        />
      </Popup>
    </>
  );
};

export default CreateRouteForm;
