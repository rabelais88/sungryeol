import type { StackExchangeUser, StrDate } from '@/types';
import dayjs from 'dayjs';
import SE from './stackExchangeUser.json';

export const email = 'sungryeolp@gmail.com';
export const stackoverflow =
  'https://stackoverflow.com/users/9292770/sungryeol';
export const beginYear = dayjs('2018-07-09');
export const github = 'https://github.com/rabelais88';
export const years = Math.floor(dayjs().diff(beginYear, 'years', true));
export const stackExchangeUser = SE as StackExchangeUser;
export const stackExchangeUesrLastDate =
  (stackExchangeUser?.last_request_date ?? 0) * 1000;

interface JobExperience {
  startDate: StrDate;
  endDate?: StrDate;
  titleKr: string;
  titleEn: string;
  jobTitleKr: string;
  jobTitleEn: string;
  website?: string;
}
export const jobs: Record<string, JobExperience> = {
  bigPicture: {
    startDate: '2018-07-09',
    endDate: '2022-08-19',
    titleKr: '빅픽처 인터랙티브',
    titleEn: 'Bigpicture Interactive',
    jobTitleKr: '프론트엔드',
    jobTitleEn: 'lead frontend',
    website: 'https://www.bigpi.co/',
  },
};

export const portfolioUrl = import.meta.env.APP_HOST;
