import React, {useCallback, useEffect, useState, useContext} from 'react';
import {AppState, View} from 'react-native';
import {useNavigationState} from 'react-navigation-hooks';
import {DispatchContext} from '../redux/DispatchContext';
import {toggleBootstrapped} from '../redux/actions';

const AppStateComponent = () => {
  const {dispatch} = useContext(DispatchContext);
  const [appState, setAppState] = useState(AppState.currentState);
  const {routeName} = useNavigationState();

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
  }, []);

  const handleAppStateChange = useCallback(
    nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
      }
      setAppState(nextAppState);
    },
    [appState],
  );

  useEffect(() => {
    if (appState === 'background' && routeName !== 'ClassifiedStore') {
      dispatch(toggleBootstrapped(false));
    }
  }, [appState]);

  return <View></View>;
};
export default AppStateComponent;
