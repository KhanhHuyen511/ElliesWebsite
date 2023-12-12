import { useDispatch } from "react-redux";
import { Input, Popup } from "../../../components";
import { removeAExDetail } from "../../../redux/slice/adminSlice";
import { AppDispatch } from "../../../redux/store";
import { ExDetail, GameType } from "../../../types";
import style from "./DetailExercise.module.scss";
import classNames from "classnames/bind";
import { Col, Row } from "react-flexbox-grid";
const cx = classNames.bind(style);

const RemoveExDetail = ({
  exId,
  data,
  title,
  isDisplay,
  onClose,
}: {
  exId: string;
  data: ExDetail;
  title: string;
  isDisplay: boolean;
  onClose: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Popup
        title={`Delete - ${title}`}
        onClose={onClose}
        onSubmit={() => {
          if (data) {
            dispatch(
              removeAExDetail({
                exId,
                id: data.id,
              })
            );
          }
        }}
        isDisplay={isDisplay}
        classNames={cx("create-form")}
      >
        <Row>
          <Col md={6}>
            <table className={cx("table")}>
              <thead>
                <tr>
                  <th>Display</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.vocab?.display}</td>
                  <td>{data.vocab?.meaning}</td>
                </tr>
              </tbody>
            </table>
          </Col>
          <Col md={6}>
            {data.type == GameType.FillInSentence && (
              <Input
                label="Keyword"
                value={data.keyWord}
                placeholder={""}
                onChange={() => {}}
                isDisabled
              ></Input>
            )}
            {data.type != GameType.SortWords && (
              <>
                <Input
                  label="Option 1"
                  value={data.options ? data.options[0] : ""}
                  isDisabled
                ></Input>
                <Input
                  label="Option 2"
                  value={data.options ? data.options[1] : ""}
                ></Input>
                <Input
                  label="Option 3"
                  value={data.options ? data.options[2] : ""}
                ></Input>
                <Input
                  label="Option 4"
                  value={data.options ? data.options[3] : ""}
                ></Input>
                <Input label="Answer" value={data.answer} isRequired></Input>
              </>
            )}
            <Input
              label="Type"
              value={data.type.toString()}
              placeholder={""}
              onChange={() => {}}
              isDisabled
            ></Input>
          </Col>
        </Row>
      </Popup>
    </>
  );
};

export default RemoveExDetail;
