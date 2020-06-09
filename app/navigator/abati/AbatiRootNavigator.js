import {createSwitchNavigator} from 'react-navigation';
import {HomeStack} from './HomeStack';
import {LoginStack} from './LoginStack';
import {DrawerNavigator} from './DrawerNavigator';

const AbatiRootNavigator = createSwitchNavigator({
  DrawerStack: {
    screen: DrawerNavigator,
  },
});

export default AbatiRootNavigator;
