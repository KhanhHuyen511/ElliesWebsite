import React, { useState } from 'react';
import { Input, Popup, TextArea } from '../../components';
import { Student } from '../../types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { updateCurrentStudent } from '../../redux/slice/studentSlice';
import { join } from 'path';
import { formatDate } from '../../utils';

const EditProfile = ({
  data,
  isDisplay,
  onClose,
}: {
  data: Student;
  isDisplay: boolean;
  onClose: () => void;
}) => {
  const [email, setEmail] = useState(data?.email);
  const [name, setName] = useState(data?.name);
  const [gender, setGender] = useState(data?.gender);
  const [bio, setBio] = useState(data?.bio);
  const [birth, setBirth] = useState<Date | null>(
    data?.birthday ? data.birthday : null
  );

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Popup
        title={'Chỉnh sửa thông tin cá nhân'}
        onClose={onClose}
        onSubmit={() => {
          dispatch(
            updateCurrentStudent({
              data: {
                ...data,
                email,
                name,
                birthday: birth ? birth : undefined,
                gender,
                bio,
              },
              oldData: { ...data },
            })
          );
        }}
        isDisplay={isDisplay}
      >
        <Input
          label={'Email'}
          value={email}
          placeholder={'abc@gm.uit.edu.vn'}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          label={'Tên'}
          value={name}
          placeholder={''}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          label={'Giới tính'}
          value={gender}
          placeholder={''}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
        <Input
          label={'Ngày sinh'}
          type='date'
          value={birth ? formatDate(birth) : undefined}
          placeholder={''}
          onChange={(e) => {
            setBirth(e.target.valueAsDate);
          }}
        />
        <TextArea
          label={'Tiểu sử'}
          value={bio}
          placeholder={'Nói gì đó về bạn'}
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />
      </Popup>
    </>
  );
};

export default EditProfile;
