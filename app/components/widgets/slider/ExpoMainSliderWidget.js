import React, {useContext} from 'react';
import {View} from 'react-native';
import Swiper from 'react-native-swiper';
import {map} from 'lodash';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import ExpoSlideWidget from './ExpoSlideWidget';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const ExpoMainSliderWidget = ({slides}) => {
  const {colors} = useContext(GlobalValuesContext);
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
          activeDotColor={colors.btn_bg_theme_color}
          showsButtons={false}
          showsPagination={true}
          autoplay={true}
          dotStyle={{width: 10, height: 10, borderRadius: 10 / 2}}
          activeDotStyle={{width: 10, height: 10, borderRadius: 10 / 2}}
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
