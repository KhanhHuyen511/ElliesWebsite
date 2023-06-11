import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getADocWithType } from "../../redux/slice/docSlice";
import { AppDispatch, RootState } from "../../redux/store";
import style from "./DocDetail.module.scss";
import classNames from "classnames/bind";
import { VocabCard } from "../../components";
import { StudyCard, StudyCardType } from "../../types";
const cx = classNames.bind(style);

const DocDetail = () => {
  let { id, type } = useParams();

  const data = useSelector((state: RootState) => state.doc.currentDoc);
  const dispatch = useDispatch<AppDispatch>();
  const [list, setList] = useState<StudyCard[]>();

  useEffect(() => {
    if (id && type) dispatch(getADocWithType({ id, type }));
    if (data) {
      switch (type) {
        case StudyCardType.Vocab.toString():
          setList(data.vocabs);
          break;
        case StudyCardType.Sentence.toString():
          setList(data.sentences);
          break;
        case StudyCardType.Paraph.toString():
          setList(data.paraphs);
          break;
        default:
          break;
      }
    }
  }, [dispatch, id, type]);

  return (
    <div className="container">
      <div className={cx("section-title")}>Mô tả</div>
      <div className={cx("desc")}>{data?.description}</div>
      <div className={cx("section-title")}>Từ vựng</div>
      <ul className={cx("list-card")}>
        {list &&
          list.length > 0 &&
          list.map((item) => (
            <li className={cx("list-item")}>
              <VocabCard card={item} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DocDetail;
