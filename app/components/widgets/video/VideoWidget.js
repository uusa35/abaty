import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {text} from '../../../constants';
import {appUrlIos} from '../../../env';
import {WebView} from 'react-native-webview';
import YouTube from 'react-native-youtube';

const VideoWidget = ({element, height = 120, width = 180}) => {
  [isReady, setIsReady] = useState(false);
  [status, setStatus] = useState(false);
  [quality, setQuality] = useState('');

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
      }}>
      {element.video_id ? (
        <YouTube
          videoId={`${element.url}`} // The YouTube video ID
          play={false} // control playback of video with true/false
          fullscreen // control whether the video should play in fullscreen or inline
          loop // control whether the video should loop when ended
          onReady={e => setIsReady(true)}
          onChangeState={e => setStatus(e.status)}
          onChangeQuality={e => setQuality(e.quality)}
          onError={e => console.log(e.error)}
          style={{alignSelf: 'center', height, width}}
        />
      ) : (
        <WebView
          key={element.id}
          style={{
            height,
            width: width
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
    textAlign: 'left'
  },
  caption: {
    paddingTop: 10,
    fontFamily: text.font,
    fontSize: text.small,
    textAlign: 'left'
  }
});
