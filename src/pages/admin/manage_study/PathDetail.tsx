import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./PathDetail.module.scss";
import { Button, Checkbox, Input } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  getStudyPath,
  getStudyRoute,
  updateStudyPath,
} from "../../../redux/slice/adminSlice";
import { StudyCard, StudyPath, StudyRoute } from "../../../types";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-flexbox-grid";
import CreateRouteForm from "./CreateRouteForm";
import EditRouteForm from "./EditRouteForm";
import CreateStudyCard from "./CreateStudyCard";
import EditCardForm from "./EditCardForm";
import RemoveRouteForm from "./RemoveRouteForm";
const cx = classNames.bind(styles);

const PathDetail = () => {
  let { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const data: StudyPath = useSelector(
    (state: RootState) => state.admin.currentStudyPath
  );

  const currentRoute: StudyRoute = useSelector(
    (state: RootState) => state.admin.currentStudyRoute
  );

  useEffect(() => {
    if (id) dispatch(getStudyPath(id));
    setName(data.name);
    setTopic(data.topic);
    setLevel(data.level);
  }, [dispatch, id, data.name, data.topic, data.level]);

  const [name, setName] = useState<string>();
  const [level, setLevel] = useState<string>();
  const [topic, setTopic] = useState<string>();
  // const [currentStudyRoute, setCurrentStudyRoute] = useState<StudyRoute>();
  const [isOpenRouteForm, setIsOpenRouteForm] = useState<boolean>(false);
  const [isOpenEditRouteForm, setIsOpenEditRouteForm] =
    useState<boolean>(false);
  const [isOpenRemoveRouteForm, setIsOpenRemoveRouteForm] =
    useState<boolean>(false);
  const [isOpenEditCardForm, setIsOpenEditCardForm] = useState<boolean>(false);
  const [isOpenCardForm, setIsOpenCardForm] = useState<boolean>(false);
  const [selectRoute, setSelectRoute] = useState<StudyRoute>();
  const [curretntStudyCard, setCurrentStudyCard] = useState<StudyCard>();

  return (
    <div className={cx("wrapper", "container")}>
      <Row>
        <Col md={6}>
          <form>
            <p className={cx("form-title")}>Path {data.name}</p>
            <div className={cx("form-body")}>
              <Input
                label="Name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="fill name"
              />
              <Input
                label="Topic"
                type="text"
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                }}
                placeholder="fill topic"
              />
              <Input
                label="Level"
                type="text"
                value={level}
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
                placeholder="fill level"
              />
            </div>
            <Button
              isPrimary
              preventDefault
              onClick={() => {
                dispatch(updateStudyPath({ id: id, name, level, topic }));
              }}
              className={cx("submit-btn")}
            >
              Update
            </Button>
            <div>
              <div className={cx("handler", "list")}>
                <Button
                  isPrimary={false}
                  preventDefault
                  onClick={() => {
                    setIsOpenRouteForm(true);
                  }}
                >
                  Add route
                </Button>
                <Button
                  isPrimary={false}
                  onClick={() => {
                    if (id && selectRoute?.id) {
                      dispatch(
                        getStudyRoute({ path_id: id, id: selectRoute.id })
                      );
                    }
                  }}
                  preventDefault
                >
                  View
                </Button>
                <Button
                  isPrimary={false}
                  onClick={() => {
                    if (id && selectRoute) {
                      // dispatch(getStudyRoute({ path_id: id, id: selectRoute }));
                      // setCurrentStudyRoute(currentRoute);
                    }
                    setIsOpenEditRouteForm(true);
                  }}
                  preventDefault
                >
                  Edit
                </Button>
                <Button
                  isPrimary={false}
                  onClick={() => {
                    setIsOpenRemoveRouteForm(true);
                  }}
                  preventDefault
                >
                  Delete
                </Button>
              </div>
              <table className={cx("table")}>
                <thead>
                  <tr>
                    <th></th>
                    <th>STT</th>
                    <th>Name</th>
                    <th>Count word/sentence</th>
                  </tr>
                </thead>
                <tbody>
                  {data.studyRoutes?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <Checkbox
                          onChecked={() => {
                            setSelectRoute(item);
                          }}
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.cards?.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </Col>
        <Col md={6}>
          <>
            <p className={cx("form-title")}>Route {currentRoute.name}</p>
            <div className={cx("handler", "list")}>
              <Button
                isPrimary={false}
                preventDefault
                onClick={() => {
                  setIsOpenCardForm(true);
                }}
              >
                Add sentence
              </Button>
              <Button
                isPrimary={false}
                onClick={() => {
                  setIsOpenEditCardForm(true);
                }}
                preventDefault
              >
                Delete
              </Button>
            </div>
            <table className={cx("table")}>
              <thead>
                <tr>
                  <th></th>
                  <th>STT</th>
                  <th>Name</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                {currentRoute?.vocabs?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Checkbox
                        onChecked={() => {
                          setCurrentStudyCard(item);
                        }}
                      ></Checkbox>
                    </td>
                    <td>{index + 1}</td>
                    <td>{item.display}</td>
                    <td>{item.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        </Col>
      </Row>

      {id && isOpenRouteForm && (
        <CreateRouteForm
          isDisplay={isOpenRouteForm}
          pathID={id}
          onClose={() => {
            setIsOpenRouteForm(false);
          }}
        />
      )}

      {id && selectRoute?.id && isOpenEditRouteForm && (
        <EditRouteForm
          pathID={id}
          id={selectRoute.id}
          onClose={() => {
            setIsOpenEditRouteForm(false);
          }}
          isDisplay={isOpenEditRouteForm}
        />
      )}

      {id && selectRoute?.id && isOpenCardForm && (
        <CreateStudyCard
          pathID={id}
          routeID={selectRoute.id}
          topic={topic ? topic : ""}
          onClose={() => {
            setIsOpenCardForm(false);
          }}
          isDisplay={isOpenCardForm}
        />
      )}

      {isOpenEditCardForm && id && curretntStudyCard && selectRoute?.id && (
        <EditCardForm
          data={curretntStudyCard}
          pathID={id}
          routeID={selectRoute.id}
          onClose={() => {
            setIsOpenEditCardForm(false);
          }}
          isDisplay={isOpenEditCardForm}
        />
      )}

      {isOpenRemoveRouteForm && id && selectRoute && selectRoute.id && (
        <RemoveRouteForm
          data={selectRoute}
          pathID={id}
          routeID={selectRoute.id}
          onClose={() => {
            setIsOpenRemoveRouteForm(false);
          }}
          isDisplay={isOpenRemoveRouteForm}
        />
      )}
    </div>
  );
};

export default PathDetail;
