/**
 * @typedef {import('./src/types').StackExchangeUser} StackExchangeUser
 */
import stackexchange from 'stackexchange';
import dotenv from 'dotenv';
import _prevUserData from './src/constants/stackExchangeUser.json';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * @type {StackExchangeUser}
 * */
const prevUserData = _prevUserData;

dotenv.config();

const log = (...args) => {
  console.log(...args);
};

class StackExchange {
  SE = new stackexchange({ version: '2.3' });
  key = process.env.STACKEXCHANGE_KEY;
  constructor() {}
  /**
   * @return{Promise<StackExchangeUser>}
   */
  getMyData() {
    return new Promise((resolve, reject) => {
      this.SE.users.users({ key: this.key }, ['9292770'], (err, results) => {
        if (err) reject(err);
        /**
         * @type{import(StackExchangeUser}
         */
        const userData = results?.items?.[0];
        return resolve(userData);
      });
    });
  }
}

// prebuild script
const prebuild = async () => {
  log(stackexchange);
  log('running prebuild script');
  const now = new Date().getTime() / 1000;
  // UTC is based on seconds. diff of 60 sec * 60 min = 1 hour
  const UTC1Hour = 60 * 60;
  const prevRequestTime = prevUserData.last_request_date ?? -UTC1Hour * 1.1;
  let diff = now - prevRequestTime;
  const lessThan1Hour = diff < UTC1Hour;
  if (lessThan1Hour) {
    log('last scrape:', new Date(prevRequestTime * 1000).toLocaleString());
    log('stack exchange data scraped less than 1 hour ago. skipping...');
    return;
  }
  const SE = new StackExchange();
  const me = await SE.getMyData();
  me.last_request_date = now;
  const filePath = path.resolve(
    __dirname,
    'src',
    'constants',
    'stackExchangeUser.json'
  );
  await fs.writeFile(filePath, JSON.stringify(me), { encoding: 'utf8' });
  log(`stack exchange data updated: latest reputation is ${me.reputation}`);
};
export default prebuild;
