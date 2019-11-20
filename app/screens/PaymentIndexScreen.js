import React, {useContext, useEffect} from 'react';
import WebView from 'react-native-webview';
import {DispatchContext} from '../redux/DispatchContext';
import {useNavigation} from 'react-navigation-hooks';

const PaymentIndexScreen = () => {
  const {dispatch} = useContext(DispatchContext);
  const navigation = useNavigation();

  return (
    <WebView
      source={{uri: navigation.state.params.paymentUrl}}
      style={{marginTop: 20}}
      injectedJavaScript={'(function(){ return "test"}());'}
      onNavigationStateChange={navEvent => dispatch({type: 'CLEAR_CART'})}
    />
  );
};

export default PaymentIndexScreen;
