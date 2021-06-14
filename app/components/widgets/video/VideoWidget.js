import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {text} from '../../../constants/sizes';
import {appUrlIos} from '../../../env';
import {WebView} from 'react-native-webview';
import YouTube from 'react-native-youtube';
import FastImage from 'react-native-fast-image';
import {GET_VIDEO} from '../../../redux/actions/types';
import {toggleLoading} from '../../../redux/actions';
import {useDispatch} from 'react-redux';
import {isNull} from 'lodash';
import ImageLoaderContainer from '../ImageLoaderContainer';

const VideoWidget = ({
  element,
  height = 120,
  width = 180,
  showImage = false,
}) => {
  const dispatch = useDispatch();

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 5,
      }}>
      {showImage ? (
        <TouchableOpacity
          onPress={() => dispatch({type: GET_VIDEO, payload: element.id})}>
          <ImageLoaderContainer img={element.large} style={{width, height}} />
        </TouchableOpacity>
      ) : !isNull(element.video_id) ? (
        <YouTube
          apiKey="AIzaSyBAcgq9IHsBSRTTDroMKhHErr6Hya6qFvU"
          videoId={`${element.url}`} // The YouTube video ID
          play={false} // control playback of video with true/false
          fullscreen={false} // control whether the video should play in fullscreen or inline
          loop // control whether the video should loop when ended
          onReady={e => setIsReady(true)}
          onChangeState={e => setStatus(e.status)}
          onChangeQuality={e => setQuality(e.quality)}
          // onError={(e) => console.log(e.error)}
          style={{
            alignSelf: 'center',
            height,
            width: '100%',
          }}
        />
      ) : (
        <WebView
          useWebKit={true}
          key={element.id}
          style={{
            height: 300,
            width,
          }}
          javaScriptEnabled={true}
          source={{uri: `${appUrlIos}webview?url=${element.url}`}}
        />
      )}
      <Text style={styles.title}>{element.name}</Text>
      <Text style={styles.caption}>{element.caption}</Text>
    </View>
  );
};

export default VideoWidget;

const styles = StyleSheet.create({
  title: {
    paddingTop: 10,
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'left',
  },
  caption: {
    paddingTop: 10,
    fontFamily: text.font,
    fontSize: text.small,
    textAlign: 'left',
  },
});
