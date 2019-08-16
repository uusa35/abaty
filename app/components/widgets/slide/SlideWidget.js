import React from 'react';
import {Linking, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {width, images} from '../../../constants';

const SlideWidget = ({slide}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        Linking.openURL(slide.path ? slide.path : slide.url);
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

export default React.memo(SlideWidget);
