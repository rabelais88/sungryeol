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
