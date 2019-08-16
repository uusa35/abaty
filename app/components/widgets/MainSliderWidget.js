import React from 'react';
import {View} from 'react-native';
import Swiper from 'react-native-swiper';
import {map, random} from 'lodash';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import SlideWidget from './slide/SlideWidget';

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
          key={slides.length}
          removeClippedSubviews={false}>
          {map(slides, (s, i) => (
            <SlideWidget slide={s} key={i} />
          ))}
        </Swiper>
      ) : null}
    </View>
  );
};

export default React.memo(MainSliderWidget);

MainSliderWidget.propTypes = {
  slides: PropTypes.array.isRequired
};
