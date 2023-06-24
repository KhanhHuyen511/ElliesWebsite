import { useState } from "react";
import styles from "./IndexDocument.module.scss";
import classNames from "classnames/bind";
import { Button, Checkbox } from "../../../components";
import { Doc, StudyCard, StudyCardType } from "../../../types";
import CreateDocForm from "./CreateDocForm";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

const VocabDoc = ({ list, type }: { list?: Doc[]; type: StudyCardType }) => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Doc>();

  const getCheckedItems = (item: StudyCard): boolean => {
    return selectedItem === item;
  };

  const navigate = useNavigate();

  return (
    <>
      <div className={cx("handler")}>
        <Button
          isPrimary={false}
          onClick={() => {
            if (selectedItem)
              navigate(`/doc_detail/${selectedItem.id}/${type}`);
          }}
        >
          Xem chi tiết
        </Button>
        <Button
          isPrimary={false}
          onClick={() => {
            setIsOpenForm(true);
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
      <table className={cx("table")}>
        <thead>
          <tr>
            <th></th>
            <th>Chủ đề</th>
            <th>Số lượng</th>
            {/* <th>Audio</th> */}
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
                <td>{item.title}</td>
                <td>{item.listItemIds?.length}</td>
                {/* <td>{item.audio}</td> */}
              </tr>
            ))}
        </tbody>
      </table>

      <CreateDocForm
        type={type}
        onClose={() => setIsOpenForm(false)}
        isDisplay={isOpenForm}
      ></CreateDocForm>
    </>
  );
};

export default VocabDoc;
