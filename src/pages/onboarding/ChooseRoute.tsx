import React, { useState } from "react";
import { LevelType } from "../../types";
import { Button } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setStudyPathForStudent } from "../../redux/slice/studySlice";
import { useNavigate } from "react-router-dom";

const ChooseRoute = ({ level }: { level: LevelType }) => {
  const userID = useSelector((state: RootState) => state.auth.userID) || "";

  const [newLevel, setNewLevel] = useState<LevelType>(LevelType.Beginner);
  const [choose, setChoose] = useState<string>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  return (
    <>
      <div>
        <p>Dựa trên kết quả bài đánh giá, bạn đang ở mức: {LevelType[level]}</p>
        <p>Chúng tôi gợi ý cho bạn lộ trình học như sau:</p>
        <ul>
          <li>Giới thiệu: 8 từ vựng, 13 câu</li>
          <li>Nghề nghiệp: 9 từ vựng, 2 câu</li>
          <li>Thói quen: 9 từ vựng, 7 câu</li>
        </ul>
        <p>Nếu đồng ý hãy chọn "Đồng ý với đề xuất trên":</p>
        <div onChange={(e) => setChoose((e.target as any).value)}>
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
            setNewLevel(e.target.value as unknown as LevelType);
          }}
        >
          <option value={LevelType.Beginner}>{LevelType[0]}</option>
          <option value={LevelType.Intermediate}>{LevelType[1]}</option>
          <option value={LevelType.Advanced}>{LevelType[2]}</option>
        </select>
        {choose === "deny" && (
          <>
            <p>Chúng tôi gợi ý cho bạn lộ trình học như sau:</p>
            <ul>
              <li>Giới thiệu: 8 từ vựng, 13 câu</li>
              <li>Nghề nghiệp: 9 từ vựng, 2 câu</li>
              <li>Thói quen: 9 từ vựng, 7 câu</li>
            </ul>
          </>
        )}
      </div>
      <Button
        isPrimary
        isDisabled={choose === undefined}
        onClick={() => {
          // set study path
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
