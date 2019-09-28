import React from 'react';
import {connect} from 'react-redux';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer
} from 'react-navigation-redux-helpers';
import I18n, {isRTL} from './I18n';
import SideMenu from './components/SideMenu';
import {BottomTabsStack} from './bottomNavigator/mallr/BottomNavigator';

const navMiddleware = createReactNavigationReduxMiddleware(state => state.nav);
// navigationOptions: ({navigation}) => ({
//     headerLeft: <HeaderLeft {...navigation} />,
//     headerRight: <HeaderRight {...navigation} display={true}/>,
//     // headerTitle: <HeaderMiddle title={I18n.t('home')}/>,
//     headerBackTitle: null
// }),
//     path: 'home'

const RootNavigator = createDrawerNavigator(
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
      // activeTintColor: '#e91e63',
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

const AppWithNavigationState = createReduxContainer(RootNavigator);

const mapStateToProps = state => ({
  state: state.nav,
  network: state.network
});

const AppNavigator = connect(mapStateToProps)(
  createAppContainer(AppWithNavigationState)
);

export {RootNavigator, AppNavigator, navMiddleware};
