import { toStr } from './strings';

describe('strings/toStr', () => {
  it('must parse numbers correctly', () => {
    expect(toStr(123)).toEqual('123');
  });
  it('leave string still', () => {
    expect(toStr('aaa')).toEqual('aaa');
  });
  it('forced conversion for objects', () => {
    expect(toStr({}, true)).toEqual('{}');
  });
  it('must use fallback properly', () => {
    expect(toStr(undefined)).toEqual('');
    expect(toStr(undefined, false, 'boink')).toEqual('boink');
    expect(toStr(null, false, 'dirk')).toEqual('dirk');
  });
});
