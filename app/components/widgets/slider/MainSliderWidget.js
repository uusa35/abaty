import React, {Fragment} from 'react';
import {View} from 'react-native';
import Swiper from 'react-native-swiper';
import {map} from 'lodash';
import validate from 'validate.js';
import SlideWidget from './SlideWidget';
import {useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import PropTypes from 'prop-types';

const MainSliderWidget = ({elements}) => {
  const {colors} = useSelector((state) => state.settings);

  return (
    <Fragment>
      {!isEmpty(elements) && (
        <View
          style={{
            height: !validate.isEmpty(elements) ? 200 : 0,
            flex: 1,
          }}>
          {!validate.isEmpty(elements) ? (
            <Swiper
              showsButtons={false}
              showsPagination={true}
              autoplay={true}
              key={elements.length}
              activeDotColor={colors.btn_bg_theme_color}
              dotStyle={{width: 10, height: 10, borderRadius: 10 / 2}}
              activeDotStyle={{width: 10, height: 10, borderRadius: 10 / 2}}
              removeClippedSubviews={false}>
              {map(elements, (s, i) => (
                <SlideWidget slide={s} key={i} />
              ))}
            </Swiper>
          ) : null}
        </View>
      )}
    </Fragment>
  );
};

export default MainSliderWidget;

MainSliderWidget.propTypes = {
  elements: PropTypes.array.isRequired,
};
