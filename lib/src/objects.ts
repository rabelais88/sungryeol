export const mergeObj = <T = any>(targetObj: T, diffObj: Partial<T>) => {
  const _obj = { ...targetObj, ...diffObj };
  return _obj;
};

export const deleteProperty = <T = any>(targetObj: T, property: keyof T) => {
  const _obj = { ...targetObj };
  delete _obj[property];
  return _obj;
};
