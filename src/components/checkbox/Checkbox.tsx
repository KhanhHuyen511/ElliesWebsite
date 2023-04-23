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
    <div className={cx('wrapper')}>
      <label>{props.label}</label>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={onValueChange}
        className={cx('checkbox')}
      ></input>
    </div>
  );
};

export default Checkbox;
