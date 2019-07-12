import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import PropTypes from 'prop-types';
import {map} from 'lodash';
import {width, height, text, images} from './../../../constants';

const SplashWidget = ({elements}) => {
  return (
    <View>
      {map(elements, (s, i) => (
        <ImageBackground
          key={s.id}
          source={{uri: s.large}}
          style={{
            width: width,
            height: height,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          loadingIndicatorSource={images.logo}
          resizeMode="stretch">
          <Text
            style={{
              marginTop: '80%',
              color: 'white',
              fontSize: 30,
              fontFamily: text.font
            }}>
            {s.title}
          </Text>
        </ImageBackground>
      ))}
    </View>
  );
};

export default React.memo(SplashWidget);

SplashWidget.propTypes = {
  elements: PropTypes.array.isRequired
};

const styles = StyleSheet.create({});
