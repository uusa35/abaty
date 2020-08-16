import React from 'react';
import {Linking, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {width, touchOpacity} from '../../../constants/sizes';
import {images} from '../../../constants/images';
import {isNull} from 'lodash';
import ImageLoaderContainer from '../ImageLoaderContainer';

const SlideWidget = ({slide}) => {
  return (
    <TouchableOpacity
      activeOpacity={touchOpacity}
      onPress={() => {
        Linking.openURL(!isNull(slide.path) ? slide.path : slide.url);
      }}
      key={slide.id}>
      <ImageLoaderContainer
        img={slide.large}
        style={{width: width, height: '100%'}}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default SlideWidget;
