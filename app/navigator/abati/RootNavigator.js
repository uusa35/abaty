import {createSwitchNavigator} from 'react-navigation';
import {AbatiHomeStack} from './AbatiHomeStack';
import {AbatiLoginStack} from './AbatiLoginStack';
import {AbatiDrawerNavigator} from './AbatiDrawerNavigator';

export const RootNavigator = createSwitchNavigator({
  HomeStack: {
    screen: AbatiHomeStack
  },
  Login: {
    screen: AbatiLoginStack
  },
  DrawerStack: {
    screen: AbatiDrawerNavigator
  }
});
