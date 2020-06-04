import React, {useContext} from 'react';
import {WebView} from 'react-native-webview';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch} from 'react-redux';

const PaymentIndexScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <WebView
      useWebKit={true}
      source={{uri: navigation.state.params.paymentUrl}}
      style={{marginTop: 20}}
      injectedJavaScript={'(function(){ return "test"}());'}
      onNavigationStateChange={(navEvent) => dispatch({type: 'CLEAR_CART'})}
    />
  );
};

export default PaymentIndexScreen;
