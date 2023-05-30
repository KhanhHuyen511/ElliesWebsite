import { timeStamp } from 'console';

export const getDate = (timestamp: number): Date => {
  return new Date(timestamp * 1000);
};

export const getDateString = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleString();
};

export const formatDate = (date: Date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};
