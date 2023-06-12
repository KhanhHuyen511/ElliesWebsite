import React, { useEffect, useState } from "react";
import style from "./IndexExercise.module.scss";
import classNames from "classnames/bind";
import { Button, CategoryPanel, Checkbox } from "../../../components";
import { Ex } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getExercises } from "../../../redux/slice/adminSlice";
import { useNavigate } from "react-router-dom";
import CreateExForm from "./CreateExForm";
import {
  AcademicCapIcon,
  BookOpenIcon,
  QueueListIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
const cx = classNames.bind(style);

const IndexExercise = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const list = useSelector((state: RootState) => state.admin.listEx);

  const [selectedItem, setSelectedItem] = useState<string>();
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [currentType, setCurrentType] = useState("vocabs");

  useEffect(() => {
    dispatch(getExercises());
  }, [dispatch]);

  const getCheckedItems = (item: Ex) => {
    return item.id === selectedItem;
  };

  return (
    <>
      <div className={cx("container")}>
        <div className={cx("wrapper-filter")}></div>
        <div className={cx("section")}>
          <h2>Manage Exercise</h2>
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
          </ul>
          <>
            <div className={cx("handler")}>
              <Button
                isPrimary={false}
                onClick={() => {
                  if (selectedItem)
                    navigate(`/exercise_detail/${selectedItem}`); // set type
                }}
              >
                Xem chi tiết
              </Button>
              <Button
                isPrimary={false}
                onClick={() => {
                  setIsOpenForm(true);
                }}
              >
                Tạo mới
              </Button>
              <Button isPrimary={false} isDanger={true} onClick={() => {}}>
                Xóa
              </Button>
              {/* <Checkbox
              isChecked={isSelectedAll}
              label='Tất cả'
              onChecked={() => setSelectAllItems(!isSelectedAll)}
            ></Checkbox> */}
            </div>
            <table className={cx("table")}>
              <thead>
                <tr>
                  <th></th>
                  <th>Chủ đề</th>
                  <th>Mô tả</th>
                  <th>Cấp độ</th>
                  <th>Số câu hỏi</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item, i) => (
                    <tr key={i}>
                      <td>
                        {item.id && (
                          <Checkbox
                            value={item.id}
                            isChecked={getCheckedItems(item)}
                            onChecked={() => {
                              setSelectedItem(item.id);
                            }}
                          ></Checkbox>
                        )}
                      </td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.level}</td>
                      <td>
                        {item.listItems?.length ? item.listItems.length : 0}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        </div>
      </div>

      {isOpenForm && (
        <CreateExForm
          onClose={() => setIsOpenForm(false)}
          isDisplay={isOpenForm}
        />
      )}
    </>
  );
};

export default IndexExercise;
