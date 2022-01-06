import dayjs from 'dayjs';

// time for fast mock-up
export const shortInternationalTime = (date: Date) => {
  return dayjs(date).format('YYYY.MMM.DD');
};
