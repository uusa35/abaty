import React, {useContext} from 'react';
import {I18nManager, ScrollView, StyleSheet, Text, View} from 'react-native';
import {text, width} from '../../constants';
import {appUrlIos} from '../../env';
import {map, isNull} from 'lodash';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';
import I18n from '../../I18n';
import validate from 'validate.js';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import VideoWidget from './VideoWidget';

const VideosWidget = ({videos}) => {
  const {colors} = useContext(GlobalValuesContext);
  // console.log('videos', videos['video_url_one']);
  // console.log(`${appUrlIos}webview?url=${videos['video_url_one']}`);
  return (
    <View style={{width: '90%', alignSelf: 'center', marginTop: 30}}>
      {!isNull(videos['video_url_one']) ? (
        <Text
          style={{
            fontFamily: text.font,
            fontSize: text.large,
            marginBottom: 10,
            textAlign: 'left',
            color: colors.header_one_theme_color,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,

            elevation: 1
          }}>
          {I18n.t('videos')}
        </Text>
      ) : null}
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
                  width: width - 80,
                  marginRight: 5,
                  marginLeft: 5
                }}
                javaScriptEnabled={true}
                source={{uri: `${appUrlIos}webview?url=${v}`}}
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
