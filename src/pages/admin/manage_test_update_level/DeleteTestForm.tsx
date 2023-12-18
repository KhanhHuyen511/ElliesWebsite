import classNames from "classnames/bind";
import style from "./IndexTestUpdateLevel.module.scss";
import { Popup } from "../../../components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { deleteTestQuestion } from "../../../redux/slice/adminSlice";
const cx = classNames.bind(style);

interface DeleteTestFormProps {
  isDisplay: boolean;
  onClose: () => void;
  onReload: () => void;
  id: string;
}

const DeleteTestForm = ({
  isDisplay,
  onClose,
  onReload,
  id,
}: DeleteTestFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async () => {
    await dispatch(deleteTestQuestion(id));

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

export default DeleteTestForm;
