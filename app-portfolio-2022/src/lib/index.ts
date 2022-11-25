import qs from 'qs';

/**
 * @description stringify object as value which URLSearchParams does not support.
 */
export const makeQuery = (obj: any) => {
  // const _obj = {
  //   ...obj,
  //   ...Object.entries(obj).reduce(
  //     (ac, [key, val]) => ({ ...ac, [key]: JSON.stringify(val) }),
  //     {}
  //   ),
  // };
  // return new URLSearchParams(_obj).toString();
  return qs.stringify(obj);
};

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};
