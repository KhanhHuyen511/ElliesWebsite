import { useEffect, useState } from "react";
import Popup from "../popup/Popup";
import { LevelType, Student, StudyCard } from "../../types";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
import style from "./StudentInfoModal.module.scss";
import classNames from "classnames/bind";
import {
  BoltIcon,
  BookmarkIcon,
  CakeIcon,
  CheckBadgeIcon,
  EnvelopeIcon,
  FaceSmileIcon,
  FireIcon,
  LockClosedIcon,
  TrophyIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Col, Row } from "react-flexbox-grid";
import { getDate } from "../../utils/utils";
import { Timestamp } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getStudyRoutes } from "../../redux/slice/studySlice";
import { getListUserExs } from "../../redux/slice/exSlice";
const cx = classNames.bind(style);

interface StudentInfoModal {
  data: Student;
  isDisplay: boolean;
  onClose: () => void;
}

const StudentInfoModal = ({ isDisplay, data, onClose }: StudentInfoModal) => {
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const studyRoutes = useSelector(
    (state: RootState) => state.study.studyRoutes
  );
  const userExs = useSelector((state: RootState) => state.ex.listUserExs);

  if (data.avatar)
    getDownloadURL(ref(storage, `images/${data.avatar}`)).then((url) => {
      setAvatar(url);
    });

  useEffect(() => {
    dispatch(getStudyRoutes(data.id));
    dispatch(getListUserExs(data.id));
  }, [dispatch, data.id]);

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
      <Popup
        title={
          <div className={cx("title")}>
            <UserCircleIcon className={cx("icon")} />
            <span>{data.name || "Noname"}</span>
          </div>
        }
        isDisplay={isDisplay}
        onClose={onClose}
        closeLabel="Close"
        classNames={cx("popup")}
      >
        <Row>
          <Col md={6}>
            <img
              src={avatar !== "" ? avatar : "/images/avatar.png"}
              alt="avatar"
              className={cx("avatar")}
            />

            <div className={cx("data-line")}>
              <EnvelopeIcon className={cx("icon")} />
              <span>{data.email}</span>
            </div>

            <div className={cx("data-line")}>
              <CakeIcon className={cx("icon")} />
              <span>{data?.birthday?.toLocaleDateString() || "-"}</span>
            </div>

            <div className={cx("data-line")}>
              <FaceSmileIcon className={cx("icon")} />
              <span>{data.bio || "-"}</span>
            </div>

            <hr />

            <div className={cx("stats")}>
              <div className={cx("data-line")}>
                <FireIcon className={cx("icon")} />
                <span>
                  {data?.checkinDays.length}/
                  {data?.checkinDays !== undefined &&
                  data.checkinDays.length > 0
                    ? (
                        (new Date().getTime() -
                          getDate(
                            (data.checkinDays.at(0) as unknown as Timestamp)
                              ?.seconds
                          ).getTime()) /
                        (3600000 * 24)
                      ).toFixed()
                    : 0}
                </span>
                <span>checked in</span>
              </div>
              <div className={cx("data-line")}>
                <BoltIcon className={cx("icon")} />
                <span>
                  {data?.routes !== undefined ? data?.routes.length : 0}/
                  {studyRoutes ? studyRoutes.length : 0}
                </span>
                <span>route</span>
              </div>
              <div className={cx("data-line")}>
                <TrophyIcon className={cx("icon")} />
                <span>{userExs ? statsEx() : 0}%</span>
                <span>right exercise</span>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className={cx("level")}>
              <CheckBadgeIcon className={cx("icon")} />
              <span>
                {data.level !== undefined ? LevelType[data.level] : "-"}
              </span>
            </div>
            <div className={cx("point")}>
              <TrophyIcon className={cx("icon")} />
              <span>{data.point || 0}</span>
            </div>

            <hr />
            <div className={cx("saved-wrapper")}>
              <div className={cx("saved-line")}>
                <BookmarkIcon className={cx("icon")} />
                <span>Saved</span>
                {data.isPublicSavedList === false && (
                  <LockClosedIcon className={cx("icon")} />
                )}
              </div>
              {data.isPublicSavedList && (
                <ul className={cx("saved-list")}>
                  {data.savedList &&
                    data.savedList.length > 0 &&
                    data.savedList.map((item, index) => (
                      <li key={index} className={cx("saved-item")}>
                        <p>{(item as StudyCard).display}</p>
                        <p>{(item as StudyCard).meaning}</p>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </Col>
        </Row>
      </Popup>
    </>
  );
};

export default StudentInfoModal;
