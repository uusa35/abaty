import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import BgContainer from '../components/containers/BgContainer';
import {appUrlIos} from '../env';
import EmptyListWidget from '../components/Lists/EmptyListWidget';
import {I18n} from './../I18n';
const PanoramaShowScreen = () => {
  const {cart} = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  return (
    <BgContainer>
      {loading && <EmptyListWidget title={I18n.t('loading')} />}
      <WebView
        useWebKit={true}
        onLoadEnd={() => setLoading(false)}
        source={{uri: `${appUrlIos}panorama/view`}}
        // style={{marginTop: 20}}
        injectedJavaScript={'(function(){ return "test"}());'}
        onNavigationStateChange={(navEvent) =>
          !isEmpty(cart) ? dispatch({type: 'CLEAR_CART'}) : null
        }
      />
    </BgContainer>
  );
};

export default PanoramaShowScreen;
