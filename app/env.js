import {APP_CASE, ENV} from '../app';
const isLocal = ENV === 'local' && __DEV__;
const appUrl = () => {
  switch (APP_CASE) {
    case 'abati':
      return 'http://abati.ideasowners.net/';
    case 'mallr':
      return 'http://mallr.net/';
    case 'homekey':
      return 'http://hkey.ideasowners.net/';
    case 'escrap':
      return 'http://escrapco.com/';
    default:
      return 'http://mallr.test/';
  }
};
const appUrlIos = isLocal ? 'http://mallr.test' : appUrl();
const appUrlAndroid = isLocal ? 'http://mallr.test' : appUrl();
console.log('the Link Now', appUrlIos);
console.log('the isLocal now', isLocal);
export {appUrlIos, appUrlAndroid, isLocal};
