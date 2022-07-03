import { toNum } from './numbers';

describe('numbers/toNum', () => {
  it('must parse numbers correctly', () => {
    expect(toNum('0')).toEqual(0);
    expect(toNum('99')).toEqual(99);
    expect(toNum(123)).toEqual(123);
  });
  it('fallbacks for NaN values', () => {
    expect(toNum('aaaa')).toEqual(0);
    expect(toNum(undefined)).toEqual(0);
    expect(toNum('wrongnumber', 2)).toEqual(2);
    expect(toNum('123,540', 3)).toEqual(3);
  });
});
