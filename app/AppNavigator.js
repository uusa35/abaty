import React from 'react';
import {connect} from 'react-redux';
import {
  createDrawerNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer
} from 'react-navigation-redux-helpers';
import I18n, {isRTL} from './I18n';
import SideMenu from './components/SideMenu';
import {AbatiBottomTabsStack} from './bottomNavigator/abati/AbatiBottomNavigator';
import {AbatiHomeStack} from './bottomNavigator/abati/AbatiHomeStack';
import {MallrHomeStack} from './bottomNavigator/mallr/MallrHomeStack';
import {AbatiLoginStack} from './bottomNavigator/abati/AbatiLoginStack';
// import {BottomTabsStack} from './bottomNavigator/mallr/BottomNavigator';

const navMiddleware = createReactNavigationReduxMiddleware(state => state.nav);

const AbatiRootNavigator = createSwitchNavigator({
  HomeStack: {
    screen: AbatiHomeStack
  },
  Login: {
    screen: AbatiLoginStack
  },
  DrawerStack: {
    screen: AbatiBottomTabsStack
  }
});

// const MallrRootNavigator = createSwitchNavigator({
//   HomeStack: {
//     screen: MallrHomeStack
//   },
//   Login: {
//     screen: LoginStack
//   },
//   DrawerStack: {
//     screen: DrawerNavigator
//   }
// });

const AppWithNavigationState = createReduxContainer(AbatiRootNavigator);

const mapStateToProps = state => ({
  state: state.nav,
  network: state.network
});

const AppNavigator = connect(mapStateToProps)(
  createAppContainer(AppWithNavigationState)
);

export {AbatiRootNavigator, AppNavigator, navMiddleware};
