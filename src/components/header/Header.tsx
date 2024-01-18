import { useEffect, useRef, useState } from "react";
import style from "./Header.module.scss";
import {
  Bars3CenterLeftIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames/bind";
import Navbar from "../navbar/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db, storage } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import { toast } from "react-toastify";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  REMOVE_ACTIVE_STUDENT,
  getCurrentStudent,
} from "../../redux/slice/studentSlice";
import { getDownloadURL, ref } from "firebase/storage";
import { AppDispatch, RootState } from "../../redux/store";
const cx = classNames.bind(style);

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [currentUserName, setCurrentUserName] = useState("");
  const [showAuthWrapper, setShowAuthWrapper] = useState(false);
  const [avatar, setAvatar] = useState<any>();
  const navigate = useNavigate();

  let currentUser = useSelector(
    (state: RootState) => state.student.currentUser
  );

  if (currentUser && currentUser.avatar)
    getDownloadURL(ref(storage, `images/${currentUser.avatar}`)).then((url) => {
      setAvatar(url);
    });

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };

  const toggleAuthWrapper = () => {
    setShowAuthWrapper(!showAuthWrapper);
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (
          currentUser &&
          currentUser.name !== undefined &&
          currentUser.name !== ""
        ) {
          setCurrentUserName(currentUser.name);
        } else {
          const index = user.email?.indexOf("@");
          const tempName = user.email?.substring(0, index);

          if (tempName) {
            setCurrentUserName(
              tempName?.charAt(0).toUpperCase() + tempName?.slice(1)
            );
          }
        }

        const q = query(
          collection(db, "accounts"),
          where("user_id", "==", user.uid)
        );

        const role = await (await getDocs(q)).docs[0].data().role;

        if (role === "student") {
          dispatch(getCurrentStudent(user.uid));
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName:
              currentUser && currentUser.name
                ? currentUser.name
                : currentUserName,
            userID: user.uid,
            userRole: role,
          })
        );
      } else {
        setCurrentUserName("");
        REMOVE_ACTIVE_USER({});
      }
    });
  }, [dispatch, currentUserName, currentUser?.name]);

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Đăng xuất thành công!");

        // update current Student
        dispatch(REMOVE_ACTIVE_STUDENT({}));
        dispatch(REMOVE_ACTIVE_USER({}));
        currentUser = undefined;
        navigate("/login");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowAuthWrapper(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  return (
    <div className={cx("header")}>
      <Bars3CenterLeftIcon
        className={cx("navbar-icon", "icon")}
        onClick={toggleMenu}
      ></Bars3CenterLeftIcon>

      <div className={cx("logo-text")} onClick={() => navigate("/")}>
        <img className={cx("logo")} src="/images/logo.png" alt="logo" />
      </div>

      {currentUserName !== "" && showMenu && (
        <div className={cx("slider-container")}>
          <div className={cx("slider-header")}>
            <div
              className={cx("logo-text-slide")}
              onClick={() => navigate("/")}
            >
              <img className={cx("logo")} src="/images/logo.png" alt="logo" />
            </div>
            <div className={cx("back-slide")}>
              <ChevronLeftIcon
                onClick={hideMenu}
                className={cx("back-slide-icon", "icon")}
              />
            </div>
          </div>

          <Navbar isSlider={true} />
        </div>
      )}

      {currentUserName !== "" && showMenu && (
        <div className={cx("modal")}></div>
      )}

      <div className={cx("navigation_bar")}>
        <div className={cx("navbar")}>
          <Navbar isSlider={false} />
        </div>

        <div className={cx("profile")}>
          {currentUserName && currentUserName !== "Admin" && (
            <>
              <div
                className={cx("avatar")}
                onClick={() => navigate("/profile")}
              >
                <img
                  src={avatar ? avatar : "/images/avatar.png"}
                  className={cx("avatar-img")}
                  alt=""
                />
              </div>
            </>
          )}
          <div
            className={cx("user-name-wrapper")}
            onClick={() => toggleAuthWrapper()}
            ref={wrapperRef}
          >
            <span className={cx("user-name")}>
              {currentUserName ? currentUserName : "Unregister User"}
            </span>
            <ChevronDownIcon
              className={cx("dropdown-icon", "icon", {
                checked: showAuthWrapper,
              })}
            />
            {showAuthWrapper && (
              <ul className={cx("auth-wrapper")}>
                {currentUserName ? (
                  <li onClick={logout} className={cx("auth-item")}>
                    Logout
                  </li>
                ) : (
                  <>
                    <NavLink to="/login" className={cx("auth-item")}>
                      Login
                    </NavLink>
                    <NavLink to="/register" className={cx("auth-item")}>
                      Register
                    </NavLink>
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
