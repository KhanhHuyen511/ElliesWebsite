import classNames from "classnames/bind";
import styles from "./Checkbox.module.scss";
import { ChangeEvent } from "react";
const cx = classNames.bind(styles);

interface Props {
  label?: string;
  isChecked?: boolean;
  value?: string;
  onChecked?: (isChecked?: boolean) => void;
}

const Checkbox = (props: Props) => {
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.onChecked) {
      props.onChecked(e.target.checked);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <label>{props.label}</label>
      <input
        type="checkbox"
        checked={props.isChecked}
        onChange={(e) => onValueChange(e)}
        className={cx("checkbox")}
      ></input>
    </div>
  );
};

export default Checkbox;
