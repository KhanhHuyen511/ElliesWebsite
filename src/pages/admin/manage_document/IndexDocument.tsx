import React, { useEffect, useState } from "react";
import styles from "./IndexDocument.module.scss";
import classNames from "classnames/bind";
import VocabDoc from "./VocabDoc";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  getAllDocs,
  getSentences,
  getVocabs,
} from "../../../redux/slice/adminSlice";
import { Button, CategoryPanel } from "../../../components";
import {
  AcademicCapIcon,
  BookOpenIcon,
  QueueListIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
import { StudyCardType } from "../../../types";

const cx = classNames.bind(styles);

const IndexDocument = () => {
  const dispatch = useDispatch<AppDispatch>();

  const listDocVocab = useSelector((state: RootState) => state.admin.listDocs);

  const [currentType, setCurrentType] = useState("vocabs");

  useEffect(() => {
    dispatch(getAllDocs());
  }, [dispatch]);

  return (
    <>
      <div className={cx("container")}>
        <div className={cx("wrapper-filter")}></div>
        <div className={cx("section")}>
          <h2 className={cx("title")}>Quản lý tài liệu</h2>

          <ul className={cx("doc-cate-wrapper")}>
            <CategoryPanel
              label={"Vocabs"}
              isActive={currentType === "vocabs"}
              classNames={cx("cate-item")}
              icon={<AcademicCapIcon />}
              onClick={() => setCurrentType("vocabs")}
            />
            <CategoryPanel
              label={"Sentences"}
              isActive={currentType === "sentences"}
              classNames={cx("cate-item")}
              icon={<QueueListIcon />}
              onClick={() => setCurrentType("sentences")}
            />
            <CategoryPanel
              label={"Paraphs"}
              isActive={currentType === "paraphs"}
              classNames={cx("cate-item")}
              icon={<SpeakerWaveIcon />}
              onClick={() => setCurrentType("paraphs")}
            />
            <CategoryPanel
              label={"Books"}
              isActive={currentType === "books"}
              classNames={cx("cate-item")}
              icon={<BookOpenIcon />}
              onClick={() => setCurrentType("books")}
            />
          </ul>

          {currentType === "vocabs" ? (
            <VocabDoc list={listDocVocab} type={StudyCardType.Vocab} />
          ) : currentType === "sentences" ? (
            <VocabDoc list={listDocVocab} type={StudyCardType.Sentence} />
          ) : currentType === "paraphs" ? (
            <VocabDoc list={listDocVocab} type={StudyCardType.Paraph} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default IndexDocument;
