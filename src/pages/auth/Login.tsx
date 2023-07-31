import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { Button, Input } from "../../components";
import { Col } from "react-flexbox-grid";
import styles from "./auth.module.scss";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getCurrentStudent } from "../../redux/slice/studentSlice";
import { Student } from "../../types";

const cx = classNames.bind(styles);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const isValid = (e: React.FormEvent) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast.success("Đăng nhập thành công!");

        return user;
      })
      .then(async (user) => {
        // check if this login is first time
        // if yes
        await dispatch(getCurrentStudent(user.uid)).then((data) => {
          if (data.payload && (data.payload as Student).level === undefined) {
            navigate("/onboarding");
          } else {
            // if no
            navigate("/");
          }
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const loginByFacebook = () => {
    signInWithPopup(auth, new FacebookAuthProvider())
      .then((result) => {
        toast.success("Đăng nhập thành công!");
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const loginByGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((result) => {
        toast.success("Đăng nhập thành công!");
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <Col xs={12} md={6} lg={4} xl={3} className={cx("wrapper", "container")}>
      <ToastContainer />
      <form onSubmit={(e) => isValid(e)}>
        <p className={cx("logo")}>Ellies</p>
        <p className={cx("page-name")}>Đăng nhập</p>
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
        <div className={cx("input")}>
          <Input
            label="Mật khẩu"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="******"
          />
        </div>
        <p className={cx("forgot-pass-text")}>Quên mật khẩu</p>
        <div className={cx("button-wrapper")}>
          <img
            src="images/facebook-icon.svg"
            onClick={loginByFacebook}
            alt="facebook icon"
            className={cx("login-facebook")}
          ></img>
          <Button
            type="submit"
            isPrimary={true}
            haveIcon={true}
            onClick={() => {}}
            className={cx("submit-button")}
          >
            Đăng nhập
          </Button>
        </div>
      </form>
    </Col>
  );
};

export default Login;
