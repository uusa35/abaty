import {createSwitchNavigator} from 'react-navigation';
import {HomeStack} from './HomeStack';
import {LoginStack} from './LoginStack';
import {DrawerNavigator} from './DrawerNavigator';

const HomeKeyRootNavigator = createSwitchNavigator({
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

export default HomeKeyRootNavigator;
