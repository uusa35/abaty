import {createSwitchNavigator} from 'react-navigation';
import {AbatiHomeStack} from './AbatiHomeStack';
import {AbatiLoginStack} from './AbatiLoginStack';
import {AbatiDrawerNavigator} from './AbatiDrawerNavigator';
import {MallrDrawerNavigator} from './MallrDrawerNavigator';
import {MallrHomeStack} from './MallrHomeStack';
import {MallrLoginStack} from './MallrLoginStack';

export const MallrRootNavigator = createSwitchNavigator({
  HomeStack: {
    screen: MallrHomeStack
  },
  Login: {
    screen: MallrLoginStack
  },
  DrawerStack: {
    screen: MallrDrawerNavigator
  }
});
