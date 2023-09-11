import React, { useEffect, useState } from "react";
import style from "./IndexManageUser.module.scss";
import classNames from "classnames/bind";
import { Button, Checkbox } from "../../../components";
import { Student } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getAllStudents } from "../../../redux/slice/adminSlice";
import EditStudent from "./EditStudent";
const cx = classNames.bind(style);

const IndexManageUser = () => {
  const users = useSelector((state: RootState) => state.admin.listUsers);

  const dispatch = useDispatch<AppDispatch>();
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Student>();
  const [isOpenRemoveForm, setIsOpenRemoveForm] = useState(false);

  useEffect(() => {
    dispatch(getAllStudents());
  }, [dispatch]);

  const getCheckedItem = (id: string): boolean => {
    // return value true or false if this pathID is selected
    return selectedItem?.id === id;
  };

  return (
    <>
      <div className="container">
        <h2 className={cx("title")}>Manage Users</h2>
        <div className={cx("handler")}>
          <Button
            isPrimary={false}
            onClick={() => {
              setIsOpenForm(true);
              // navigate("/path_detail/" + selectedItems);
            }}
          >
            Cập nhật
          </Button>
          <Button
            isPrimary={false}
            isDanger={true}
            onClick={() => {
              // setIsOpenRemoveForm(true);
            }}
          >
            Xóa
          </Button>
        </div>
        <table className={cx("table")}>
          <thead>
            <tr>
              <th></th>
              <th>stt</th>
              <th>Email</th>
              <th>Name</th>
              <th>Level</th>
              <th>Birth</th>
            </tr>
          </thead>
          <tbody>
            {users !== undefined &&
              users.map((item, i) => (
                <tr key={i}>
                  <td width={10}>
                    {item.id && (
                      <Checkbox
                        value={item.id}
                        isChecked={getCheckedItem(item.id)}
                        onChecked={() => {
                          // setSelectPath(item.id);
                          setSelectedItem(item);
                        }}
                      ></Checkbox>
                    )}
                  </td>
                  <td width={10}>{i + 1}</td>
                  <td>{item.email}</td>
                  <td>{item.name}</td>
                  <td>{item.level}</td>
                  <td>{item.birthday?.toDateString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {selectedItem && (
        <EditStudent
          onClose={() => {
            setIsOpenForm(false);
          }}
          isDisplay={isOpenForm}
          data={selectedItem}
        />
      )}
    </>
  );
};

export default IndexManageUser;
