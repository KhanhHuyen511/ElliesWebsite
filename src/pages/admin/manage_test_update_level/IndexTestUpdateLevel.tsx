import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./IndexTestUpdateLevel.module.scss";
import { Button, Checkbox } from "../../../components";
import { TestType } from "../../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { getTestList, getTestListAdmin } from "../../../redux/slice/adminSlice";
import CreateTestForm from "./CreateTestForm";
import EditTestForm from "./EditTestForm";
import DeleteTestForm from "./DeleteTestForm";
const cx = classNames.bind(style);

const IndexTestUpdateLevel = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [list, setList] = useState<TestType[]>([]);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TestType>();

  useEffect(() => {
    const fetchList = async () => {
      const { payload: data } = await dispatch(getTestListAdmin());

      setList(data as TestType[]);
    };

    fetchList();
  }, [dispatch]);

  const getCheckedItems = (item: TestType) => {
    return item.id === selectedItem?.id;
  };

  const reloadList = async () => {
    const { payload: data } = await dispatch(getTestListAdmin());

    setList(data as TestType[]);
  };

  return (
    <>
      <div className={cx("container")}>
        <div className={cx("wrapper-filter")}></div>
        <div className={cx("section")}>
          <h2 className={cx("title")}>Manage test level up</h2>
          <>
            <div className={cx("handler")}>
              <Button isPrimary={false} onClick={() => setIsOpenEditForm(true)}>
                View
              </Button>
              <Button
                isPrimary={false}
                onClick={() => {
                  setIsOpenForm(true);
                }}
              >
                Create new
              </Button>
              <Button
                isPrimary={false}
                onClick={() => {
                  setIsOpenDeleteForm(true);
                }}
              >
                Delete
              </Button>
            </div>
            <table className={cx("table")}>
              <thead>
                <tr>
                  <th></th>
                  <th>STT</th>
                  <th>Question</th>
                  <th>Type</th>
                  <th>Level</th>
                </tr>
              </thead>
              <tbody>
                {list &&
                  list.map((item, i) => (
                    <tr key={i}>
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
                      <td>{i + 1}</td>
                      <td>{item.question.ques}</td>
                      <td>{item.type}</td>
                      <td>{item.level}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        </div>
      </div>

      {isOpenForm && (
        <CreateTestForm
          onClose={() => setIsOpenForm(false)}
          isDisplay={isOpenForm}
          onReload={reloadList}
        />
      )}

      {selectedItem && isOpenEditForm && (
        <EditTestForm
          data={selectedItem}
          onClose={() => setIsOpenEditForm(false)}
          isDisplay={isOpenEditForm}
          onReload={reloadList}
        />
      )}

      {selectedItem && isOpenDeleteForm && (
        <DeleteTestForm
          id={selectedItem.id}
          onClose={() => setIsOpenDeleteForm(false)}
          isDisplay={isOpenDeleteForm}
          onReload={reloadList}
        />
      )}
    </>
  );
};

export default IndexTestUpdateLevel;
