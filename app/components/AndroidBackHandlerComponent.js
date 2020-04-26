import React, {Fragment, useCallback, useEffect, useContext} from 'react';
import {BackHandler} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {goBackBtn, toggleResetApp} from '../redux/actions';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import {isIOS} from '../constants';
import {DispatchContext} from '../redux/DispatchContext';

const AndroidBackHandlerComponent = () => {
  const navigation = useNavigation();
  const {dispatch} = useContext(DispatchContext);
  const {bootStrapped} = useContext(GlobalValuesContext);

  useEffect(() => {
    !isIOS
      ? BackHandler.addEventListener('hardwareBackPress', handleBackPress)
      : null;
  }, [bootStrapped]);

  const handleBackPress = useCallback(() => {
    return dispatch(goBackBtn(navigation.isFocused()));
    return true;
  });
  return <Fragment></Fragment>;
};
export default AndroidBackHandlerComponent;
