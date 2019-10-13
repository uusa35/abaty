import React from 'react';
import {connect} from 'react-redux';
import {
  createAppContainer,
} from 'react-navigation';
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer
} from 'react-navigation-redux-helpers';
// import {AbatiRootNavigator as RootNavigator} from './bottomNavigator/abati/AbatiRootNavigator';
import {MallrRootNavigator as RootNavigator} from './bottomNavigator/mallr/MallrRootNavigator';

const navMiddleware = createReactNavigationReduxMiddleware(state => state.nav);
const AppWithNavigationState = createReduxContainer(RootNavigator);
const mapStateToProps = state => ({
  state: state.nav,
  network: state.network
});

const AppNavigator = connect(mapStateToProps)(
  createAppContainer(AppWithNavigationState)
);

export {RootNavigator, AppNavigator, navMiddleware};
