import React, { useState } from 'react';
import { Input } from '../../../components';
import Popup from '../../../components/popup/Popup';

interface Props {
  classNames?: string;
  onClose: () => void;
  isDisplay: boolean;
}

const CreateVocabForm = (props: Props) => {
  const [display, setDisplay] = useState<string>('');
  const [meaning, setMeaning] = useState<string>('');
  const [image, setImage] = useState<any>();
  const [audio, setAudio] = useState<any>();

  return (
    <>
      <Popup
        title={'Tạo từ vựng mới'}
        classNames={''}
        onClose={props.onClose}
        onSubmit={() =>
          // dispatch(
          //   setStudyCard({
          //     path_id: props.pathID,
          //     route_id: props.routeID,
          //     card: { display, meaning, imageFile: image, audio },
          //   })
          // )
          {}
        }
        isDisplay={props.isDisplay}
      >
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

        <Input
          type='file'
          label={'Thêm âm thanh'}
          placeholder={''}
          onChange={(e) => {
            if (e.target.files) setAudio(e.target.files[0]);
          }}
        ></Input>
        {audio && <audio controls src={URL.createObjectURL(audio)}></audio>}
      </Popup>
    </>
  );
};

export default CreateVocabForm;
