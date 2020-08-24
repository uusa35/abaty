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
import {toggleLoading} from '../../../redux/actions';

const VideosVerticalWidget = ({videos}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View style={styles.container}>
      {!isNull(videos['video_url_one']) ? (
        <Text style={[styles.title, {color: colors.header_one_theme_color}]}>
          {I18n.t('videos')}
        </Text>
      ) : null}
      <ScrollView
        horizontal={false}
        disableIntervalMomentum={true}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        showsHorizontalScrollIndicator={false}
        style={{flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'}}
        contentContainerStyle={{alignItems: 'center', alignSelf: 'center'}}>
        {!validate.isEmpty(videos) ? (
          map(videos, (v, i) =>
            !isNull(v) ? (
              <WebView
                useWebKit={true}
                key={i}
                style={{
                  height: 200,
                  margin: 5,
                  borderWidth: 0.5,
                  width: width / 1.1,
                  borderColor: 'lightgrey',
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

export default VideosVerticalWidget;

VideosVerticalWidget.propTypes = {
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
