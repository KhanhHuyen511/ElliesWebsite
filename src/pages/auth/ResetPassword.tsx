import React, { useState } from "react";
import classNames from "classnames/bind";
import { Col } from "react-flexbox-grid";
import { toast, ToastContainer } from "react-toastify";
import styles from "./auth.module.scss";
import { Button, Input } from "../../components";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
const cx = classNames.bind(styles);

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Đã gửi email xác thực thành công!");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <Col xs={12} md={6} lg={4} xl={3} className={cx("wrapper", "container")}>
      <ToastContainer />
      <p className={cx("page-name")}>Lấy lại mật khẩu</p>
      <form onSubmit={resetPassword} className={cx("form-reset")}>
        <div className={cx("input")}>
          <Input
            label="Email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="huyen.nguyen"
          />
        </div>
        <Button
          type="submit"
          isPrimary={true}
          haveIcon={true}
          onClick={() => {}}
        >
          Gửi Email
        </Button>
      </form>
    </Col>
  );
};

export default ResetPassword;
