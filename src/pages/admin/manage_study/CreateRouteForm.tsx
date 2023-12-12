import { useDispatch } from "react-redux";
import { setStudyRoute } from "../../../redux/slice/adminSlice";
import { AppDispatch } from "../../../redux/store";
import Popup from "../../../components/popup/Popup";
import { Input } from "../../../components";
import { useForm } from "react-hook-form";

interface Props {
  classNames?: string;
  onClose: () => void;
  pathID: string;
  isDisplay: boolean;
}

const CreateRouteForm = (props: Props) => {
  const { register, handleSubmit, reset, watch, getValues } = useForm({
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async () => {
    console.log(watch("name"));
    await dispatch(
      setStudyRoute({
        path_id: props.pathID,
        route: {
          name: getValues("name"),
          imageFile:
            getValues("image") &&
            (getValues("image") as unknown as FileList).length > 0
              ? (getValues("image") as unknown as FileList)[0]
              : null,
        },
      })
    );

    reset();
  };

  return (
    <>
      <Popup
        classNames={""}
        onSubmit={handleSubmit(onSubmit)}
        onClose={props.onClose}
        title="Create new route"
        isDisplay={props.isDisplay}
      >
        <Input
          label="Name"
          type="text"
          placeholder="abc"
          register={register("name")}
        />

        <Input
          type="file"
          label={"Image"}
          placeholder={""}
          register={register("image")}
        ></Input>
        {(watch("image") as unknown as FileList).length > 0 && (
          <div>
            <img
              src={URL.createObjectURL(
                (getValues("image") as unknown as FileList)[0]
              )}
              alt=""
            />
          </div>
        )}
      </Popup>
    </>
  );
};

export default CreateRouteForm;
