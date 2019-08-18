import React from 'react';
import {
  I18nManager,
  ScrollView,
  TouchableOpacity,
  Linking,
  View,
  StyleSheet
} from 'react-native';
import {map} from 'lodash';
import FastImage from 'react-native-fast-image';
import {images, width} from '../../constants';
import widgetStyles from './widgetStyles';

const CommercialSliderWidget = ({commercials}) => {
  return (
    <View style={widgetStyles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={widgetStyles.wrapper}>
        {map(commercials, (c, i) => (
          <TouchableOpacity
            key={i}
            style={widgetStyles.btnStyle}
            onPress={() => Linking.openURL(c.path ? c.path : c.url)}>
            <FastImage
              source={{
                uri: c.thumb,
                priority: FastImage.priority.normal
              }}
              loadingIndicatorSource={images.logo}
              style={{width: width - 5, height: '100%'}}
              resizeMode="contain"
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
    height: '20%'
  },
  wrapper: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'
  }
});
