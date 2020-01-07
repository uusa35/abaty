import {APP_CASE, ENV, AT_SPOT_PUSHER_ID, pusherEnabled} from '../app';
import Pusher from 'pusher-js/react-native';
const isLocal = ENV === 'local' && __DEV__;
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
    case 'AtSpot':
      return 'http://abatiapp.com/';
    default:
      return 'http://mallr.test/';
  }
};
const appUrlIos = isLocal ? 'http://mallr.test' : appUrl();
const appUrlAndroid = isLocal ? 'http://mallr.test' : appUrl();
const pusherInstance = () => {
  switch (APP_CASE) {
    case 'AtSpot':
      return AT_SPOT_PUSHER_ID;
    default:
      return pusherEnabled ? AT_SPOT_PUSHER_ID : '';
  }
};
const pusher = new Pusher(pusherInstance(), {
  cluster: 'mt1',
  forceTLS: true,
});
if (__DEV__) {
  console.log('isLocal', isLocal);
  console.log('the Link Now', appUrlIos);
  console.log('the isLocal now', isLocal);
  Pusher.logToConsole = pusherEnabled;
}
const channel = pusher.subscribe('my-channel');
export {appUrlIos, appUrlAndroid, isLocal, channel};
