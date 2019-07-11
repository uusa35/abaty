import React from 'react';
import {I18nManager, ScrollView, Text, View} from 'react-native';
import {text, width} from '../../constants';
import {map, isNull} from 'lodash';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';
import I18n from '../../I18n';
import validate from 'validate.js';

const VideosWidget = ({videos}) => {
  return (
    <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
      <Text
        style={{
          textAlign: 'left',
          fontSize: 20,
          fontFamily: text.font,
          paddingBottom: 10
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
  videos: PropTypes.array.isRequired
};
