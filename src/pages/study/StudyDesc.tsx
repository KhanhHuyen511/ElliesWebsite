import React, { useState } from "react";
import { StudyRoute } from "../../types";
import style from "./StudyDesc.module.scss";
import classNames from "classnames/bind";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
const cx = classNames.bind(style);

const StudyDesc = ({ route }: { route: StudyRoute }) => {
  const [img, setImg] = useState("");

  if (route.imageFile)
    getDownloadURL(ref(storage, `images/${route.imageFile}`)).then((url) => {
      setImg(url);
    });

  return (
    <>
      <div className={cx("section-title")}>Mô tả</div>
      <div className={cx("desc")}>
        <p>
          Sau đây là các từ vựng. Hãy đọc kĩ từ tiếng Anh, xem nghĩa tiếng Việt
          bên dưới, nghe cách phát âm và tự đọc theo.
        </p>
        <br></br>
        <p>Chọn dấu mũi tên sang phải để sang từ tiếp theo.</p>
        <p>Chọn dấu mũi tên sang trái để quay lại từ trước đó.</p>
      </div>
      {/* <div className={cx('section-title')}>Đạt được sau lộ trình</div>
      <div className={cx('goal')}>??</div> */}
      {/* <div className={cx('image')}>
        <img src={img} alt='' />
      </div> */}
    </>
  );
};

export default StudyDesc;
