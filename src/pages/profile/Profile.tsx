import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import style from "./Profile.module.scss";
import classNames from "classnames/bind";
import {
  BoltIcon,
  CameraIcon,
  ChatBubbleLeftEllipsisIcon,
  CheckBadgeIcon,
  FireIcon,
  PencilIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { Button, Input, ShareWithUsModal, TextArea } from "../../components";
import EditProfile from "./EditProfile";
import EditAvatar from "./EditAvatar";
import {
  getCurrentStudent,
  updatePublicSavedList,
} from "../../redux/slice/studentSlice";
import { formatDate, getDate } from "../../utils/utils";
import { getDownloadURL, ref } from "firebase/storage";
import { auth, storage } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { REMOVE_ACTIVE_USER } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { Gender, LevelType } from "../../types";
import { Timestamp } from "firebase/firestore";
import { getListUserExs } from "../../redux/slice/exSlice";
import { getStudyRoutes } from "../../redux/slice/studySlice";
import { Col, Row } from "react-flexbox-grid";

const cx = classNames.bind(style);

const Profile = () => {
  const userID = useSelector((state: RootState) => state.auth.userID) || "";

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.student.currentUser);
  const userExs = useSelector((state: RootState) => state.ex.listUserExs);
  const studyRoutes = useSelector(
    (state: RootState) => state.study.studyRoutes
  );

  const [isOpenEditForm, setISOpenEditForm] = useState<boolean>(false);
  const [isOpenEditAvtForm, setISOpenEditAvtForm] = useState<boolean>(false);
  const [isOpenSharingModal, setISOpenSharingModal] = useState<boolean>(false);

  const [img, setImg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCurrentStudent(userID));
    dispatch(getListUserExs(userID));
    dispatch(getStudyRoutes(userID));
    if (user?.avatar)
      getDownloadURL(ref(storage, `images/${user.avatar}`)).then((url) => {
        setImg(url);
      });
  }, [dispatch, userID, user?.avatar]);

  // Get Stats Ex: Percent
  const statsEx = () => {
    if (userExs) {
      let total = 1;
      let right = 0;
      userExs.map((item) => {
        total += item.resultList.length;
        item.resultList.map((i) => {
          if (i.exRight === true) {
            right++;
          }
        });
      });
      return ((right / total) * 100).toFixed();
    }
  };

  const handleUpdatePublicSavedList = async () => {
    if (user)
      await dispatch(
        updatePublicSavedList({
          userId: user.id,
          newValue: !user?.isPublicSavedList,
        })
      );
  };

  return (
    <>
      <div className={"container"}>
        <div className={cx("section-1")}>
          <div className={cx("avatar-wrapper")}>
            <div
              className={cx("avatar")}
              onClick={() => setISOpenEditAvtForm(true)}
            >
              <img
                src={img ? img : "/images/avatar.png"}
                className={cx("avatar-img")}
                alt=""
              />
              <div className={cx("overlay")}></div>
              <CameraIcon className={cx("avatar-icon")} />
            </div>
          </div>

          <div className={cx("stats-wrapper")}>
            <div className={cx("level")}>
              <CheckBadgeIcon className={cx("level-icon")} />
              <p className={cx("stat-item-label")}>
                {LevelType[user?.level as number]}
              </p>
            </div>

            <div className={cx("stats")}>
              <div className={cx("stat-item")}>
                <FireIcon className={cx("stat-item-icon")} />
                <p className={cx("stat-item-label")}>
                  <p>
                    {user?.checkinDays.length}/
                    {user?.checkinDays !== undefined &&
                    user.checkinDays.length > 0
                      ? (
                          (new Date().getTime() -
                            getDate(
                              (user.checkinDays.at(0) as unknown as Timestamp)
                                ?.seconds
                            ).getTime()) /
                          (3600000 * 24)
                        ).toFixed()
                      : 0}{" "}
                  </p>
                  checked in
                </p>
              </div>
              <div className={cx("stat-item")}>
                <BoltIcon className={cx("stat-item-icon")} />
                <p className={cx("stat-item-label")}>
                  <p>
                    {user?.routes !== undefined ? user?.routes.length : 0}/
                    {studyRoutes ? studyRoutes.length : 0}
                  </p>
                  route
                </p>
              </div>
              <div className={cx("stat-item")}>
                <TrophyIcon className={cx("stat-item-icon")} />
                <p className={cx("stat-item-label")}>
                  <p>{userExs ? statsEx() : 0}%</p> right exercise
                </p>
              </div>
            </div>
          </div>
        </div>

        <Row>
          <Col
            xs={12}
            md={6}
            mdOffset={6}
            className={cx("info-section", "section")}
          >
            <>
              <div className={cx("info-title-wrapper")}>
                <p className={cx("section-title")}>Personal information</p>
                <PencilIcon
                  className={cx("edit-icon")}
                  onClick={() => setISOpenEditForm(true)}
                />
              </div>

              <div className={cx("info-body")}>
                <Input
                  label="Email"
                  value={user?.email}
                  placeholder={"abc@gm.uit.edu.vn"}
                  onChange={() => {}}
                  isDisabled
                />
                <Input
                  label="Name"
                  value={user?.name}
                  onChange={() => {}}
                  isDisabled
                />
                <Input
                  label="Gender"
                  value={user?.gender ? Gender[user.gender] : undefined}
                  onChange={() => {}}
                  isDisabled
                />
                <Input
                  label="Birthday"
                  type="date"
                  value={
                    user?.birthday ? formatDate(user?.birthday) : undefined
                  }
                  onChange={(e) => {}}
                  isDisabled
                />
                <TextArea
                  label="Bio"
                  value={user?.bio}
                  placeholder="Write something about you..."
                  onChange={() => {}}
                  isDisabled
                />
              </div>
            </>
          </Col>

          <Col xs={12} md={6} mdOffset={6}>
            <div className={cx("blog-section", "section")}>
              <p className={cx("section-title")}>Blog</p>
              <div className={cx("blog-body")}>
                <Button
                  isPrimary={false}
                  onClick={() => {
                    navigate("/forum");
                  }}
                  className={cx("blog-button")}
                >
                  My posts
                </Button>
              </div>
            </div>

            {/* <div className={cx("social-section", "section")}>
              <p className={cx("section-title")}>Liên kết mạng xã hội</p>
              <div className={cx("social-body")}></div>
            </div> */}
            {/* <div className={cx("account-section", "section")}>
              <p className={cx("section-title")}>Tài khoản</p>
              <div className={cx("account-body")}>
                <Button
                  isPrimary={false}
                  onClick={() => {}}
                  className={cx("account-button")}
                >
                  Khóa tài khoản
                </Button>
              </div>
            </div> */}

            <div className={cx("section")}>
              <p className={cx("section-title")}>
                Dark Theme:{" "}
                {localStorage.getItem("theme") === "dark" ? "ON" : "OFF"}
              </p>
              <div className={cx("theme-wrapper")}>
                <div
                  onClick={() => {
                    let theme = localStorage.getItem("theme");
                    if (theme === "light")
                      localStorage.setItem("theme", "dark");
                    else localStorage.setItem("theme", "light");
                  }}
                  className={cx("theme", {
                    light: localStorage.getItem("theme") === "light",
                    dark: localStorage.getItem("theme") === "dark",
                  })}
                />
                <p>Reload to apply change</p>
              </div>
            </div>

            <div className={cx("section")}>
              <p className={cx("section-title")}>
                Public Saved list: {user?.isPublicSavedList ? "ON" : "OFF"}
              </p>
              <div className={cx("theme-wrapper")}>
                <div
                  onClick={handleUpdatePublicSavedList}
                  className={cx("theme", {
                    light: !user?.isPublicSavedList,
                    dark: user?.isPublicSavedList,
                  })}
                />
              </div>
            </div>

            <div className={cx("section", "sharing-section")}>
              <p className={cx("section-title")}>
                Share With Us
                <ChatBubbleLeftEllipsisIcon className={cx("icon")} />
              </p>
              <Button
                isPrimary={false}
                className={cx("button")}
                onClick={() => {
                  setISOpenSharingModal(true);
                }}
              >
                Click here to send sharing message
              </Button>
            </div>
          </Col>
        </Row>

        <Button
          isPrimary={false}
          onClick={() => {
            onAuthStateChanged(auth, (user) => {
              if (user) {
                signOut(auth);
                dispatch(REMOVE_ACTIVE_USER({}));

                navigate("/login");
              }
            });
          }}
          className={cx("log-out")}
        >
          Logout
        </Button>

        {isOpenEditForm && user && (
          <EditProfile
            data={user}
            isDisplay={isOpenEditForm}
            onClose={() => setISOpenEditForm(false)}
          ></EditProfile>
        )}
        {isOpenEditAvtForm && user && (
          <EditAvatar
            data={user}
            isDisplay={isOpenEditAvtForm}
            onClose={() => setISOpenEditAvtForm(false)}
          ></EditAvatar>
        )}
        {isOpenSharingModal && user && (
          <ShareWithUsModal
            userId={user.id}
            isDisplay={isOpenSharingModal}
            onClose={() => setISOpenSharingModal(false)}
          ></ShareWithUsModal>
        )}
      </div>
    </>
  );
};

export default Profile;
