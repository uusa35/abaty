import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import {width} from './../../constants';
import {map, random} from 'lodash';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import validate from 'validate.js';

const FixedCommercialSliderWidget = ({sliders}) => {
  return (
    <View
      style={{
        justifyContent: 'flex-start',
        height: !validate.isEmpty(sliders) ? 125 : 0,
        position: 'absolute',
        bottom: 0
      }}>
      {!validate.isEmpty(sliders) ? (
        <Swiper
          showsButtons={false}
          showsPagination={false}
          autoplay={true}
          key={random(9999)}
          removeClippedSubviews={false}>
          {map(sliders, (s, i) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  s.path ? s.path : s.url;
                }}
                key={i}>
                <FastImage
                  source={{uri: s.thumb}}
                  style={{width: width, height: '100%'}}
                />
              </TouchableOpacity>
            );
          })}
        </Swiper>
      ) : null}
    </View>
  );
};

export default FixedCommercialSliderWidget;

FixedCommercialSliderWidget.propTypes = {
  sliders: PropTypes.array
};
