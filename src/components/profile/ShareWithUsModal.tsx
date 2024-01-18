import React from "react";
import Popup from "../popup/Popup";
import style from "./ShareWithUsModal.module.scss";
import classNames from "classnames/bind";
import { TextArea } from "../../components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addShareWithUs } from "../../redux/slice/adminSlice";
const cx = classNames.bind(style);

interface ShareWithUsModalProps {
  userId: string;
  isDisplay: boolean;
  onClose: () => void;
}

const ShareWithUsModal = ({
  userId,
  isDisplay,
  onClose,
}: ShareWithUsModalProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { register, watch, getValues } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const handleSubmit = () => {
    if (userId && watch("message"))
      dispatch(addShareWithUs({ id: userId, message: getValues("message") }));
  };

  return (
    <Popup
      title="Share with us"
      isDisplay={isDisplay}
      onClose={onClose}
      onSubmit={handleSubmit}
      classNames={cx("popup")}
    >
      <TextArea
        label="Message"
        placeholder="Fill your message"
        register={register("message")}
      />
    </Popup>
  );
};

export default ShareWithUsModal;
