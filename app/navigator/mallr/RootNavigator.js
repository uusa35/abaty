import {createSwitchNavigator} from 'react-navigation';
import {DrawerNavigator} from './DrawerNavigator';
import {HomeStack} from './HomeStack';
import {LoginStack} from './LoginStack';

const RootNavigator = createSwitchNavigator({
  HomeStack: {
    screen: HomeStack,
  },
  Login: {
    screen: LoginStack,
  },
  DrawerStack: {
    screen: DrawerNavigator,
  },
});

export default RootNavigator;