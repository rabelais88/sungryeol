export const toStr = (val: any, force?: boolean, fallback?: string) => {
  if (val === undefined || val === null) return fallback ?? '';
  if (force) return JSON.stringify(val);
  return `${val}`;
};
