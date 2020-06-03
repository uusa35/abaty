import React, {useContext} from 'react';
import {I18nManager, ScrollView, StyleSheet, Text, View} from 'react-native';
import {text, width} from '../../../constants/sizes';
import {appUrlIos} from '../../../env';
import {map, isNull} from 'lodash';
import PropTypes from 'prop-types';
import {WebView} from 'react-native-webview';
import I18n from '../../../I18n';
import validate from 'validate.js';
import {Button} from 'react-native-elements';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const VideosHorizontalWidget = ({videos}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View style={styles.container}>
      {!isNull(videos['video_url_one']) ? (
        <Text style={[styles.title, {color: colors.header_one_theme_color}]}>
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
                useWebKit={true}
                key={i}
                style={{
                  height: 200,
                  width: width - 80,
                  marginRight: 5,
                  marginLeft: 5,
                }}
                javaScriptEnabled={true}
                source={{uri: `${appUrlIos}webview?url=${v}`}}
              />
            ) : null,
          )
        ) : (
          <View style={styles.noVideosContainer}>
            <Button
              raised
              title={I18n.t('no_videos')}
              type="outline"
              containerStyle={{marginBottom: 20}}
              titleStyle={{fontFamily: text.font}}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default VideosHorizontalWidget;

VideosHorizontalWidget.propTypes = {
  videos: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
  },
  noVideosContainer: {
    marginTop: 300,
    flex: 1,
    borderWidth: 1,
    alignSelf: 'center',
  },
  title: {
    fontFamily: text.font,
    fontSize: text.large,
    marginBottom: 10,
    textAlign: 'left',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
});
