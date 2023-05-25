import React from 'react';
import classNames from 'classnames/bind';
import style from './TextArea.module.scss';
const cx = classNames.bind(style);

interface Props {
  label: string;
  placeholder: string;
  smallText?: string;
  isDisabled?: boolean;
  haveIcon?: boolean;
  icon?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void | undefined;
  classNames?: string;
}

const TextArea = (props: Props) => {
  const inputProps = {
    placeholder: props.placeholder ? props.placeholder : '...',
  };

  return (
    <div className={cx('input-wrapper')}>
      <p className={cx('label')}>{props.label}</p>
      <textarea
        placeholder={inputProps.placeholder}
        className={cx('input', props.classNames)}
        onChange={props.onChange}
        value={props.value}
      />
      {props.smallText && <p className={cx('small-text')}>{props.smallText}</p>}
    </div>
  );
};

export default TextArea;
