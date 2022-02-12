export const px = (value: string | number) => {
  return `${value}px`;
};
export const translate = (x: number, y?: number) => {
  let strTranslate = x.toString();
  if (typeof y === 'number') {
    strTranslate = `${strTranslate},${y.toString()}`;
  }
  return `translate(${strTranslate})`;
};

export const scale = (k: number) => {
  return `scale(${k})`;
};

export const translateScale = (x: number, y: number, k: number) => {
  return [translate(x, y), scale(k)].join(' ');
};

export const trans = (x: number, y: number) => {
  return ['transform', translate(x, y)];
};
