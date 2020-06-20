import {createSwitchNavigator} from 'react-navigation';
import {DrawerNavigator} from './DrawerNavigator';

const AbatiRootNavigator = createSwitchNavigator({
  DrawerStack: {
    screen: DrawerNavigator,
  },
});

export default AbatiRootNavigator;
