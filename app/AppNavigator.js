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
import {BottomTabsStack} from './bottomNavigator/abati/BottomNavigator';
import {AbatiHomeStack} from './bottomNavigator/abati/AbatiHomeStack';
import {LoginStack} from './bottomNavigator/abati/LoginStack';
// import {BottomTabsStack} from './bottomNavigator/mallr/BottomNavigator';

const navMiddleware = createReactNavigationReduxMiddleware(state => state.nav);

const DrawerNavigator = createDrawerNavigator(
  {
    Tabs: {
      screen: BottomTabsStack
    }
  },
  {
    contentComponent: ({navigation}) => <SideMenu navigation={navigation} />,
    drawerPosition: isRTL ? 'right' : 'left',
    drawerBackgroundColor: 'white',
    overlayColor: 'transparent',
    contentOptions: {
      activeTintColor: 'black',
      itemsContainerStyle: {
        marginVertical: 0
      },
      iconContainerStyle: {
        opacity: 1
      }
    }
  }
);

const RootNavigator = createSwitchNavigator({
  HomeStack: {
    screen: AbatiHomeStack
  },
  Login: {
    screen: LoginStack
  },
  DrawerStack: {
    screen: DrawerNavigator
  }
});

const AppWithNavigationState = createReduxContainer(RootNavigator);

const mapStateToProps = state => ({
  state: state.nav,
  network: state.network
});

const AppNavigator = connect(mapStateToProps)(
  createAppContainer(AppWithNavigationState)
);

export {RootNavigator, AppNavigator, navMiddleware};
