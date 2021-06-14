/**
 * Created by usamaahmed on 9/28/17.
 */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {text} from './../constants/sizes';
import {useSelector} from 'react-redux';
import ImageLoaderContainer from './widgets/ImageLoaderContainer';
import {useRoute} from '@react-navigation/native';
import {upperFirst} from 'lodash';
import {isIOS} from '../constants';

export const HeaderMiddle = ({title, showLogo = false}) => {
  const route = useRoute();
  const {app_logo, colors} = useSelector(state => state.settings);
  const {settings} = useSelector(state => state);
  return (
    <View style={[styles.container, {flex: 1, maxWidth: isIOS ? 250 : 350}]}>
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
            textAlign: 'left',
            alignSelf: 'flex-start',
            paddingLeft: !isIOS ? '10%' : 0,
            color: colors.footer_theme_color,
          }}>
          {upperFirst(
            route.params?.name ? route.params.name : title.substring(0, 20),
          )}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: isIOS ? 'flex-start' : 'center',
  },
});
