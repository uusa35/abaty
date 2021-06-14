import React, {useState} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import BgContainer from '../components/containers/BgContainer';
import {appUrlIos} from '../env';
import {images} from '../constants/images';
import {height} from '../constants';
import FastImage from 'react-native-fast-image';
const PanoramaShowScreen = () => {
  const [loading, setLoading] = useState(true);

  return (
    <BgContainer>
      {loading && (
        <View
          style={{
            width: '100%',
            height,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FastImage
            source={images.loading}
            style={{width: 150, height: 150}}
          />
        </View>
      )}
      <WebView
        javaScriptEnabled={true}
        onLoadEnd={() => setLoading(false)}
        source={{uri: `${appUrlIos}panorama/view`}}
        // style={{marginTop: 20}}
        // injectedJavaScript={'(function(){ return "test"}());'}
        // onNavigationStateChange={(navEvent) =>
        //   !isEmpty(cart) ? dispatch({type: 'CLEAR_CART'}) : null
        // }
      />
    </BgContainer>
  );
};

export default PanoramaShowScreen;
