import React from "react";
import classNames from "classnames/bind";
import style from "./IndexOnboarding.module.scss";
import { Popup } from "../../../components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { deleteOnboardingQuestion } from "../../../redux/slice/adminSlice";
const cx = classNames.bind(style);

interface CreateOnboardingFormProps {
  isDisplay: boolean;
  onClose: () => void;
  onReload: () => void;
  id: string;
}

const DeleteOnboardingForm = ({
  isDisplay,
  onClose,
  onReload,
  id,
}: CreateOnboardingFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async () => {
    await dispatch(deleteOnboardingQuestion(id));

    setTimeout(() => {
      onReload();
    }, 250);
  };

  return (
    <div>
      <Popup
        title="Are you sure delete?"
        onClose={onClose}
        onSubmit={onSubmit}
        isDisplay={isDisplay}
        classNames={cx("create-form")}
      ></Popup>
    </div>
  );
};

export default DeleteOnboardingForm;
