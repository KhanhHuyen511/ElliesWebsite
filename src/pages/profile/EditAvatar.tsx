import React, { useEffect, useState } from "react";
import { Button, Input, Popup } from "../../components";
import { Student } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
import style from "./Profile.module.scss";
import classNames from "classnames/bind";
import { updateAvatar } from "../../redux/slice/studentSlice";
const cx = classNames.bind(style);

const EditAvatar = ({
  data,
  isDisplay,
  onClose,
}: {
  data: Student;
  isDisplay: boolean;
  onClose: () => void;
}) => {

  const [img, setImg] = useState("");
  const [newImg, setNewImg] = useState<File>();

  useEffect(() => {
    if (data?.avatar)
      getDownloadURL(ref(storage, `images/${data.avatar}`)).then((url) => {
        setImg(url);
      });
  }, [data.avatar]);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Popup

        title={"Chỉnh sửa ảnh đại diện"}
        onClose={onClose}
        onSubmit={() => {
          if (data && newImg)
            dispatch(updateAvatar({ data, newAvatar: newImg }));
        }}
        isDisplay={isDisplay}
      >
        <div className={cx("avatar-wrapper")}>
          <div className={cx("avatar")}>

            <img
              src={
                newImg
                  ? URL.createObjectURL(newImg)
                  : img
                  ? img

                  : "/images/avatar.png"
              }
              className={cx("avatar-img")}
              alt=""
              width={"100%"}
            />
          </div>
          <Input
            type="file"
            onChange={(e) => {
              if (e.target.files) setNewImg(e.target.files[0]);
            }}
            label={""}
            placeholder={""}
          ></Input>
        </div>
      </Popup>
    </>
  );
};

export default EditAvatar;
