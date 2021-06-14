// RootNavigation.js

import * as React from 'react';

export const isReadyRef = React.createRef();
export const navigationRef = React.createRef();
import {StackActions} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';

export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}

export function toggleDrawer() {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}

export function closeDrawer() {
  navigationRef.current?.dispatch(DrawerActions.closeDrawer());
}

export function navigate(name, params) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
    navigationRef.current.navigate('Home');
  }
}

export function back(name?) {
  if (isReadyRef.current && navigationRef.current) {
    if (name) {
      navigationRef.current.navigate(name);
    } else {
      navigationRef.current.goBack();
    }
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
    navigationRef.current.navigate('Home');
  }
}
