import React from 'react';
import {Linking, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {width, touchOpacity} from '../../../constants/sizes';
import {images} from '../../../constants/images';
import {isNull} from 'lodash';

const ExpoSlideWidget = ({slide}) => {
  return (
    <TouchableOpacity
      activeOpacity={touchOpacity}
      onPress={() => {
        Linking.openURL(!isNull(slide.path) ? slide.path : slide.url);
      }}
      style={{backgroundColor: 'transparent'}}
      key={slide.id}>
      <FastImage
        loadingIndicatorSource={images.logo}
        source={{uri: slide.large}}
        style={{
          width: '99%',
          height: '100%',
          borderRadius: 20,
          alignSelf: 'center',
        }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default ExpoSlideWidget;
