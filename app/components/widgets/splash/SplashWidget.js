import React from 'react';
import {View, StyleSheet, Text, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import {map} from 'lodash';
import {width, height, text} from './../../../constants/sizes';
import {images} from './../../../constants/images';
import {Icon} from 'react-native-elements';

const SplashWidget = ({elements, handleClick}) => {
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
            alignItems: 'center',
          }}
          loadingIndicatorSource={images.logo}
          resizeMode="stretch">
          {i == 0 ? (
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
          <Text
            style={{
              // marginTop: '80%',
              color: 'white',
              fontSize: 30,
              fontFamily: text.font,
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
  elements: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({});
