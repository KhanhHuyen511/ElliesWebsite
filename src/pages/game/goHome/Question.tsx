import { useState } from "react";
import style from "./GoHome.module.scss";
import className from "classnames/bind";
import { GameQuestion } from "../../../types";
import { Button } from "../../../components";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
const cx = className.bind(style);

interface QuestionProps {
  question: GameQuestion;
  onSubmit?: (result: boolean) => void;
  onSelect?: () => void;
}

const Question = ({ question, onSubmit, onSelect }: QuestionProps) => {
  const [selected, setSelected] = useState<number>();

  const handleSubmit = () => {
    if (selected && onSubmit) {
      const result = selected.toString() === question.answer;

      onSubmit(result);
    } else {
      toast.warning("Please select an option!");
    }
  };

  const handleSelect = (index: number) => {
    if (onSelect) onSelect();

    if (index) setSelected((pre) => index);
  };

  return (
    <div className={cx("question-wrapper")}>
      <p className={cx("label")}>Question: {question.question.label}</p>
      <h2 className={cx("ques")}>{question.question.ques}</h2>

      <ul className={cx("option-wrapper")}>
        {question.options.map((option, index) => (
          <li
            key={index}
            className={cx("option", { selected: selected === index + 1 })}
            onClick={() => {
              handleSelect(index + 1);
            }}
          >
            {option}
          </li>
        ))}
      </ul>

      <Button isPrimary onClick={handleSubmit} className={cx("btn-submit")}>
        <ArrowRightIcon width={16} height={16} />
      </Button>
    </div>
  );
};

export default Question;
