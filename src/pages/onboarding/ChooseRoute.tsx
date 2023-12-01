import { useEffect, useState } from "react";
import { LevelType } from "../../types";
import { Button } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getListTopicByLevel,
  setStudyPathForStudent,
} from "../../redux/slice/studySlice";
import { useNavigate } from "react-router-dom";
import style from "./ChooseRoute.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const ChooseRoute = ({ level }: { level: LevelType }) => {
  const userID = useSelector((state: RootState) => state.auth.userID) || "";

  const [newLevel, setNewLevel] = useState<LevelType>(LevelType.Beginner);
  const [choose, setChoose] = useState<string>("accept");
  const [listTopic, setListTopic] = useState<string[]>([]);
  const [newListTopic, setNewListTopic] = useState<string[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getListTopicByLevel(level)).then((data) => {
      setListTopic(data.payload as string[]);
    });
  }, [level, dispatch]);

  const getNewListTopic = (level: number) => {
    dispatch(getListTopicByLevel(level)).then((data) => {
      setNewListTopic(data.payload as string[]);
    });
  };

  return (
    <>
      <div>
        <p className={cx("sub-title")}>
          Dựa trên kết quả bài đánh giá, bạn đang ở mức:{" "}
          <span className={cx("level")}>{LevelType[level]}</span>
        </p>
        <hr></hr>
        <br></br>
        <p className={cx("sub-title")}>
          Chúng tôi gợi ý cho bạn lộ trình học theo chủ đề như sau:
        </p>
        <ul className={cx("rec-list")}>
          {listTopic.length > 0 && listTopic.map((topic) => <li>{topic}</li>)}
        </ul>
        <br></br>
        <p className={cx("sub-title")}>
          Nếu đồng ý hãy chọn "Đồng ý với đề xuất trên":
        </p>
        <div
          onChange={(e) => setChoose((e.target as any).value)}
          className={cx("option-list")}
        >
          <label>
            <input type={"radio"} value={"accept"} name="level"></input>
            Đồng ý với đề xuất trên.
          </label>
          <label>
            <input type={"radio"} value={"deny"} name="level"></input>
            Chọn mức độ khác:
          </label>
        </div>
        <select
          value={newLevel}
          disabled={choose === "accept"}
          onChange={(e) => {
            switch (e.target.value) {
              case LevelType.Beginner.toString():
                setNewLevel(LevelType.Beginner);
                getNewListTopic(LevelType.Beginner);
                break;
              case LevelType.Intermediate.toString():
                setNewLevel(LevelType.Intermediate);
                getNewListTopic(LevelType.Intermediate);
                break;
              case LevelType.Advanced.toString():
                setNewLevel(LevelType.Advanced);
                getNewListTopic(LevelType.Advanced);
                break;
              default:
                break;
            }
          }}
        >
          <option value={LevelType.Beginner}>{LevelType[0]}</option>
          <option value={LevelType.Intermediate}>{LevelType[1]}</option>
          <option value={LevelType.Advanced}>{LevelType[2]}</option>
        </select>
        {choose === "deny" && (
          <>
            <p className={cx("sub-title")}>
              Chúng tôi gợi ý cho bạn lộ trình học theo chủ đề như sau:
            </p>
            <ul className={cx("rec-list")}>
              {newListTopic.length > 0 &&
                newListTopic.map((topic) => <li>{topic}</li>)}
            </ul>
          </>
        )}
      </div>
      <br></br>
      <br></br>
      <Button
        isPrimary
        isDisabled={choose === undefined}
        onClick={() => {
          if (choose === "accept") {
            dispatch(setStudyPathForStudent({ userID, level })).then(() =>
              navigate("/")
            );
          } else if (choose === "deny") {
            dispatch(setStudyPathForStudent({ userID, level: newLevel })).then(
              () => navigate("/")
            );
          }
        }}
      >
        Hoàn thành
      </Button>
    </>
  );
};

export default ChooseRoute;
