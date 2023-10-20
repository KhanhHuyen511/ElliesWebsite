import style from "../IndexPage.module.scss";
import classNames from "classnames/bind";
import { Button } from "../../../components";
import { Col, Row } from "react-flexbox-grid";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(style);

const Description = () => {
  const navigator = useNavigate();

  return (
    <Col xs={12} md={8} lg={6} className="container">
      <h1 className={cx("page-title")}>Go home! Round 01!</h1>
      <p>
        Now, it is 5PM. Alice are an IT-er and she has to “Go home”! News talk
        road to her home is very bad. You need help Alice across obstacles!
      </p>
      <br />
      <p>
        Answer the question, if you’re right, Alice admit to go straight. If
        you’re wrong, Alice need to answer an other.
      </p>
      <br />
      <p>
        Alice is easy to tired! She has 3 energy parts. When you fail 1
        question, Alice lost 1 energy part. She can not to go home if remain 0
        energy part.
      </p>

      <Row center="xs" className={cx("cta-wrapper")}>
        <Col xs={6}>
          <Button
            className={cx("btn-start")}
            isPrimary
            onClick={() => {
              navigator(`./start`);
            }}
            haveIcon
          >
            Start
          </Button>
        </Col>
      </Row>
    </Col>
  );
};

export default Description;
