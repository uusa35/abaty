import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import {height, images, width} from './../../constants';
import {map} from 'lodash';
import Swiper from 'react-native-swiper';

const ImageZoomWidget = props => {
  const {images, index} = props.navigation.state.params;
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
              source={{
                uri: c.large,
                priority: FastImage.priority.normal
              }}
              loadingIndicatorSource={images.logo}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </View>
        );
      })}
    </Swiper>
  );
};

export default React.memo(ImageZoomWidget);

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    backgroundColor: 'black'
  }
});
