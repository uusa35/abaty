import React from 'react';
import {WebView} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import BgContainer from '../components/containers/BgContainer';
import {useRoute} from '@react-navigation/native';

const PaymentIndexScreen = () => {
  const {cart} = useSelector(state => state);
  const dispatch = useDispatch();
  const route = useRoute();

  return (
    <BgContainer>
      <WebView
        useWebKit={true}
        source={{uri: route.params.paymentUrl}}
        style={{marginTop: 20}}
        injectedJavaScript={'(function(){ return "test"}());'}
        onNavigationStateChange={navEvent =>
          !isEmpty(cart) ? dispatch({type: 'CLEAR_CART'}) : null
        }
      />
    </BgContainer>
  );
};

export default PaymentIndexScreen;
