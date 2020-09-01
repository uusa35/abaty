import React from 'react';
import {WebView} from 'react-native-webview';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import BgContainer from '../components/containers/BgContainer';

const PaymentIndexScreen = () => {
  const {cart} = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <BgContainer>
      <WebView
        useWebKit={true}
        source={{uri: navigation.state.params.paymentUrl}}
        style={{marginTop: 20}}
        injectedJavaScript={'(function(){ return "test"}());'}
        onNavigationStateChange={(navEvent) =>
          !isEmpty(cart) ? dispatch({type: 'CLEAR_CART'}) : null
        }
      />
    </BgContainer>
  );
};

export default PaymentIndexScreen;
