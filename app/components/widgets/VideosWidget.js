import React, {useContext} from 'react';
import {I18nManager, ScrollView, StyleSheet, Text, View} from 'react-native';
import {text, width} from '../../constants';
import {map, isNull} from 'lodash';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';
import I18n from '../../I18n';
import validate from 'validate.js';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const VideosWidget = ({videos}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View style={{width: '90%', alignSelf: 'center', marginTop: 30}}>
      <Text
        style={{
          fontFamily: text.font,
          fontSize: text.large,
          marginBottom: 10,
          textAlign: 'left',
          color: colors.header_one_theme_color
        }}>
        {I18n.t('videos')}
      </Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'}}>
        {!validate.isEmpty(videos) ? (
          map(videos, (v, i) =>
            !isNull(v) ? (
              <WebView
                key={i}
                style={{
                  height: 200,
                  width: width,
                  marginRight: 5,
                  marginLeft: 5
                }}
                javaScriptEnabled={true}
                source={{uri: `http://mallr.test/webview?url=${v}`}}
              />
            ) : null
          )
        ) : (
          <View>
            <Text>No Videos</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default VideosWidget;

VideosWidget.propTypes = {
  videos: PropTypes.object.isRequired
};

const styles = StyleSheet.create({});
