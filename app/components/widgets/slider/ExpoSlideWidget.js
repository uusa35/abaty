import React, {Fragment} from 'react';
import {Linking, TouchableOpacity, View} from 'react-native';
import {width, touchOpacity} from '../../../constants/sizes';
import {images} from '../../../constants/images';
import {isNull} from 'lodash';
import ImageLoaderContainer from '../ImageLoaderContainer';
import {appUrlIos} from '../../../env';
import {WebView} from 'react-native-webview';

const ExpoSlideWidget = ({slide}) => {
  return (
    <Fragment>
      {slide.url && slide.url.includes('youtube') ? (
        <View style={{height: 300, borderRadius: 20}}>
          <WebView
            useWebKit={true}
            key={slide.id}
            style={{
              height: 200,
              width: '100%',
              borderRadius: 15,
              borderColor: 'lightgrey',
            }}
            javaScriptEnabled={true}
            source={{uri: `${appUrlIos}webview?url=${slide.url}`}}
          />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={touchOpacity}
          onPress={() => {
            Linking.openURL(!isNull(slide.path) ? slide.path : slide.url);
          }}
          style={{backgroundColor: 'transparent'}}
          key={slide.id}>
          <ImageLoaderContainer
            img={slide.large}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 10,
              alignSelf: 'center',
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    </Fragment>
  );
};

export default ExpoSlideWidget;
