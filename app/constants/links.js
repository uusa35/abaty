import {appUrlAndroid, appUrlIos} from '../env';
import {isIOS} from '../constants';

export const links = {
  apiUrl: isIOS ? appUrlIos + 'api/' : appUrlAndroid + 'api/',
  storageUrl: isIOS
    ? appUrlIos + 'storage/uploads/images/'
    : appUrlAndroid + 'storage/uploads/images/',
  thumbnailUrl: isIOS
    ? appUrlIos + 'storage/uploads/images/thumbnail/'
    : appUrlAndroid + 'storage/uploads/images/thumbnail/',
  mediumUrl: isIOS
    ? appUrlIos + 'storage/uploads/images/medium/'
    : appUrlAndroid + 'storage/uploads/images/medium/',
  largeUrl: isIOS
    ? appUrlIos + 'storage/uploads/images/large/'
    : appUrlAndroid + 'storage/uploads/images/large/',
  googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=',
  facebook: 'http://facebook.com/',
  twitter: 'http://twitter.com/',
  instagram: 'http//instagram.com/',
  snapchat: 'http://snapchat.com/',
  whatsapp: 'https://api.whatsapp.com/send?text=Asad Group&phone=',
};

export const prefix = `${appUrlIos}element/linking`;
// export const prefix = Linking.makeUrl('/');;
export const linkingPrefix = `${appUrlIos}element/linking?model=`;
