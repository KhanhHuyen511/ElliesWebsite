import React, { useEffect, useState } from "react";
import { Col } from "react-flexbox-grid";
import styles from "./Document.module.scss";
import classNames from "classnames/bind";
import { CategoryPanel, DocCard } from "../../components";
import {
  AcademicCapIcon,
  BookOpenIcon,
  QueueListIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getListDocs } from "../../redux/slice/docSlice";
import { StudyCardType } from "../../types";
const cx = classNames.bind(styles);

const Document = () => {
  const docs = useSelector((state: RootState) => state.doc.listDocs);
  const dispatch = useDispatch<AppDispatch>();

  const [typeSelect, setTypeSelect] = useState(StudyCardType.Vocab);

  useEffect(() => {
    dispatch(getListDocs());
  }, [dispatch]);

  return (
    <>
      <div className="container">
        <Col xs={12} md={8} lg={6}>
          <p className={cx("page-title")}>Tài liệu</p>
          <ul className={cx("doc-cate-wrapper")}>
            <CategoryPanel
              label={"Từ vựng"}
              isActive={typeSelect === StudyCardType.Vocab}
              classNames={cx("cate-item")}
              icon={<AcademicCapIcon />}
              onClick={() => setTypeSelect(StudyCardType.Vocab)}
            />
            <CategoryPanel
              label={"Câu"}
              isActive={typeSelect === StudyCardType.Sentence}
              classNames={cx("cate-item")}
              icon={<QueueListIcon />}
              onClick={() => setTypeSelect(StudyCardType.Sentence)}
            />
            <CategoryPanel
              label={"Đoạn"}
              isActive={typeSelect === StudyCardType.Paraph}
              classNames={cx("cate-item")}
              icon={<QueueListIcon />}
              onClick={() => setTypeSelect(StudyCardType.Paraph)}
            />
            <CategoryPanel
              label={"Sách"}
              isActive={typeSelect === StudyCardType.Book}
              classNames={cx("cate-item")}
              icon={<BookOpenIcon />}
              onClick={() => setTypeSelect(StudyCardType.Book)}
            />
          </ul>
          <p className={cx("sub-title")}>Nổi bật</p>
          <ul className={cx("list")}>
            {docs &&
              docs.length > 0 &&
              docs.map((item, index) => (
                <li className={cx("item")} key={index}>
                  <DocCard data={item} type={typeSelect} />
                </li>
              ))}
          </ul>
        </Col>
      </div>
    </>
  );
};

export default Document;
