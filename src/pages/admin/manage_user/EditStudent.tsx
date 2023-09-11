import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { Input, Popup } from "../../../components";
import { Gender, Student } from "../../../types";
import style from "./IndexManageUser.module.scss";
import classNames from "classnames/bind";
import { updateAStudent } from "../../../redux/slice/adminSlice";
import { formatDate } from "../../../utils";
const cx = classNames.bind(style);

interface Props {
  data: Student;
  classNames?: string;
  onClose: () => void;
  isDisplay: boolean;
}

const EditStudent = ({ data, classNames, onClose, isDisplay }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [gender, setGender] = useState<Gender>();
  const [birth, setBirth] = useState<Date | null>();
  const [bio, setBio] = useState<string>();

  useEffect(() => {
    console.log("render");
    setName(data.name);
    setEmail(data.email);
    setGender(data.gender ? data.gender : Gender.Female);
    setBirth(data.birthday as Date | null);
    setBio(data.bio);
  }, [dispatch, data]);

  return (
    <>
      <Popup
        classNames={""}
        title={"Edit Student"}
        onClose={onClose}
        onSubmit={() => {
          dispatch(
            updateAStudent({
              data: {
                ...data,
                email,
                name,
                gender: gender as Gender,
                birthday: birth !== null ? birth : undefined,
                bio,
              },
              oldData: data,
            })
          );
        }}
        isDisplay={isDisplay}
      >
        <Input
          label="Email"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="abc"
        />
        <Input
          label="Name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="abc"
        />
        <select
          value={gender}
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
          label="Birth"
          type="date"
          value={birth ? formatDate(birth) : undefined}
          onChange={(e) => {
            setBirth(e.target.valueAsDate);
          }}
          placeholder="abc"
        />
        <Input
          label="Bio"
          type="text"
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
          placeholder="abc"
        />
      </Popup>
    </>
  );
};

export default EditStudent;
