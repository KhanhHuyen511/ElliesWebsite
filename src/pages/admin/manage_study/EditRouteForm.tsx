import { useEffect, useState } from 'react';
import { Input } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { updateStudyRoute } from '../../../redux/slice/adminSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { StudyRoute } from '../../../types';
import Popup from '../../../components/popup/Popup';

interface Props {
  classNames?: string;
  onClose: () => void;
  pathID: string;
  id: string;
  isDisplay: boolean;
}

const EditRouteForm = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const currentRoute: StudyRoute = useSelector(
    (state: RootState) => state.admin.currentStudyRoute
  );

  console.log(currentRoute);

  useEffect(() => {
    setName(currentRoute.name);
  }, [dispatch, currentRoute.name]);

  const [name, setName] = useState<string>();

  return (
    <>
      <Popup
        onSubmit={() =>
          dispatch(
            updateStudyRoute({
              path_id: props.pathID,
              route: { id: props.id, name: name },
            })
          )
        }
        onClose={props.onClose}
        title={'Chỉnh sửa chặng'}
        classNames=''
        isDisplay={props.isDisplay}
      >
        <Input
          label='Name'
          type='text'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder='abc'
        />
      </Popup>
    </>
  );
};

export default EditRouteForm;
