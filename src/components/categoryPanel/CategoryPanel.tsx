import React from 'react';
import classNames from 'classnames/bind';
import style from './CategoryPanel.module.scss';
import { FireIcon } from '@heroicons/react/24/outline';
const cx = classNames.bind(style);

// interface IconTypeProps {
//   width: number;
//   height: number;
//   color: string;
// }

// type IconType = (props: IconTypeProps) => JSX.Element;

interface Props {
  isActive?: boolean;
  label: string;
  classNames?: string;
  icon?: JSX.Element;
  onClick?: () => void;
}

const CategoryPanel = (props: Props) => {
  return (
    <div
      className={cx('wrapper', { active: props.isActive }, props.classNames)}
      onClick={props.onClick}
    >
      <div className={cx('icon')}>{props.icon}</div>
      <p className={cx('label')}>{props.label}</p>
    </div>
  );
};

export default CategoryPanel;
