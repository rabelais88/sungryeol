import dayjs from 'dayjs';
type dateArg = Date;
export const formatJobDate = (date: dateArg) => {
  return dayjs(date).format('YYYY-MM');
};
export const formatShortNum = (num: number) => {
  const k = (num / 1000).toFixed(2);
  return `${k} k`;
};
export const formatDate = (date: dateArg) => {
  return dayjs(date).format('YYYY-MM-DD');
};
export const delimit = (num: number) => {
  return num.toLocaleString('ko-kr');
};
