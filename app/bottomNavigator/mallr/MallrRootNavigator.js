import {createSwitchNavigator} from 'react-navigation';
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
