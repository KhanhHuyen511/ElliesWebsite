import { StudyRoute } from "../../types";
import style from "./StudyDesc.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const StudyDesc = ({ route }: { route: StudyRoute }) => {
  // const [img, setImg] = useState("");

  // if (route.imageFile)
  //   getDownloadURL(ref(storage, `images/${route.imageFile}`)).then((url) => {
  //     setImg(url);
  //   });

  return (
    <div className={cx("desc")}>
      <p>
        The following are the words. Read the English words carefully, see the
        Vietnamese meaning below, hear the pronunciation and read it
        automatically.
      </p>
      <br></br>
      <p>Select the right arrow to go to the next word.</p>
      <p>Select the left arrow to go back to the previous word.</p>
    </div>
  );
};

export default StudyDesc;
