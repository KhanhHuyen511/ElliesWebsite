import React, { useEffect, useState } from "react";
import { Doc, StudyCard, StudyCardType } from "../../../types";
import { Button, Checkbox, Input, Popup } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  getADocWithType,
  setVocab,
  updateDocument,
} from "../../../redux/slice/adminSlice";
import { Col, Row } from "react-flexbox-grid";
import style from "./IndexDocument.module.scss";
import classNames from "classnames/bind";
import { getADoc } from "../../../redux/slice/docSlice";
import CreateVocab from "./CreateVocabForm";
import EditVocab from "./EditVocabForm";
import { useParams } from "react-router-dom";
const cx = classNames.bind(style);

const EditDocForm = () => {
  let { id, type } = useParams();

  const data = useSelector((state: RootState) => state.admin.currentDoc);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(getADocWithType({ doc_id: id, type: "Vocab" }));
      if (data) {
        setTitle(data.title);
        if (data.description) setDescription(data.description);
      }
    }
  }, [dispatch, id, data?.title, data?.description]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isOpenCard, setIsOpenCard] = useState(false);
  const [isOpenEditCardForm, setIsOpenEditCardForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StudyCard>();

  const getCheckedItems = (item: StudyCard): boolean => {
    return selectedItem === item;
  };

  return (
    <div>
      <div className="container">
        <p>Cập nhật tài liệu chủ đề: {title}</p>
        <div className={cx("handler")}>
          <Button
            isPrimary={false}
            onClick={() => {
              setIsOpenEditCardForm(true);
            }}
          >
            Xem chi tiết
          </Button>
          <Button
            isPrimary={false}
            onClick={() => {
              setIsOpenCard(true);
            }}
          >
            Tạo mới
          </Button>
          <Button isPrimary={false} isDanger={true} onClick={() => {}}>
            Xóa
          </Button>
          {/* <Checkbox
              isChecked={isSelectedAll}
              label='Tất cả'
              onChecked={() => setSelectAllItems(!isSelectedAll)}
            ></Checkbox> */}
        </div>
        <Row>
          <Col md={6}>
            <table className={cx("table")}>
              <thead>
                <tr>
                  <th></th>
                  <th>Từ vựng</th>
                  <th>Nghĩa</th>
                </tr>
              </thead>
              <tbody>
                {data?.listItems &&
                  data?.listItems.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item.id && (
                          <Checkbox
                            value={item.id}
                            isChecked={getCheckedItems(item)}
                            onChecked={() => {
                              setSelectedItem(item);
                            }}
                          ></Checkbox>
                        )}
                      </td>
                      <td>{item.display}</td>
                      <td>{item.meaning}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Col>
          <Col md={6}>
            <Input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              label={"Chủ đề"}
              placeholder={"abc"}
            ></Input>
            <Input
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              label={"Mô tả"}
              placeholder={"abc"}
            ></Input>
            <Button
              isPrimary={false}
              onClick={() => {
                if (data) {
                  setTitle(data?.title);
                  if (data.description) setDescription(data?.description);
                }
              }}
            >
              Huỷ
            </Button>
            <Button
              isPrimary
              onClick={() => {
                if (data)
                  dispatch(
                    updateDocument({
                      oldData: data,
                      data: { ...data, title, description },
                    })
                  );
              }}
            >
              Cập nhật
            </Button>
          </Col>
        </Row>
      </div>

      {id && (
        <CreateVocab
          type={StudyCardType.Vocab}
          onClose={() => setIsOpenCard(false)}
          isDisplay={isOpenCard}
          doc_id={id}
        />
      )}

      {isOpenEditCardForm && selectedItem && (
        <EditVocab
          vocab={selectedItem}
          onClose={() => setIsOpenEditCardForm(false)}
          isDisplay={isOpenEditCardForm}
          type={StudyCardType.Vocab}
        ></EditVocab>
      )}
    </div>
  );
};

export default EditDocForm;
