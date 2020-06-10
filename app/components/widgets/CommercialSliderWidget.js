import React from 'react';
import {
  I18nManager,
  ScrollView,
  TouchableOpacity,
  Linking,
  View,
  StyleSheet,
} from 'react-native';
import {map, shuffle} from 'lodash';
import {width} from '../../constants/sizes';
import widgetStyles from './widgetStyles';
import ImageLoaderContainer from './ImageLoaderContainer';

const CommercialSliderWidget = ({commercials}) => {
  return (
    <View style={widgetStyles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{flexDirection: 'row', width: '100%'}}
        contentContainerStyle={{
          justifyContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        {map(shuffle(commercials), (c, i) => (
          <TouchableOpacity
            key={i}
            style={{
              marginLeft: 1,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => Linking.openURL(c.path ? c.path : c.url)}>
            <ImageLoaderContainer
              img={c.thumb}
              style={{width, height: '100%'}}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CommercialSliderWidget;

const styles = StyleSheet.create({
  container: {
    height: '20%',
    borderWidth: 10,
  },
  wrapper: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
});
