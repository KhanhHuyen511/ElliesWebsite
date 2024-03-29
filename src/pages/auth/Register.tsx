import classNames from "classnames/bind";
import React, { useState } from "react";
import { Button, Input } from "../../components";
import { Col } from "react-flexbox-grid";
import styles from "./auth.module.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
const cx = classNames.bind(styles);

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const isValid = (e: React.FormEvent) => {
    e.preventDefault();

    // check if password is equal to confirm password
    if (password !== confirmPassword) {
      toast("Xác nhận mật khẩu không khớp!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        try {
          addDoc(collection(db, "accounts"), {
            role: "student",
            user_id: user.uid,
            create_date: new Date(),
          }).then(() => {
            addDoc(collection(db, "students"), {
              id: user.uid,
              email: user.email,
              name: "",
              gender: "",
              bio: "",
              routes: [],
              checkinDays: [],
            }).then(() => {
              toast.success("Đăng kí thành công!");

              signOut(auth)
                .then(() => {
                  navigate("/login");
                })
                .catch((error) => {
                  const errorMessage = error.message;
                  toast.error(errorMessage);
                });
              navigate("/login");
            });
          });
        } catch (error) {
          console.error("error");
        }

        // log out
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
            <p className={cx("page-name")}>Register</p>
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
            <div className={cx("input")}>
              <Input
                label="Nhập lại mật khẩu"
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                placeholder="******"
              />
            </div>
            {/* <p className={cx('forgot-pass-text')}>Quên mật khẩu</p> */}
            <div className={cx("button-wrapper")}>
              {/* <embed src="images/facebook-icon.svg"></embed> */}
              <Button
                type="submit"
                isPrimary={true}
                haveIcon={true}
                onClick={() => {}}
                className={cx("submit-button")}
              >
                Create
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

export default Register;
