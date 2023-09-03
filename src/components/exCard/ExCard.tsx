import { Ex, ExAgain } from "../../types";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import style from "./ExCard.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);

const ExCard = ({
  data,
  isDisabled,
  isAgain,
}: {
  data: Ex | ExAgain;
  isDisabled?: boolean;
  isAgain: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={cx("card")}
        onClick={() =>
          !isDisabled && navigate(`/ex_detail/${data.id}/${isAgain}`)
        }
      >
        <p className={cx("card-title")}>{data.title}</p>
        <div className={cx("card-body")}>
          <div className={cx("card-content")}>
            <p className={cx("card-desc")}>{data.description}</p>
          </div>
          <BookOpenIcon className="icon" width={52} height={52} />
        </div>
      </div>
    </>
  );
};

export default ExCard;
