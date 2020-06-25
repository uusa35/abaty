import {APP_CASE} from '../../app';
import MallrRootNavigator from './mallr/MallrRootNavigator';
import AbatiRootNavigator from './abati/AbatiRootNavigator';
import EscrapRootNavigator from './escrap/EscrapRootNavigator';
import HomeKeyRootNavigator from './homekey/HomeKeyRootNavigator';
import AtSpotRootNavigator from './AtSpot/AtSpotRootNavigator';
import ExpoRootNavigator from './expo/ExpoRootNavigator';
import DailyRootNavigator from './daily/DailyRootNavigator';

const AppNav = () => {
  switch (APP_CASE) {
    case 'abati':
      return AbatiRootNavigator;
    case 'escrap':
      return EscrapRootNavigator;
    case 'mallr':
      return MallrRootNavigator;
    case 'homekey':
      return HomeKeyRootNavigator;
    case 'atspot':
      return AtSpotRootNavigator;
    case 'expo':
      return ExpoRootNavigator;
    case 'daily':
      return DailyRootNavigator;
    default:
      return AbatiRootNavigator;
  }
};

const RootNavigator = AppNav();

export default RootNavigator;
