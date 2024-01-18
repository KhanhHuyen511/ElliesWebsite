import React, { useEffect, useState } from "react";
import Popup from "../popup/Popup";
import style from "./ShareWithUsList.module.scss";
import classNames from "classnames/bind";
import { TextArea } from "../../components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { ShareWithUs } from "../../types";
import { getShareWithUsList } from "../../redux/slice/adminSlice";
const cx = classNames.bind(style);

interface ShareWithUsListProps {
  isDisplay: boolean;
  onClose: () => void;
}

const ShareWithUsList = ({ isDisplay, onClose }: ShareWithUsListProps) => {
  const [list, setList] = useState<ShareWithUs[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      const { payload: newData } = await dispatch(getShareWithUsList());

      setList(newData as ShareWithUs[]);
    };

    fetchData();
  }, [dispatch]);

  return (
    <Popup
      title="Share with us"
      isDisplay={isDisplay}
      onClose={onClose}
      closeLabel="Close"
    >
      <ul>
        {list.length > 0 &&
          list.map((item, index) => (
            <li key={index}>
              <TextArea
                label={item.userName || "noname"}
                defaultValue={item.message}
              />
            </li>
          ))}
      </ul>
    </Popup>
  );
};

export default ShareWithUsList;
