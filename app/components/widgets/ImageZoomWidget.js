import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {height, width} from './../../constants/sizes';
import {images as imgs} from '../../constants/images';
import {map} from 'lodash';
import Swiper from 'react-native-swiper';

const ImageZoomWidget = (props) => {
  const {images, index} = props.navigation.state.params;
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <Swiper
      showsButtons={false}
      dotColor="white"
      index={index}
      removeClippedSubviews={true}>
      {map(images, (c, i) => {
        return (
          <View style={styles.slide} key={c.id}>
            <Image
              key={i}
              source={imageLoading ? imgs.loading : {uri: c.large}}
              onLoadEnd={() => setImageLoading(false)}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
        );
      })}
    </Swiper>
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
