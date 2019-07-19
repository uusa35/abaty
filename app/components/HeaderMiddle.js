/**
 * Created by usamaahmed on 9/28/17.
 */
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {text} from './../constants';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';

export const HeaderMiddle = ({title}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text
          style={{
            fontFamily: text.font,
            fontSize: text.medium,
            textAlign: 'center',
            color: colors.header_one_theme_color
          }}>
          {title ? title.substring(0, 20) : null}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
    // alignItems: 'center',
    // alignSelf: 'center'
  }
});
