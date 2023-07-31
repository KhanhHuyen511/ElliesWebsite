import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import style from "./Profile.module.scss";
import classNames from "classnames/bind";
import {
  BoltIcon,
  CameraIcon,
  CheckBadgeIcon,
  FireIcon,
  PencilIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { Button, Input, TextArea } from "../../components";
import EditProfile from "./EditProfile";
import EditAvatar from "./EditAvatar";
import { getCurrentStudent } from "../../redux/slice/studentSlice";
import { formatDate, getDate } from "../../utils";
import { getDownloadURL, ref } from "firebase/storage";
import { auth, storage } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { REMOVE_ACTIVE_USER } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { LevelType } from "../../types";
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

  return (
    <>
      <div className={"container"}>
        <p className={cx("user-name")}>{user?.name}</p>
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
                  ngày học
                </p>
              </div>
              <div className={cx("stat-item")}>
                <BoltIcon className={cx("stat-item-icon")} />
                <p className={cx("stat-item-label")}>
                  <p>
                    {user?.routes !== undefined ? user?.routes.length : 0}/
                    {studyRoutes ? studyRoutes.length : 0}
                  </p>{" "}
                  bài học
                </p>
              </div>
              <div className={cx("stat-item")}>
                <TrophyIcon className={cx("stat-item-icon")} />
                <p className={cx("stat-item-label")}>
                  <p>{userExs ? statsEx() : 0}%</p> đúng luyện tập
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
                <p className={cx("section-title")}>Thông tin cá nhân</p>
                <PencilIcon
                  className={cx("edit-icon")}
                  onClick={() => setISOpenEditForm(true)}
                />
              </div>

              <div className={cx("info-body")}>
                <Input
                  label={"Email"}
                  value={user?.email}
                  placeholder={"abc@gm.uit.edu.vn"}
                  onChange={() => {}}
                  isDisabled
                />
                <Input
                  label={"Tên"}
                  value={user?.name}
                  placeholder={""}
                  onChange={() => {}}
                  isDisabled
                />
                <Input
                  label={"Giới tính"}
                  value={user?.gender}
                  placeholder={""}
                  onChange={() => {}}
                  isDisabled
                />
                <Input
                  label={"Ngày sinh"}
                  type="date"
                  value={
                    user?.birthday ? formatDate(user?.birthday) : undefined
                  }
                  placeholder={""}
                  onChange={(e) => {}}
                  isDisabled
                />
                <TextArea
                  label={"Tiểu sử"}
                  value={user?.bio}
                  placeholder={"Nói gì đó về bạn"}
                  onChange={() => {}}
                  isDisabled
                />
              </div>
            </>
          </Col>

          <Col xs={12} md={4} mdOffset={6}>
            <div className={cx("blog-section", "section")}>
              <p className={cx("section-title")}>Bài viết</p>
              <div className={cx("blog-body")}>
                <Button
                  isPrimary={false}
                  onClick={() => {
                    navigate("/forum");
                  }}
                  className={cx("blog-button")}
                >
                  Bài viết của tôi
                </Button>
                {/* <Button
              isPrimary={false}
              onClick={() => {}}
              className={cx("blog-button")}
            >
              Câu hỏi của tôi
            </Button> */}
              </div>
            </div>

            <div className={cx("social-section", "section")}>
              <p className={cx("section-title")}>Liên kết mạng xã hội</p>
              <div className={cx("social-body")}></div>
            </div>
            <div className={cx("account-section", "section")}>
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
          Đăng xuất
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
      </div>
    </>
  );
};

export default Profile;
