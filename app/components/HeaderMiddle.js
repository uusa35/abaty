/**
 * Created by usamaahmed on 9/28/17.
 */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {text} from './../constants/sizes';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import ImageLoaderContainer from './widgets/ImageLoaderContainer';

export const HeaderMiddle = ({title, showLogo = false}) => {
  const {app_logo, colors} = useSelector((state) => state.settings);
  return (
    <View style={styles.container}>
      {showLogo ? (
        <ImageLoaderContainer
          resizeMode="contain"
          img={app_logo}
          style={{
            width: 120,
            height: 35,
            maxWidth: 100,
          }}
        />
      ) : (
        <Text
          style={{
            fontFamily: text.font,
            fontSize: text.medium,
            textAlign: 'center',
            color: colors.header_one_theme_color,
          }}>
          {title ? title.substring(0, 20) : null}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
