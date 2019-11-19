import React from 'react';
import {View} from 'react-native';
import Swiper from 'react-native-swiper';
import {map} from 'lodash';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import CommercialWidget from './commercial/CommercialWidget';

const FixedCommercialSliderWidget = ({sliders}) => {
  return (
    <View
      style={{
        justifyContent: 'flex-start',
        height: !validate.isEmpty(sliders) ? 125 : 0,
        position: 'absolute',
        bottom: 0,
      }}>
      {!validate.isEmpty(sliders) ? (
        <Swiper
          showsButtons={false}
          showsPagination={false}
          autoplay={true}
          removeClippedSubviews={false}>
          {map(sliders, (s, i) => (
            <CommercialWidget element={s} key={i} />
          ))}
        </Swiper>
      ) : null}
    </View>
  );
};

export default FixedCommercialSliderWidget;

FixedCommercialSliderWidget.propTypes = {
  sliders: PropTypes.array,
};
