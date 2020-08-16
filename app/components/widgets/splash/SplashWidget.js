import React, {Fragment} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {map} from 'lodash';
import {width, height, text, iconSizes} from './../../../constants/sizes';
import {images} from './../../../constants/images';
import {Icon} from 'react-native-elements';

const SplashWidget = ({element, index, handleClick}) => {
  return (
    <ImageBackground
      source={{uri: element.large}}
      style={{
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      resizeMode="contain">
      {index === 0 && (
        <TouchableOpacity
          onPress={() => handleClick()}
          style={{
            position: 'absolute',
            top: 50,
            right: 0,
            alignSelf: 'flex-end',
            padding: 15,
          }}>
          <Icon size={iconSizes.small} name="close" type="evil-icons" />
        </TouchableOpacity>
      )}
      {element.title && (
        <Fragment>
          <Text style={styles.title}>{element.title}</Text>
          <Text style={styles.caption}>{element.caption}</Text>
        </Fragment>
      )}
    </ImageBackground>
  );
};

export default SplashWidget;

SplashWidget.propTypes = {
  element: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  title: {
    marginTop: '80%',
    color: 'black',
    fontSize: 30,
    fontFamily: text.font,
  },
  caption: {
    color: 'black',
    fontFamily: text.font,
  },
});
