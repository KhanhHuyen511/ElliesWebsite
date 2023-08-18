import React, { useEffect } from "react";
import { Col } from "react-flexbox-grid";
import style from "./SavedPage.module.scss";
import classNames from "classnames/bind";
import { Input } from "../../components";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllSaved, removeFromSaved } from "../../redux/slice/savedSlice";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
import { StudyCard } from "../../types";
const cx = classNames.bind(style);

const SavedPage = () => {
  const userID = useSelector((state: RootState) => state.auth.userID);

  const savedList = useSelector((state: RootState) => state.saved.savedList);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userID) dispatch(getAllSaved(userID));
  }, [userID, dispatch]);

  const getSavedList = () => {
    return savedList.map((item, index) => SavedItem(item, index));
  };

  const removeFromSavedSection = (item: StudyCard) => {
    if (userID && item.id) {
      dispatch(removeFromSaved({ userId: userID, cardId: item.id }));
      savedList.filter((o) => o.id !== item.id);
    }
  };

  const SavedItem = (item: StudyCard, index: number) => {
    let imgString = "";
    if (item.imageFile)
      getDownloadURL(ref(storage, `images/${item.imageFile}`)).then((url) => {
        imgString = url;
      });

    return (
      <li key={index} className={cx("item")}>
        <p className={cx("display")}>{item.display}</p>
        <p className={cx("meaning")}>{item.meaning}</p>
        <div className={cx("icon-wrapper")}>
          <img
            src={imgString ? imgString : "/images/avatar.png"}
            className={cx("image")}
            alt=""
          />
          <HeartIcon
            className={cx("icon", { "is-saved": true })}
            onClick={() => {
              removeFromSavedSection(item);
            }}
          />
        </div>
      </li>
    );
  };

  return (
    <>
      <div className={cx("wrapper", "container")}>
        <Col xs={12} md={8} lg={6}>
          <p className={cx("page-title")}>Saved</p>

          <Input
            label={"Search"}
            placeholder={"Enter your keyword"}
            onChange={() => {}}
          ></Input>

          <ul className={cx("search-list")}>
            <li className={cx("item", "is-active")}>All</li>
            <li className={cx("item")}>Word</li>
            <li className={cx("item")}>Sentence</li>
          </ul>

          <ul className={cx("saved-list")}>{getSavedList()}</ul>
        </Col>
      </div>
    </>
  );
};

export default SavedPage;
