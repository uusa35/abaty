// import {MALLR, ABATI, ENV, PORT, APP_CASE } from '../app';
//
// export const isLocal = ENV === 'local';
// __DEV__ ? console.log('___DEV___', __DEV__) : null;
// if (ENV === 'local' && __DEV__) {
//   console.log('the env testing>>>>', ENV);
//   const appUrl = () => 'http://mallr.test';
//   // module.exports = {
//     // appUrlIos: `http://192.168.43.102:8000/`,
//     // appUrlIos: `http://192.168.1.107:8000/`,
//     // appUrlIos: `http://192.168.43.255:8000/`,
//     // appUrlIos: `http://mallr.test/`,
//     // no other configs (leave locahost in emulator empty + serve the 8000 port then add the following)
//     // appUrlAndroid: 'http://10.0.2.2:8000/',
//     // port: PORT,
//   // };
//   const appUrlIos = appUrl();
// } else if (ENV === 'production') {
//   const appUrlIos = appUrl();
//   // module.exports = {
//   //   appUrlIos: ABATI
//   //     ? 'http://abati.ideasowners.net/'
//   //     : MALLR
//   //     ? 'http://mallr.net/'
//   //     : 'http://hkey.ideasowners.net/',
//   //   // appUrlIos: 'http://abati.ideasowners.net/',
//   //   appUrlAndroid: ABATI
//   //     ? 'http://abati.ideasowners.net/'
//   //     : MALLR
//   //     ? 'http://mallr.net/'
//   //     : 'http://hkey.ideasowners.net/',
//   //   port: PORT,
//   // };
// }

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
      return 'http://mallr.test';
  }
};
const appUrlIos = isLocal ? 'http://mallr.test' : appUrl();
console.log('the Link Now', appUrlIos);
console.log('the isLocal now', isLocal);
export {appUrlIos, isLocal};
