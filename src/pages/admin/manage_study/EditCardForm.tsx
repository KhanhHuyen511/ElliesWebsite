import { Input } from "../../../components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { removeStudyCard } from "../../../redux/slice/adminSlice";
import { StudyCard } from "../../../types";
import Popup from "../../../components/popup/Popup";

interface Props {
  classNames?: string;
  onClose: () => void;
  pathID: string;
  routeID: string;
  data: StudyCard;
  isDisplay: boolean;
}

const EditCardForm = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <Popup
        classNames={""}
        title={`Delete - ${props.data.display}`}
        onClose={props.onClose}
        onSubmit={() => {
          if (props.data.id) {
            dispatch(
              removeStudyCard({
                path_id: props.pathID,
                route_id: props.routeID,
                card_id: props.data.id,
              })
            );
          }
        }}
        isDisplay={props.isDisplay}
      >
        <Input
          type="text"
          value={props.data.display}
          onChange={() => {}}
          label={"Display"}
          placeholder={"fill display"}
          isDisabled
        ></Input>
        <Input
          type="text"
          value={props.data.meaning}
          onChange={() => {}}
          label={"Meaning"}
          placeholder={"fill meaning"}
          isDisabled
        ></Input>
      </Popup>
    </>
  );
};

export default EditCardForm;
