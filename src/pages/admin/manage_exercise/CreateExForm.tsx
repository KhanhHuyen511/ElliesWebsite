import { Input, Popup } from "../../../components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { setExercise } from "../../../redux/slice/adminSlice";
import { LevelType } from "../../../types";
import { useForm } from "react-hook-form";

interface Props {
  classNames?: string;
  onClose: () => void;
  onReload?: () => void;
  isDisplay: boolean;
}

const CreateExForm = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, reset, getValues, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      level: LevelType.Beginner,
    },
  });

  const onSubmit = async () => {
    await dispatch(
      setExercise({
        data: {
          id: "",
          title: getValues("title"),
          description: getValues("description"),
          level: getValues("level"),
        },
      })
    );

    reset();
  };

  return (
    <>
      <Popup
        title={"Create new exercise"}
        onClose={props.onClose}
        onSubmit={handleSubmit(onSubmit)}
        isDisplay={props.isDisplay}
      >
        <Input
          type="text"
          label="Topic"
          placeholder={"fill topic"}
          register={register("title")}
        ></Input>
        <Input
          type="text"
          label="Description"
          placeholder={"fill description"}
          register={register("description")}
        />
        <select
          defaultValue={getValues("level")}
          onChange={(e) => {
            setValue("level", e.target.value as unknown as LevelType);
          }}
        >
          <option value={LevelType.Beginner}>{LevelType[0]}</option>
          <option value={LevelType.Intermediate}>{LevelType[1]}</option>
          <option value={LevelType.Advanced}>{LevelType[2]}</option>
        </select>
      </Popup>
    </>
  );
};

export default CreateExForm;
