/**
 * Created by usamaahmed on 9/28/17.
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

export const HeaderBack = ({navigation}) => {
  return (
    <Icon
      type="fontawesome"
      name="chevron-right"
      size={32}
      onPress={() => navigation.navigate('Home')}
      underlayColor="transparent"
      hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
      color="black"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '150%',
  },
});
