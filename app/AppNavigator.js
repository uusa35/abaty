import React from 'react';
import {connect} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer,
} from 'react-navigation-redux-helpers';
import RootNavigator from './navigator/RootNavigator';

const navMiddleware = createReactNavigationReduxMiddleware(
  (state) => state.nav,
);

const AppWithNavigationState = createReduxContainer(RootNavigator);
const mapStateToProps = (state) => ({
  state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(
  createAppContainer(AppWithNavigationState),
);

export {RootNavigator, AppNavigator, navMiddleware};
