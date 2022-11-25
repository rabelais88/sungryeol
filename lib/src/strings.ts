export const toStr = (val: any, fallback?: string) => {
  if (val === undefined || val === null) return fallback ?? '';
  if (typeof val === 'object') return JSON.stringify(val);
  return `${val}`;
};
