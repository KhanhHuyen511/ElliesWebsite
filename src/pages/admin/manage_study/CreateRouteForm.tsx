import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setStudyRoute } from '../../../redux/slice/adminSlice';
import { AppDispatch } from '../../../redux/store';
import Popup from '../../../components/popup/Popup';
import { Input } from '../../../components';

interface Props {
  classNames?: string;
  onClose: () => void;
  pathID: string;
  isDisplay: boolean;
}

const CreateRouteForm = (props: Props) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState<any>();

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Popup
        classNames={''}
        onSubmit={() =>
          dispatch(
            setStudyRoute({
              path_id: props.pathID,
              route: {
                name: name,
                imageFile: image,
              },
            })
          )
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

        <Input
          type='file'
          label={'Thêm ảnh'}
          placeholder={''}
          onChange={(e) => {
            if (e.target.files) setImage(e.target.files[0]);
          }}
        ></Input>
        {image && (
          <div>
            <img src={URL.createObjectURL(image)} alt='' />
          </div>
        )}
      </Popup>
    </>
  );
};

export default CreateRouteForm;
