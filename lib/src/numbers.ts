export const toNum = (val: any, _default: number = 0) => {
  const n = Number(val);
  if (Number.isNaN(n)) return _default;
  return n;
};
