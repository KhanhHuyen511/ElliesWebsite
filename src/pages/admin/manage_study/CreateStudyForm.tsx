import { Input } from "../../../components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { setStudyPath } from "../../../redux/slice/adminSlice";
import Popup from "../../../components/popup/Popup";
import { useForm } from "react-hook-form";

interface Props {
  classNames?: string;
  onClose: () => void;
  isDisplay: boolean;
}

const CreateStudyForm = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      name: "",
      level: "",
      topic: "",
    },
  });

  const onSubmit = async () => {
    await dispatch(
      setStudyPath({
        name: getValues("name"),
        topic: getValues("topic"),
        level: getValues("level"),
      })
    );
    reset();
  };

  return (
    <>
      <Popup
        classNames={""}
        title={"Create new study path"}
        onClose={props.onClose}
        onSubmit={handleSubmit(onSubmit)}
        isDisplay={props.isDisplay}
      >
        <Input
          label="Name"
          type="text"
          placeholder="fill name"
          register={register("name")}
        />
        <Input
          label="Topic"
          type="text"
          placeholder="fill topic"
          register={register("topic")}
        />
        <Input
          label="Level"
          type="text"
          placeholder="fill level"
          register={register("level")}
        />
      </Popup>
    </>
  );
};

export default CreateStudyForm;
