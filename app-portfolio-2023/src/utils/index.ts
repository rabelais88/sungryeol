import dayjs, { ConfigType } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
type _Class = string | null | undefined;
export const joinClass = (...classNames: _Class[]) => {
  return classNames.filter((c) => !!c).join(' ');
};
export const formatDate = (
  date: ConfigType,
  format: string,
  { utc }: { utc?: boolean } = {}
) => {
  const d = utc ? dayjs.utc(date) : dayjs(date);
  return d.format(format);
};
const reUrlTest =
  /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
export const getUrlValid = (url: string) => {
  return reUrlTest.test(url);
};

export const getDiff = (dateA: dayjs.ConfigType, dateB: dayjs.ConfigType) => {
  return dayjs(dateA).diff(dateB);
};

export function splitEveryN(str: string, n: number, arr: string[] = []) {
  if (str.length === 0) {
    return arr;
  }

  arr.push(str.slice(0, n));
  return splitEveryN(str.slice(n), n, arr);
}

export const searchParamsToObj = <T = any>(searchParams: any) => {
  const prevQuery = Array.from(searchParams).reduce(
    // @ts-ignore
    (ac, cv) => ({ ...ac, [cv[0]]: cv[1] }),
    {} as Record<string, string>
  );
  return prevQuery as T;
};

export const makeUrl = (url: string, query: any) => {
  return [url, new URLSearchParams(query)].join('?');
};
