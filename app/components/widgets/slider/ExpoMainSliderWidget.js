import React, {Fragment} from 'react';
import {View} from 'react-native';
import Swiper from 'react-native-swiper';
import {map, isEmpty} from 'lodash';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import ExpoSlideWidget from './ExpoSlideWidget';
import {useSelector} from 'react-redux';
import {EXPO} from './../../../../app';

const ExpoMainSliderWidget = ({elements}) => {
  const {colors} = useSelector((state) => state.settings);
  return (
    <Fragment>
      {!isEmpty(elements) && (
        <View
          style={{
            height: !validate.isEmpty(elements) ? 200 : 0,
            margin: 10,
            flex: 1,
            backgroundColor: 'transparent',
          }}>
          {!validate.isEmpty(elements) && (
            <Swiper
              containerStyle={{
                borderRadius: 10,
                backgroundColor: 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              // cardStyle={{ backgroundColor : 'pink'}}
              activeDotColor={colors.btn_bg_theme_color}
              showsButtons={false}
              showsPagination={true}
              autoplay={!EXPO}
              dotStyle={{width: 10, height: 10, borderRadius: 10 / 2}}
              activeDotStyle={{width: 10, height: 10, borderRadius: 10 / 2}}
              key={elements.length}
              removeClippedSubviews={false}>
              {map(elements, (s, i) => (
                <ExpoSlideWidget slide={s} key={i} />
              ))}
            </Swiper>
          )}
        </View>
      )}
    </Fragment>
  );
};

export default ExpoMainSliderWidget;

ExpoMainSliderWidget.propTypes = {
  elements: PropTypes.array.isRequired,
};
