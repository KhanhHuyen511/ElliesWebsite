import React, { useEffect, useState } from "react";
import { Col } from "react-flexbox-grid";
import style from "./SavedPage.module.scss";
import classNames from "classnames/bind";
import { Button, Input } from "../../components";
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

  let search: string;

  const [searchSubmit, setSearchSubmit] = useState(false);
  const [searchList, setSearchList] = useState<StudyCard[]>();

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (userID) dispatch(getAllSaved(userID));
    console.log("render");
  }, [userID, dispatch]);

  const getSavedList = () => {
    if (!searchSubmit) {
      return savedList.map((item, index) => SavedItem(item, index));
    }
    return searchList?.map((item, index) => SavedItem(item, index));
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

  const searchSavedByName = (keyword: string) => {
    setSearchList(
      savedList.filter((o) =>
        o.display?.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  };

  return (
    <>
      <div className={cx("wrapper", "container")}>
        <Col xs={12} md={8} lg={6}>
          <p className={cx("page-title")}>Saved</p>

          <div className={cx("search-wrapper")}>
            <Input
              label={"Search"}
              placeholder={"Enter your keyword"}
              onChange={(e) => {
                search = e.target.value;
              }}
              className={cx("input")}
            ></Input>
            <Button
              isPrimary={false}
              onClick={() => {
                if (search && search !== " ") {
                  searchSavedByName(search);
                  setSearchSubmit(true);
                }
              }}
              className={cx("button")}
            >
              Search
            </Button>
          </div>

          <ul className={cx("search-list")}>
            <li
              className={cx("item", { "is-active": filter === "All" })}
              onClick={() => {
                setFilter("All");
              }}
            >
              All
            </li>
            <li
              className={cx("item", { "is-active": filter === "Word" })}
              onClick={() => {
                setFilter("Word");
              }}
            >
              Word
            </li>
            <li
              className={cx("item", { "is-active": filter === "Sentence" })}
              onClick={() => {
                setFilter("Sentence");
              }}
            >
              Sentence
            </li>
          </ul>

          <ul className={cx("saved-list")}>{getSavedList()}</ul>
        </Col>
      </div>
    </>
  );
};

export default SavedPage;
