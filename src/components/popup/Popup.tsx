import React, { FormEvent } from "react";
import styles from "./Popup.module.scss";
import classNames from "classnames/bind";
import Button from "../button/Button";
const cx = classNames.bind(styles);

interface Props {
  classNames?: string;
  title: string;
  children?: any;
  onClose: () => void;
  // onSubmit: () => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  isDisplay?: boolean;
}

const Popup = (props: Props) => {
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    props.onSubmit(e);
    props.onClose();

    return false;
  };
  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className={cx("form", { open: props.isDisplay }, props.classNames)}
      >
        <p className={cx("form-title")}>{props.title}</p>
        <div className={cx("form-body")}>
          {props.children}
          <div className={cx("form-cta")}>
            <Button
              type="submit"
              isPrimary
              // preventDefault
              // onClick={() => {
              //   props.onSubmit();
              //   props.onClose();
              // }}
            >
              Submit
            </Button>
            <Button isPrimary={false} onClick={props.onClose} preventDefault>
              Cancel
            </Button>
          </div>
        </div>
      </form>

      <div className={cx("modal", { display: props.isDisplay })}></div>
    </>
  );
};

export default Popup;
