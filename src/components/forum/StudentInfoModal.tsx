import { useState } from "react";
import Popup from "../popup/Popup";
import { LevelType, Student, StudyCard } from "../../types";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
import style from "./StudentInfoModal.module.scss";
import classNames from "classnames/bind";
import {
  BookmarkIcon,
  CakeIcon,
  CheckBadgeIcon,
  EnvelopeIcon,
  FaceSmileIcon,
  LockClosedIcon,
  TrophyIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Col, Row } from "react-flexbox-grid";
const cx = classNames.bind(style);

interface StudentInfoModal {
  data: Student;
  isDisplay: boolean;
  onClose: () => void;
}

const StudentInfoModal = ({ isDisplay, data, onClose }: StudentInfoModal) => {
  const [avatar, setAvatar] = useState("");

  if (data.avatar)
    getDownloadURL(ref(storage, `images/${data.avatar}`)).then((url) => {
      setAvatar(url);
    });

  console.log(data.savedList);

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
