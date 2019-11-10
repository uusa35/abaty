import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {text} from '../../../constants';
import {appUrlIos} from '../../../env';
import {WebView} from 'react-native-webview';
import YouTube from 'react-native-youtube';
import FastImage from 'react-native-fast-image';
import {GET_VIDEO} from '../../../redux/actions/types';
import {DispatchContext} from '../../../redux/DispatchContext';

const VideoWidget = ({
  element,
  height = 120,
  width = 180,
  showImage = false,
}) => {
  [isReady, setIsReady] = useState(false);
  [status, setStatus] = useState(false);
  [quality, setQuality] = useState('');
  const {dispatch} = useContext(DispatchContext);
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
          <FastImage
            source={{uri: element.large}}
            style={{width, height: 300}}
          />
        </TouchableOpacity>
      ) : element.video_id ? (
        <YouTube
          apiKey="AIzaSyBAcgq9IHsBSRTTDroMKhHErr6Hya6qFvU"
          videoId={`${element.url}`} // The YouTube video ID
          play={false} // control playback of video with true/false
          fullscreen // control whether the video should play in fullscreen or inline
          loop // control whether the video should loop when ended
          onReady={e => setIsReady(true)}
          onChangeState={e => setStatus(e.status)}
          onChangeQuality={e => setQuality(e.quality)}
          onError={e => console.log(e.error)}
          style={{alignSelf: 'center', height: 300, width: '100%'}}
        />
      ) : (
        <WebView
          key={element.id}
          style={{
            height,
            width: width,
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
