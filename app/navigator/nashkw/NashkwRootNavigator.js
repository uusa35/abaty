import {createSwitchNavigator} from 'react-navigation';
import {DrawerNavigator} from './DrawerNavigator';

const NashkwRootNavigator = createSwitchNavigator({
  DrawerStack: {
    screen: DrawerNavigator,
  },
});

export default NashkwRootNavigator;
