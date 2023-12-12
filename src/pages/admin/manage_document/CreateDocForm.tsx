import { StudyCardType } from "../../../types";
import { Input, Popup } from "../../../components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { setDocument } from "../../../redux/slice/adminSlice";
import { useForm } from "react-hook-form";

interface Props {
  classNames?: string;
  onClose: () => void;
  isDisplay: boolean;
  type: StudyCardType;
}

const CreateDocForm = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async () => {
    await dispatch(
      setDocument({
        data: {
          id: "",
          title: getValues("title"),
          description: getValues("description"),
        },
      })
    );

    reset();
  };

  return (
    <>
      <Popup
        title={"Create new topic"}
        classNames={""}
        onClose={props.onClose}
        onSubmit={handleSubmit(onSubmit)}
        isDisplay={props.isDisplay}
      >
        <Input
          type="text"
          label={"Topic"}
          placeholder={"fill title"}
          register={register("title")}
        ></Input>
        <Input
          type="text"
          label={"Description"}
          placeholder={"fill description"}
          register={register("description")}
        ></Input>
      </Popup>
    </>
  );
};

export default CreateDocForm;
