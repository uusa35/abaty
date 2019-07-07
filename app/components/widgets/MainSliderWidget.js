import React from 'react';
import {View, TouchableOpacity, Linking, ActivityIndicator} from 'react-native';
import Swiper from 'react-native-swiper';
import {width, text, images} from './../../constants';
import {map, random} from 'lodash';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import validate from 'validate.js';

const MainSliderWidget = ({slides}) => {
  return (
    <View
      style={{
        height: !validate.isEmpty(slides) ? 200 : 0
      }}>
      {!validate.isEmpty(slides) ? (
        <Swiper
          showsButtons={false}
          showsPagination={true}
          autoplay={true}
          key={random(9999)}
          removeClippedSubviews={false}>
          {map(slides, (s, i) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(s.path ? s.path : s.url);
                }}
                key={i}>
                <FastImage
                  loadingIndicatorSource={images.logo}
                  source={{uri: s.large}}
                  style={{width: width, height: '100%'}}
                  resizeMode="stretch"
                />
              </TouchableOpacity>
            );
          })}
        </Swiper>
      ) : null}
    </View>
  );
};

export default React.memo(MainSliderWidget);

MainSliderWidget.propTypes = {
  slides: PropTypes.array
};
