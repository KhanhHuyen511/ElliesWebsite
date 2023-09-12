import React, { useState } from "react";
import { Input, Popup, TextArea } from "../../components";
import { Gender, Student } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updateCurrentStudent } from "../../redux/slice/studentSlice";
import { formatDate } from "../../utils";
import style from "./Profile.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

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
        title={"Chỉnh sửa thông tin cá nhân"}
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
          label={"Email"}
          value={email}
          placeholder={"abc@gm.uit.edu.vn"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          label={"Tên"}
          value={name}
          placeholder={""}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {/* <Input
          label={"Giới tính"}
          value={gender}
          placeholder={""}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        /> */}
        <select
          defaultValue={gender}
          className={cx("gender")}
          onChange={(e) => {
            setGender(e.target.value as unknown as Gender);
          }}
        >
          <option value={Gender.Male}>{Gender[0]}</option>
          <option value={Gender.Female}>{Gender[1]}</option>
          <option value={Gender.Others}>{Gender[2]}</option>
        </select>
        <Input
          label={"Ngày sinh"}
          type="date"
          value={birth ? formatDate(birth) : undefined}
          placeholder={""}
          onChange={(e) => {
            setBirth(e.target.valueAsDate);
          }}
        />
        <TextArea
          label={"Tiểu sử"}
          value={bio}
          placeholder={"Nói gì đó về bạn"}
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />
      </Popup>
    </>
  );
};

export default EditProfile;
