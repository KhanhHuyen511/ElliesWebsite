import { timeStamp } from "console";

export const getDate = (timestamp: number): Date => {
  return new Date(timestamp * 1000);
};

export const getDateString = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleString();
};

export const formatDate = (date: Date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const getDaysStringOfMonth = (date: Date) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dayNumbers = new Date(year, month, 0).getDate();
  let dayOfMonths: string[] = [];

  for (let i = 1; i <= dayNumbers; i++) {
    dayOfMonths.push(i + "/" + month);
  }

  return dayOfMonths;
};

export const getDaily = () => [
  "00:00",
  "03:00",
  "09:00",
  "12:00",
  "15:00",
  "19:00",
  "22:00",
  "24:00",
];

export const getYearly = () => [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
