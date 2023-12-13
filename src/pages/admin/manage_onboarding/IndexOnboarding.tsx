import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import style from "./IndexOnboarding.module.scss";
import CreateOnboardingForm from "./CreateOnboardingForm";
import EditOnboardingForm from "./EditOnboardingForm";
import DeleteOnboardingForm from "./DeleteOnboardingForm";
import { Button, Checkbox } from "../../../components";
import { OnboardingType } from "../../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { getOnboardingList } from "../../../redux/slice/adminSlice";
const cx = classNames.bind(style);

const IndexOnboarding = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [list, setList] = useState<OnboardingType[]>([]);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [isOpenDeleteForm, setIsOpenDeleteForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<OnboardingType>();

  useEffect(() => {
    const fetchList = async () => {
      const { payload: data } = await dispatch(getOnboardingList());

      setList(data as OnboardingType[]);
    };

    fetchList();
  }, [dispatch]);

  const getCheckedItems = (item: OnboardingType) => {
    return item.id === selectedItem?.id;
  };

  const reloadList = async () => {
    const { payload: data } = await dispatch(getOnboardingList());

    setList(data as OnboardingType[]);
  };

  return (
    <>
      <div className={cx("container")}>
        <div className={cx("wrapper-filter")}></div>
        <div className={cx("section")}>
          <h2 className={cx("title")}>Manage exercise</h2>
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
        <CreateOnboardingForm
          onClose={() => setIsOpenForm(false)}
          isDisplay={isOpenForm}
          onReload={reloadList}
        />
      )}

      {selectedItem && isOpenEditForm && (
        <EditOnboardingForm
          data={selectedItem}
          onClose={() => setIsOpenEditForm(false)}
          isDisplay={isOpenEditForm}
          onReload={reloadList}
        />
      )}

      {selectedItem && isOpenDeleteForm && (
        <DeleteOnboardingForm
          id={selectedItem.id}
          onClose={() => setIsOpenDeleteForm(false)}
          isDisplay={isOpenDeleteForm}
          onReload={reloadList}
        />
      )}
    </>
  );
};

export default IndexOnboarding;
