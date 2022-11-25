import { toStr } from './strings';

describe('strings/toStr', () => {
  it('must parse numbers correctly', () => {
    expect(toStr(123)).toEqual('123');
  });
  it('leave string still', () => {
    expect(toStr('aaa')).toEqual('aaa');
  });
  it('forced conversion for objects', () => {
    expect(toStr({})).toEqual('{}');
  });
  it('must use fallback properly', () => {
    expect(toStr(undefined)).toEqual('');
    expect(toStr(undefined, 'boink')).toEqual('boink');
    expect(toStr(null, 'dirk')).toEqual('dirk');
  });
});
