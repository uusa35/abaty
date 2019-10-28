import {MALLR, ABATI, ENV, PORT} from '../app';

export const isLocal = ENV === 'local';
__DEV__ ? console.log('___DEV___', __DEV__) : null;
if (ENV === 'local' && __DEV__) {
  console.log('the env testing>>>>', ENV);
  module.exports = {
    // appUrlIos: `http://192.168.43.102:8000/`,
    // appUrlIos: `http://192.168.1.107:8000/`,
    // appUrlIos: `http://192.168.43.255:8000/`,
    appUrlIos: `http://mallr.test/`,
    // no other configs (leave locahost in emulator empty + serve the 8000 port then add the following)
    appUrlAndroid: 'http://10.0.2.2:8000/',
    port: PORT,
  };
} else if (ENV === 'production') {
  module.exports = {
    appUrlIos: ABATI
      ? 'http://abati.ideasowners.net/'
      : MALLR
      ? 'http://mallr.net/'
      : 'http://hkey.ideasowners.net/',
    // appUrlIos: 'http://abati.ideasowners.net/',
    appUrlAndroid: ABATI
      ? 'http://abati.ideasowners.net/'
      : MALLR
      ? 'http://mallr.net/'
      : 'http://hkey.ideasowners.net/',
    port: PORT,
  };
}
