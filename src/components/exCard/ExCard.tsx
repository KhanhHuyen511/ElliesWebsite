import { Ex, ExAgain, ExState } from "../../types";
import {
  BookOpenIcon,
  CheckCircleIcon,
  CursorArrowRaysIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import style from "./ExCard.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);

const ExCard = ({ data, state }: { data: Ex | ExAgain; state: ExState }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={cx("card")}
        onClick={() =>
          (state === ExState.Normal || state === ExState.DoAgain) &&
          navigate(`/ex_detail/${data.id}/${state === ExState.DoAgain}`)
        }
      >
        <p className={cx("card-title")}>{data.title}</p>
        <div className={cx("card-body")}>
          <div className={cx("card-content")}>
            <p className={cx("card-desc")}>{data.description}</p>
          </div>
          {state === ExState.Completed ? (
            <CheckCircleIcon
              className={cx("is-completed-icon")}
              width={52}
              height={52}
            />
          ) : state === ExState.DoAgain ? (
            <CursorArrowRaysIcon
              className={cx("is-do-again-icon")}
              width={52}
              height={52}
            />
          ) : state === ExState.Doing ? (
            <EllipsisHorizontalIcon
              className={cx("is-doing-icon")}
              width={52}
              height={52}
            />
          ) : (
            <BookOpenIcon className="icon" width={52} height={52} />
          )}
        </div>
      </div>
    </>
  );
};

export default ExCard;
