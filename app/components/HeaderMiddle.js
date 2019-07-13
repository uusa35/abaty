/**
 * Created by usamaahmed on 9/28/17.
 */
import React, {useContext} from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {text} from './../constants';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';

export const HeaderMiddle = ({title}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontFamily: text.font,
          fontSize: text.large,
          textAlign: 'center',
          color: colors.header_one_theme_color
        }}>
        {title ? title.substring(0, 25) : null}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
});
