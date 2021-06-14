import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {height, width} from './../../constants/sizes';
import {map} from 'lodash';
import Swiper from 'react-native-swiper';
import ImageLoaderContainer from './ImageLoaderContainer';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import BgContainer from '../containers/BgContainer';

const ImageZoomWidget = ({route}) => {
  const {images, index} = route.params;
  const {colors} = useContext(GlobalValuesContext);

  return (
    <BgContainer showImage={false}>
      <Swiper
        showsButtons={false}
        dotColor={colors.btn_bg_theme_color}
        activeDotColor={colors.normal_text_theme_color}
        index={index}
        containerStyle={{backgroundColor: 'black'}}
        removeClippedSubviews={true}>
        {map(images, (c, i) => (
          <ImageLoaderContainer
            key={i}
            img={c.large}
            style={{width: width, height: '100%'}}
            resizeMode="contain"
          />
        ))}
      </Swiper>
    </BgContainer>
  );
};

export default ImageZoomWidget;

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    backgroundColor: 'black',
  },
});
