import qs from 'qs';
export const toStr = (val: any = '', fallback?: string) => {
  if (val === '') return fallback ?? '';
  return `${val}`;
};

export const mergeObj = <T = any>(targetObj: T, diffObj: Partial<T>) => {
  const _obj = { ...targetObj, ...diffObj };
  return _obj;
};

export const deleteProperty = <T = any>(targetObj: T, property: keyof T) => {
  const _obj = { ...targetObj };
  delete _obj[property];
  return _obj;
};

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

export const mergeClassStr = (...classNames: any[]) => {
  if (classNames.length === 0) return '';
  return classNames.filter((c) => c && c !== '').join(' ');
};

/**
 * @description merge class names into one and make it as a reusable props.
 */
export const mergeClass = (...classNames: any[]) => {
  return { className: mergeClassStr(...classNames) };
};
