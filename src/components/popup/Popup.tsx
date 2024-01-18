import React, { FormEvent, ReactNode } from "react";
import styles from "./Popup.module.scss";
import classNames from "classnames/bind";
import Button from "../button/Button";
const cx = classNames.bind(styles);

interface Props {
  classNames?: string;
  title: ReactNode;
  children?: any;
  onClose?: () => void;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  isDisplay?: boolean;
  closeLabel?: string;
}

const Popup = ({ closeLabel, ...props }: Props) => {
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    props.onSubmit && props.onSubmit(e);
    props.onClose && props.onClose();

    return false;
  };
  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className={cx("form", { open: props.isDisplay }, props.classNames)}
      >
        <div className={cx("form-title")}>{props.title}</div>
        <div className={cx("form-body")}>
          {props.children}
          <div className={cx("form-cta")}>
            {props.onSubmit && (
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
            )}
            {props.onClose && (
              <Button isPrimary={false} onClick={props.onClose} preventDefault>
                {closeLabel || "Cancel"}
              </Button>
            )}
          </div>
        </div>
      </form>

      <div className={cx("modal", { display: props.isDisplay })}></div>
    </>
  );
};

export default Popup;
