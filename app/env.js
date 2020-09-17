import {
  APP_CASE,
  ENV,
  AT_SPOT_PUSHER_KEY,
  pusherEnabled,
  EXPO_PUSHER_KEY,
} from '../app';
import Pusher from 'pusher-js/react-native';
const isLocal = __DEV__;
const appUrl = () => {
  switch (APP_CASE) {
    case 'abati':
      return 'http://abatiapp.com/';
    case 'mallr':
      return 'http://mallr.net/';
    case 'homekey':
      return 'http://homekey.site/';
    case 'escrap':
      return 'http://escrapco.com/';
    case 'atspot':
      return 'http://atspot.ideasowners.net/';
    case 'expo':
      return 'http://myexpo.live/';
    case 'daily':
      return 'http://dailydresskw.com/';
    case 'nashkw':
      return 'http://nashkw.com/';
    case 'bits':
      return 'http://bits.ideasowners.net/';
    default:
      return 'http://mallr.test/';
  }
};
const appUrlIos = isLocal && ENV === 'local' ? 'http://mallr.test/' : appUrl();
const appUrlAndroid =
  isLocal && ENV === 'local' ? 'http://mallr.test/' : appUrl();
const pusherInstance = () => {
  switch (APP_CASE) {
    case 'atspot':
      return AT_SPOT_PUSHER_KEY;
    case 'expo':
      return EXPO_PUSHER_KEY;
    default:
      return pusherEnabled ? AT_SPOT_PUSHER_KEY : '';
  }
};
const pusher = new Pusher(pusherInstance(), {
  cluster: 'ap2',
  forceTLS: true,
});
if (__DEV__) {
  // console.log('isLocal', isLocal);
  // console.log('the Link Now', appUrlIos);
  // console.log('the isLocal now', isLocal);
  Pusher.logToConsole = pusherEnabled;
}
const channel = pusher.subscribe('my-channel');
export {appUrlIos, appUrlAndroid, isLocal, channel};
