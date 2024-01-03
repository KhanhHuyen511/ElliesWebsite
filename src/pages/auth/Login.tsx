import classNames from "classnames/bind";
import React, { useState } from "react";
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
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  REMOVE_ACTIVE_STUDENT,
  getCurrentAccount,
  getCurrentStudent,
} from "../../redux/slice/studentSlice";
import { Account, Student } from "../../types";

const cx = classNames.bind(styles);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.error(
          "Your account is LOCKED! Please contact to Admin to unlock!"
        );

        // update current Student
        dispatch(REMOVE_ACTIVE_STUDENT({}));
        navigate("/login");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

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
        // check if account is locked, then log out.
        await dispatch(getCurrentAccount(user.uid)).then(async (data) => {
          if (
            (data.payload as Account).role === "student" &&
            (data.payload as Account).isLocked &&
            (data.payload as Account).isLocked === true
          ) {
            logout();
          } else {
            // check if this login is first time
            // if yes
            await dispatch(getCurrentStudent(user.uid)).then((data) => {
              if (
                data.payload &&
                (data.payload as Student).level === undefined
              ) {
                navigate("/onboarding");
              } else {
                // if no
                navigate("/");
              }
            });
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
    <Col xs={12} md={12} lg={9} xl={7} className={cx("wrapper", "container")}>
      <ToastContainer />
      <form onSubmit={(e) => isValid(e)}>
        <div className={cx("row-wrapper")}>
          <div>
            <p className={cx("page-name")}>Login</p>
            <div className={cx("input")}>
              <Input
                label="Email"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="example@gmail.com"
              />
            </div>
            <div className={cx("input")}>
              <Input
                label="Password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="******"
              />
            </div>
            <p className={cx("forgot-pass-text")}>Forgot password</p>
            <div className={cx("button-wrapper")}>
              {/* <img
            src="images/facebook-icon.svg"
            onClick={loginByFacebook}
            alt="facebook icon"
            className={cx("login-facebook")}
          ></img> */}
              <Button
                type="submit"
                isPrimary={true}
                haveIcon={true}
                onClick={() => {}}
                className={cx("submit-button")}
              >
                Go to App
              </Button>
            </div>
          </div>
          <div className={cx("logo")}>
            <img src="/images/login.png" alt="" />
          </div>
        </div>
      </form>
    </Col>
  );
};

export default Login;
