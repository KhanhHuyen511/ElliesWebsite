import style from "./IndexPage.module.scss";
import classNames from "classnames/bind";
import { GameCard } from "../../components";
import { Col } from "react-flexbox-grid";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);

const IndexPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <Col xs={12} md={8} lg={6}>
        <p className={cx("page-title")}>Game</p>
        <GameCard
          title={"Go Home!"}
          onClick={() => {
            navigate("../go_home");
          }}
        />
      </Col>
    </div>
  );
};

export default IndexPage;
