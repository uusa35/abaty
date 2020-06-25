import {createSwitchNavigator} from 'react-navigation';
import {DrawerNavigator} from './DrawerNavigator';

const DailyRootNavigator = createSwitchNavigator({
  DrawerStack: {
    screen: DrawerNavigator,
  },
});

export default DailyRootNavigator;
