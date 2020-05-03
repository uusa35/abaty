import React, {useContext} from 'react';
import {View} from 'react-native';
import Swiper from 'react-native-swiper';
import {map} from 'lodash';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import SlideWidget from './SlideWidget';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const MainSliderWidget = ({slides}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View
      style={{
        height: !validate.isEmpty(slides) ? 200 : 0,
      }}>
      {!validate.isEmpty(slides) ? (
        <Swiper
          showsButtons={false}
          showsPagination={true}
          autoplay={true}
          key={slides.length}
          activeDotColor={colors.btn_bg_theme_color}
          dotStyle={{width: 10, height: 10, borderRadius: 10 / 2}}
          activeDotStyle={{width: 10, height: 10, borderRadius: 10 / 2}}
          removeClippedSubviews={false}>
          {map(slides, (s, i) => (
            <SlideWidget slide={s} key={i} />
          ))}
        </Swiper>
      ) : null}
    </View>
  );
};

export default MainSliderWidget;

MainSliderWidget.propTypes = {
  slides: PropTypes.array.isRequired,
};
