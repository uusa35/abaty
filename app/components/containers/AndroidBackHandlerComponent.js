import React, {Fragment, useCallback, useEffect} from 'react';
import {BackHandler} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';
import {goBackBtn} from '../../redux/actions';
import {isIOS} from '../../constants';
import {useDispatch} from 'react-redux';

const AndroidBackHandlerComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    !isIOS
      ? BackHandler.addEventListener('hardwareBackPress', handleBackPress)
      : null;
  }, []);

  const handleBackPress = useCallback(() => {
    return dispatch(goBackBtn(navigation.dangerouslyGetParent().state.index));
  });
  return <Fragment></Fragment>;
};
export default AndroidBackHandlerComponent;
