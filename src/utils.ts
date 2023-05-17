import { timeStamp } from 'console';

export const getDate = (timestamp: number): Date => {
  return new Date(timestamp * 1000);
};

export const getDateString = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleString();
};
