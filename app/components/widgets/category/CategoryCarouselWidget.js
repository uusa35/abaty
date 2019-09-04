import {width} from '../../../constants';
import Carousel from 'react-native-snap-carousel';
import React from 'react';
import CategoryWidget from './CategoryWidget';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';

const CategoryCarouselWidget = ({elements}) => {
  return (
    <Carousel
      layout={'tinder'}
      layoutCardOffset={18}
      ref={c => {
        this._carousel = c;
      }}
      data={elements}
      renderItem={c => <CategoryWidget category={c.item} />}
      sliderWidth={width}
      itemWidth={width}
      hasParallaxImages={true}
      inactiveSlideScale={0.94}
      inactiveSlideOpacity={0.7}
      inactiveSlideShift={20}
      loop={true}
      loopClonesPerSide={2}
      autoplay={true}
      autoplayDelay={500}
      autoplayInterval={3000}
    />
  );
};

export default CategoryCarouselWidget;

CategoryCarouselWidget.propTypes = {
  elements: PropTypes.array.isRequired
};

const styles = StyleSheet.create({});
