import React from 'react';
import {View} from 'react-native';
import Swiper from 'react-native-swiper';
import {map} from 'lodash';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import ExpoSlideWidget from './ExpoSlideWidget';

const ExpoMainSliderWidget = ({slides}) => {
  return (
    <View
      style={{
        height: !validate.isEmpty(slides) ? 200 : 0,
        margin: 10,
        flex: 1,
        backgroundColor: 'transparent',
      }}>
      {!validate.isEmpty(slides) ? (
        <Swiper
          containerStyle={{
            borderRadius: 20,
            backgroundColor: 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          // cardStyle={{ backgroundColor : 'pink'}}
          showsButtons={false}
          showsPagination={true}
          autoplay={true}
          key={slides.length}
          removeClippedSubviews={false}>
          {map(slides, (s, i) => (
            <ExpoSlideWidget slide={s} key={i} />
          ))}
        </Swiper>
      ) : null}
    </View>
  );
};

export default ExpoMainSliderWidget;

ExpoMainSliderWidget.propTypes = {
  slides: PropTypes.array.isRequired,
};
