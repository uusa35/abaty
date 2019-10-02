/**
 * Created by usamaahmed on 9/28/17.
 */
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {text} from './../constants';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import FastImage from 'react-native-fast-image';

export const HeaderMiddle = ({title, showLogo = false}) => {
  const {colors, app_logo} = useContext(GlobalValuesContext);
  return (
    <View style={styles.container}>
      {showLogo ? (
        <FastImage
          resizeMode="contain"
          source={{uri: app_logo}}
          style={{
            width: '100%',
            height: 35,
            maxWidth: 100
          }}
        />
      ) : (
        <Text
          style={{
            fontFamily: text.font,
            fontSize: text.medium,
            textAlign: 'center',
            color: colors.header_one_theme_color
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
    alignItems: 'center'
    // alignSelf: 'center'
  }
});
