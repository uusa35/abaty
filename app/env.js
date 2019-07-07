import {ENV, PORT} from '../app';

if (ENV === 'local') {
  console.log('the env testing>>>>', ENV);
  module.exports = {
    // appUrlIos: `http://192.168.43.102:8000/`,
    // appUrlIos: `http://192.168.1.107:8000/`,
    // appUrlIos: `http://192.168.43.255:8000/`,
    appUrlIos: `http://mallr.test/`,
    // no other configs (leave locahost in emulator empty + serve the 8000 port then add the following)
    appUrlAndroid: 'http://10.0.2.2:8000/',
    port: PORT
  };
} else if (ENV === 'production') {
  module.exports = {
    appUrlIos: 'http://mallr.ideasowners.net/',
    appUrlAndroid: 'http://mallr.ideasowners.net/',
    port: PORT
  };
}
