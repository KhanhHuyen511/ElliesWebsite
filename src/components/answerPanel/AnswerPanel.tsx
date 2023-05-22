import React from 'react';
import classNames from 'classnames/bind';
import style from './AnswerPanel.module.scss';
const cx = classNames.bind(style);

interface Props {
  isActive?: boolean;
  isTrue?: boolean;
  isFalse?: boolean;
  isDisable?: boolean;
  children?: string;
}

const AnswerPanel = (props: Props) => {
  return (
    <div
      className={cx(
        'wrapper',
        { active: props.isActive },
        { true: props.isTrue },
        { false: props.isFalse },
        { disabled: props.isDisable }
      )}
    >
      {props.children}
    </div>
  );
};

export default AnswerPanel;
