import React from 'react';
import classNames from 'classnames/bind';
import style from './CheckinPanel.module.scss';
import { FireIcon } from '@heroicons/react/24/outline';
const cx = classNames.bind(style);

interface Props {
  state?: 'current' | 'before' | 'default' | '';
  isChecked?: boolean;
  label?: string;
}

const CheckinPanel = (props: Props) => {
  return (
    <div className={cx('wrapper', props.state, { checked: props.isChecked })}>
      <FireIcon className={cx('icon')} />
      <p className={cx('label')}>{props.label}</p>
    </div>
  );
};

export default CheckinPanel;
