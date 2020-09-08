import React, {Fragment} from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {width, height, text, iconSizes} from './../../../constants/sizes';
import {Icon} from 'react-native-elements';
import FastImage from 'react-native-fast-image';

const SplashWidget = ({element, index, handleClick}) => {
  return (
    <FastImage
      source={{uri: element.large}}
      style={{
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      resizeMode="stretch">
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
          {element.caption && (
            <Text style={styles.caption}>{element.caption}</Text>
          )}
        </Fragment>
      )}
    </FastImage>
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
    fontSize: text.xlarge,
    fontFamily: text.font,
  },
  caption: {
    color: 'black',
    fontFamily: text.font,
    fontSize: text.xlarge,
  },
});
