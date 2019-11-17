import {APP_CASE} from '../../app';
import MallrRootNavigator from './mallr/MallrRootNavigator';
import AbatiRootNavigator from './abati/AbatiRootNavigator';
import EscrapRootNavigator from './escrap/EscrapRootNavigator';
import HomeKeyRootNavigator from './homekey/HomeKeyRootNavigator';

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
    default:
      return AbatiRootNavigator;
  }
};

const RootNavigator = AppNav();

export default RootNavigator;
