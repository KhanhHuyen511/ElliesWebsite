import { useEffect, useState } from "react";
import { Button, Checkbox, Input, TextArea } from "../../../components";
import style from "./DetailExercise.module.scss";
import classNames from "classnames/bind";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Row } from "react-flexbox-grid";
import { Ex, ExDetail, GameType, LevelType } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  getAExercise,
  removeAExercise,
  updateAExercise,
} from "../../../redux/slice/adminSlice";
import CreateExDetail from "./CreateExDetail";
import EditExDetail from "./EditExDetail";
import RemoveExDetail from "./RemoveExDetail";
import { useForm } from "react-hook-form";
const cx = classNames.bind(style);

const DetailExercise = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const data: Ex | undefined = useSelector(
    (state: RootState) => state.admin.currentEx
  );

  let { id } = useParams();

  const { register, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (id)
      dispatch(getAExercise(id)).then((d) => {
        const newData = d.payload as Ex;

        setValue("title", newData.title);
        setValue("description", newData.description);
      });
  }, [dispatch, id, setValue]);

  const [isOpenCreateForm, setIsOpenCreateForm] = useState<boolean>(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false);
  const [isOpenRemoveForm, setIsOpenRemoveForm] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ExDetail>();

  const onSubmit = async () => {
    if (id) {
      await dispatch(
        updateAExercise({
          id,
          title: getValues("title"),
          description: getValues("description"),
        })
      );
    }
  };

  return (
    <>
      <div className="container">
        {data && (
          <>
            <Row>
              <Col md={6}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <p className={cx("form-title")}>
                    Detail exercise - {data.title}
                  </p>
                  <div className={cx("form-body")}>
                    <Input
                      label="Topic"
                      type="text"
                      placeholder="fill topic"
                      register={register("title")}
                    />
                    <TextArea
                      label="Description"
                      placeholder="fill description"
                      classNames={cx("textarea")}
                      register={register("description")}
                    />
                  </div>
                  <div className={cx("handler")}>
                    <Button isPrimary className={cx("submit-btn")}>
                      Save
                    </Button>
                    <Button
                      isPrimary={false}
                      preventDefault
                      onClick={() => {
                        if (id)
                          dispatch(removeAExercise({ id })).then(() =>
                            navigate(-1)
                          );
                      }}
                      className={cx("submit-btn")}
                    >
                      Remove
                    </Button>
                  </div>
                </form>
              </Col>
              <Col md={6}>
                <form>
                  <div className={cx("handler", "list")}>
                    <Button
                      isPrimary={false}
                      preventDefault
                      onClick={() => {
                        setIsOpenCreateForm(true);
                      }}
                    >
                      Add question
                    </Button>
                    <Button
                      isPrimary={false}
                      onClick={() => {
                        setIsOpenEditForm(true);
                      }}
                      preventDefault
                    >
                      View
                    </Button>
                    <Button
                      isPrimary={false}
                      onClick={() => {
                        setIsOpenRemoveForm(true);
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
                        <th>Vocab</th>
                        <th>Type</th>
                        <th>Answer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.listItems?.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Checkbox
                              isChecked={
                                selectedItem && item.id === selectedItem.id
                              }
                              onChecked={() => {
                                setSelectedItem(item);
                              }}
                            />
                          </td>
                          <td>{index + 1}</td>
                          <td>{item.vocab?.display}</td>
                          <td>{GameType[item.type]}</td>
                          <td>{item.answer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </form>
              </Col>
            </Row>
            {id && isOpenCreateForm && (
              <CreateExDetail
                id={id}
                title={data.title}
                level={data.level ? data.level : LevelType.Beginner}
                isDisplay={isOpenCreateForm}
                onClose={() => setIsOpenCreateForm(false)}
              />
            )}
            {id && selectedItem && isOpenEditForm && (
              <EditExDetail
                exId={id}
                data={selectedItem}
                title={data.title}
                isDisplay={isOpenEditForm}
                onClose={() => setIsOpenEditForm(false)}
              />
            )}

            {id && selectedItem && isOpenRemoveForm && (
              <RemoveExDetail
                exId={id}
                data={selectedItem}
                title={data.title}
                isDisplay={isOpenRemoveForm}
                onClose={() => setIsOpenRemoveForm(false)}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DetailExercise;
