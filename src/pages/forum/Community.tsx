import React, { useEffect, useState } from "react";
import style from "./Community.module.scss";
import classNames from "classnames/bind";
import { StudentCard } from "../../components";
import { getAllStudents } from "../../redux/slice/adminSlice";
import { Student } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { Col, Row } from "react-flexbox-grid";
import StudentInfoModal from "../../components/forum/StudentInfoModal";
const cx = classNames.bind(style);

const Community = () => {
  const [list, setList] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student>();
  const [isOpenInfoModal, setIsOpenInfoModal] = useState<boolean>();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchStudentList = async () => {
      const { payload: data } = await dispatch(getAllStudents());

      setList(data as Student[]);
    };

    fetchStudentList();
  }, [dispatch]);

  const handleCloseInfoModal = () => {
    setIsOpenInfoModal(false);
    setSelectedStudent(undefined);
  };

  return (
    <div>
      <h1 className={cx("sub-title")}>All students</h1>
      <Row>
        {list.length > 0 &&
          list.map((item, index) => (
            <Col xs={12} sm={6} md={4} lg={3} className={cx("item")}>
              <StudentCard
                key={index}
                data={item}
                onClick={() => {
                  setSelectedStudent(item);
                  setIsOpenInfoModal(true);
                }}
              />
            </Col>
          ))}
      </Row>

      {selectedStudent && (
        <StudentInfoModal
          isDisplay={true}
          data={selectedStudent}
          onClose={handleCloseInfoModal}
        />
      )}
    </div>
  );
};

export default Community;
