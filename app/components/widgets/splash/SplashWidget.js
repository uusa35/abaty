import React, {Fragment} from 'react';
import {View, StyleSheet, Text, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import {map} from 'lodash';
import {width, height, text} from './../../../constants/sizes';
import {images} from './../../../constants/images';
import {Icon} from 'react-native-elements';

const SplashWidget = ({element, index, handleClick}) => {
  return (
    <View>
      <ImageBackground
        source={{uri: element.large}}
        style={{
          width: width,
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        resizeMode="contain">
        {index === 0 ? (
          <Icon
            size={30}
            name="close"
            type="evil-icons"
            containerStyle={{
              position: 'absolute',
              top: 50,
              alignSelf: 'flex-end',
              padding: 30,
            }}
            onPress={() => handleClick()}
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          />
        ) : null}
        {element.title && (
          <Fragment>
            <Text style={styles.title}>{element.title}</Text>
            <Text style={styles.caption}>{element.caption}</Text>
          </Fragment>
        )}
      </ImageBackground>
    </View>
  );
};

export default React.memo(SplashWidget);

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
