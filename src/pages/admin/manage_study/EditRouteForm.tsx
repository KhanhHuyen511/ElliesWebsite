import { Input } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { updateStudyRoute } from "../../../redux/slice/adminSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { StudyRoute } from "../../../types";
import Popup from "../../../components/popup/Popup";
import { useForm } from "react-hook-form";

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

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      name: currentRoute.name,
    },
  });

  const onSubmit = () => {
    dispatch(
      updateStudyRoute({
        path_id: props.pathID,
        route: { id: props.id, name: getValues("name") },
      })
    );
  };

  return (
    <>
      <Popup
        onSubmit={handleSubmit(onSubmit)}
        onClose={props.onClose}
        title={`Edit route ${currentRoute.name}`}
        classNames=""
        isDisplay={props.isDisplay}
      >
        <Input
          label="Name"
          type="text"
          placeholder="fill name"
          register={register("name")}
        />
      </Popup>
    </>
  );
};

export default EditRouteForm;
