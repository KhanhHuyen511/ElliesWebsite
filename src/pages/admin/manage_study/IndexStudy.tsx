import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './IndexStudy.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { getStudyPath, getStudyPaths } from '../../../redux/slice/adminSlice';
import { Button, Checkbox, Input } from '../../../components';
import CreateStudyForm from './CreateStudyForm';
import { StudyPath } from '../../../types';
import { useNavigate } from 'react-router-dom';
import Popup from '../../../components/popup/Popup';
const cx = classNames.bind(styles);

const IndexStudy = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isOpenForm, setIsOpenForm] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string | string[]>();
  const [isSelectedAll, setIsSelectedAll] = useState(false);

  const listStudyPaths = useSelector(
    (state: RootState) => state.admin.listStudyPaths
  );

  useEffect(() => {
    dispatch(getStudyPaths());
  }, [dispatch, listStudyPaths]);

  const navigate = useNavigate();

  const setSelectAllItems = (isAll: boolean) => {
    setIsSelectedAll(isAll);
    setSelectedItems(undefined);

    if (isAll) {
      const ids: string[] = listStudyPaths.map((e) => (e.id ? e.id : ''));
      setSelectedItems(ids);
    }
  };

  const setSelectPath = (pathID?: string) => {
    if (pathID && selectedItems && selectedItems.length > 0) {
      // if select multi item
      // checked = false
      if (!selectedItems.includes(pathID)) {
        if (typeof selectedItems !== 'string' && selectedItems.length > 1) {
          setSelectedItems([...selectedItems, pathID]);
        } else {
          const ids: string[] = [];
          ids.push(selectedItems as string);
          ids.push(pathID);
          setSelectedItems(ids);
        }
      } else {
        // checked = true
        if (selectedItems.length > 1 && typeof selectedItems !== 'string') {
          const pathIndex = selectedItems.indexOf(pathID);
          const newItems: string[] = selectedItems as string[];
          newItems.splice(pathIndex, 1);
          setSelectedItems(newItems);
        } else {
          setSelectedItems(undefined);
        }
      }
      // if select a single item
    } else {
      setSelectedItems(pathID);
    }
  };

  const getCheckedItems = (pathID: string): boolean => {
    // return value true or false if this pathID is selected
    if (selectedItems)
      return selectedItems.length > 0 && selectedItems.includes(pathID);
    else return false;
  };

  return (
    <>
      <div className={cx('container')}>
        <div className={cx('wrapper-filter')}></div>
        <div className={cx('section')}>
          <h2>Manage Study</h2>

          <div className={cx('handler')}>
            <Button
              isPrimary={false}
              onClick={() => {
                navigate('/path_detail/' + selectedItems);
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
            <Checkbox
              isChecked={isSelectedAll}
              label='Tất cả'
              onChecked={() => setSelectAllItems(!isSelectedAll)}
            ></Checkbox>
          </div>

          <table className={cx('table')}>
            <thead>
              <tr>
                <th></th>
                <th>Lộ trình</th>
                <th>Số route</th>
                <th>Chủ đề</th>
                <th>Mức độ</th>
              </tr>
            </thead>
            <tbody>
              {listStudyPaths.map((item, i) => (
                <tr key={i}>
                  <td>
                    {item.id && (
                      <Checkbox
                        value={item.id}
                        isChecked={getCheckedItems(item.id)}
                        onChecked={() => {
                          setSelectPath(item.id);
                        }}
                      ></Checkbox>
                    )}
                  </td>
                  <td>{item.name}</td>
                  <td>??</td>
                  <td>{item.topic}</td>
                  <td>{item.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateStudyForm
        onClose={() => {
          setIsOpenForm(false);
        }}
        isDisplay={isOpenForm}
      />
    </>
  );
};

export default IndexStudy;
