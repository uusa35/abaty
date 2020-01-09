import React from 'react';
import {Linking, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {width, images, touchOpacity} from '../../../constants';
import {isNull} from 'lodash';

const SlideWidget = ({slide}) => {
  return (
    <TouchableOpacity
      activeOpacity={touchOpacity}
      onPress={() => {
        Linking.openURL(!isNull(slide.path) ? slide.path : slide.url);
      }}
      key={slide.id}>
      <FastImage
        loadingIndicatorSource={images.logo}
        source={{uri: slide.large}}
        style={{width: width, height: '100%'}}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export default SlideWidget;
