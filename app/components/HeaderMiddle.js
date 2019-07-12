/**
 * Created by usamaahmed on 9/28/17.
 */
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {text, width} from './../constants';
import FastImage from 'react-native-fast-image';

export const HeaderMiddle = ({title, logo}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontFamily: text.font,
          fontSize: text.large,
          textAlign: 'center',
          color: 'black',
          paddingTop: 4
        }}>
        {title ? title.substring(0, 25) : null}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center'
  }
});
