import React from "react";
import styles from "./DocCard.module.scss";
import classNames from "classnames/bind";
import {
  AcademicCapIcon,
  BookOpenIcon,
  QueueListIcon,
} from "@heroicons/react/24/outline";
import { Doc, StudyCardType } from "../../types";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

const DocCard = ({ data, type }: { data: Doc; type: StudyCardType }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={cx("card")}
        onClick={() => navigate(`/doc_detail/${data.id}/${type}`)}
      >
        <p className={cx("card-title")}>{data.title}</p>
        <div className={cx("card-body")}>
          <div className={cx("card-content")}>
            <p className={cx("card-desc")}>{data.description}</p>
            <p className={cx("card-date")}>
              {/* 03/03/2023 */}
              {data.createDate?.toLocaleDateString()}
            </p>
          </div>
          {type === StudyCardType.Vocab ? (
            <AcademicCapIcon className="icon" width={52} height={52} />
          ) : type === StudyCardType.Book ? (
            <BookOpenIcon className="icon" width={52} height={52} />
          ) : (
            <QueueListIcon className="icon" width={52} height={52} />
          )}
        </div>
      </div>
    </>
  );
};

export default DocCard;
