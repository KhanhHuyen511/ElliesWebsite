import { useEffect, useState } from "react";
import { Doc, StudyCard, StudyCardType } from "../../../types";
import { Button, Checkbox, Input, TextArea } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  getADocWithType,
  updateDocument,
} from "../../../redux/slice/adminSlice";
import { Col, Row } from "react-flexbox-grid";
import style from "./IndexDocument.module.scss";
import classNames from "classnames/bind";
import CreateVocab from "./CreateVocabForm";
import EditVocab from "./EditVocabForm";
import RemoveVocab from "./RemoveVocabForm";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
const cx = classNames.bind(style);

const EditDocForm = () => {
  let { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const data = useSelector((state: RootState) => state.admin.currentDoc);
  const [list, setList] = useState<StudyCard[]>();

  const { register, handleSubmit, reset, getValues, setValue, watch } = useForm(
    {
      defaultValues: {
        title: "",
        description: "",
      },
    }
  );

  const onSubmit = async () => {
    if (data)
      await dispatch(
        updateDocument({
          oldData: data,
          data: {
            ...data,
            title: getValues("title"),
            description: getValues("description"),
          },
        })
      );

    reloadList();
  };

  const onCancel = () => {
    reset();
  };

  const reloadList = async () => {
    if (id) {
      await dispatch(getADocWithType({ doc_id: id, type: "0" })).then(
        (data) => {
          const newData = data.payload as Doc;

          setValue("title", newData.title);
          setValue(
            "description",
            newData.description ? newData.description : ""
          );
          setList(newData.vocabs);
        }
      );
    }
  };

  useEffect(() => {
    const getList = async () => {
      if (id) {
        const newData = (
          await dispatch(getADocWithType({ doc_id: id, type: "0" }))
        ).payload as Doc;

        if (newData) {
          console.log("update data");
          setValue("title", newData.title);
          setValue(
            "description",
            newData.description ? newData.description : ""
          );
          setList(newData.vocabs);
        }
      }
    };

    getList();
  }, [dispatch, id, setValue]);

  const [isOpenCard, setIsOpenCard] = useState(false);
  const [isOpenEditCardForm, setIsOpenEditCardForm] = useState(false);
  const [isOpenRemoveCardForm, setIsOpenRemoveCardForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StudyCard>();

  const getCheckedItems = (item: StudyCard): boolean => {
    return selectedItem ? selectedItem.id === item.id : false;
  };

  return (
    <>
      <div className="container">
        <p className={cx("title")}>Edit doc: {data?.title}</p>
        <div className={cx("handler")}>
          <Button
            isPrimary={false}
            onClick={() => {
              setIsOpenEditCardForm(true);
            }}
          >
            View
          </Button>
          <Button
            isPrimary={false}
            onClick={() => {
              setIsOpenCard(true);
            }}
          >
            Create new
          </Button>
          <Button
            isPrimary={false}
            isDanger={true}
            onClick={() => {
              setIsOpenRemoveCardForm(true);
            }}
          >
            Delete
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
                  <th>Vocabulary</th>
                  <th>Meaning</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item, index) => (
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
              label={"Topic"}
              placeholder={"fill topic"}
              register={register("title")}
            ></Input>
            <TextArea
              label={"Description"}
              placeholder={"fill description"}
              register={register("description")}
            ></TextArea>
            <div className={cx("cta")}>
              <Button
                isPrimary
                onClick={handleSubmit(onSubmit)}
                isDisabled={
                  watch("title") === data?.title &&
                  watch("description") === data?.description
                }
              >
                Update
              </Button>
              <Button
                isPrimary={false}
                onClick={onCancel}
                isDisabled={
                  watch("title") === data?.title &&
                  watch("description") === data?.description
                }
              >
                Cancel
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      {id && isOpenCard && (
        <CreateVocab
          type={StudyCardType.Vocab}
          onClose={() => setIsOpenCard(false)}
          isDisplay={isOpenCard}
          doc_id={id}
          onReload={reloadList}
        />
      )}

      {isOpenEditCardForm && selectedItem && (
        <EditVocab
          vocab={selectedItem}
          onClose={() => setIsOpenEditCardForm(false)}
          isDisplay={isOpenEditCardForm}
          type={StudyCardType.Vocab}
          onReload={reloadList}
        ></EditVocab>
      )}

      {id && isOpenRemoveCardForm && selectedItem && (
        <RemoveVocab
          docId={id}
          vocab={selectedItem}
          type={StudyCardType.Vocab}
          onClose={() => setIsOpenRemoveCardForm(false)}
          isDisplay={isOpenRemoveCardForm}
          onReload={reloadList}
        ></RemoveVocab>
      )}
    </>
  );
};

export default EditDocForm;
