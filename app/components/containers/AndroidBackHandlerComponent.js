import React, {Fragment, useCallback, useEffect} from 'react';
import {BackHandler} from 'react-native';
import {goBackBtn} from '../../redux/actions';
import {isIOS} from '../../constants';
import {useDispatch} from 'react-redux';

const AndroidBackHandlerComponent = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    !isIOS
      ? BackHandler.addEventListener('hardwareBackPress', handleBackPress)
      : null;
  }, []);

  const handleBackPress = () => {
    return dispatch(goBackBtn(navigation.dangerouslyGetParent().state.index));
  };
  return <Fragment></Fragment>;
};
export default AndroidBackHandlerComponent;
