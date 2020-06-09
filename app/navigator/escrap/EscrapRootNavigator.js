import {createSwitchNavigator} from 'react-navigation';
import {DrawerNavigator} from './DrawerNavigator';

const EscrapRootNavigator = createSwitchNavigator({
  DrawerStack: {
    screen: DrawerNavigator,
  },
});

export default EscrapRootNavigator;
