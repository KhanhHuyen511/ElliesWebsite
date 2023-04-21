import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Checkbox.module.scss';
const cx = classNames.bind(styles);

interface Props {
  label?: string;
  isChecked?: boolean;
  value?: string;
  onChecked: () => void;
}

const Checkbox = (props: Props) => {
  const [isChecked, setIsChecked] = useState(false);

  const onValueChange = () => {
    setIsChecked(!isChecked);
    props.onChecked();
  };

  return (
    <>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={onValueChange}
      ></input>
    </>
  );
};

export default Checkbox;
