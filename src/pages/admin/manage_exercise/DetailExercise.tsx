import React, { useEffect, useState } from "react";
import { Button, Checkbox, Input, TextArea } from "../../../components";
import style from "./DetailExercise.module.scss";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-flexbox-grid";
import { Ex, ExDetail, GameType, StudyCard } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAExercise, updateAExercise } from "../../../redux/slice/adminSlice";
import CreateExDetail from "./CreateExDetail";
import EditExDetail from "./EditExDetail";
const cx = classNames.bind(style);

const DetailExercise = () => {
  const dispatch = useDispatch<AppDispatch>();

  const data: Ex | undefined = useSelector(
    (state: RootState) => state.admin.currentEx
  );

  let { id } = useParams();

  useEffect(() => {
    if (id) dispatch(getAExercise(id));
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
    }
  }, [dispatch, id, data?.title, data?.description]);

  const [title, setTitle] = useState("hi");
  const [description, setDescription] = useState("");
  const [isOpenCreateForm, setIsOpenCreateForm] = useState<boolean>(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ExDetail>();

  return (
    <>
      <div className="container">
        {data && (
          <>
            <Row>
              <Col md={6}>
                <form>
                  <p className={cx("form-title")}>Chi tiết bài luyện tập</p>
                  <div className={cx("form-body")}>
                    <Input
                      label="Chủ đề"
                      type="text"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      placeholder="abc"
                    />
                    <TextArea
                      label="Mô tả"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      placeholder="abc"
                      classNames={cx("textarea")}
                    />
                  </div>
                  <Button
                    isPrimary
                    preventDefault
                    onClick={() => {
                      if (id)
                        dispatch(updateAExercise({ id, title, description }));
                    }}
                    className={cx("submit-btn")}
                  >
                    Cập nhật
                  </Button>
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
                      Thêm câu hỏi
                    </Button>
                    <Button
                      isPrimary={false}
                      onClick={() => {
                        setIsOpenEditForm(true);
                      }}
                      preventDefault
                    >
                      Xem câu hỏi
                    </Button>
                    <Button isPrimary={false} onClick={() => {}} preventDefault>
                      Xóa câu hỏi
                    </Button>
                  </div>
                  <table className={cx("table")}>
                    <thead>
                      <tr>
                        <th></th>
                        <th>STT</th>
                        <th>Từ vựng</th>
                        <th>Loại câu hỏi</th>
                        <th>Đáp án</th>
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
            {id && isOpenCreateForm && title && (
              <CreateExDetail
                id={id}
                title={data.title}
                isDisplay={isOpenCreateForm}
                onClose={() => setIsOpenCreateForm(false)}
              />
            )}
            {id && selectedItem && isOpenEditForm && title && (
              <EditExDetail
                exId={id}
                data={selectedItem}
                title={data.title}
                isDisplay={isOpenEditForm}
                onClose={() => setIsOpenEditForm(false)}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DetailExercise;
