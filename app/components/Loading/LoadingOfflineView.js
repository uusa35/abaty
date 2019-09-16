import React, {useState, useCallback} from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {Button} from 'react-native-elements';
import I18n from './../../I18n';
import {colors, text, animations} from './../../constants';
import LottieView from 'lottie-react-native';
import CodePush from 'react-native-code-push';
import PropTypes from 'prop-types';

const LoadingOfflineView = ({isConnected, mainBg}) => {
  const [connected, setConnected] = useState(isConnected);

  const handleClick = useCallback(
    connected => {
      if (connected) {
        CodePush.restartApp();
      }
    },
    [connected]
  );

  return (
    <ImageBackground
      style={{
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      source={{uri: mainBg}}
      resizeMode="cover">
      <LottieView
        source={animations.offline}
        autoPlay
        loop
        style={{height: 120}}
      />
      <Button
        onPress={() => setConnected(!connected)}
        title={I18n.t('no_internet')}
        raised
        type="outline"
        containerStyle={{marginBottom: 20, width: '90%'}}
        titleStyle={{
          fontFamily: text.font,
          fontSize: text.medium,
          color: colors.main_text_theme_color
        }}
      />
      <Button
        raised
        icon={{name: 'ios-repeat', type: 'ionicon', color: 'red'}}
        onPress={() => handleClick(!connect)}
        title={I18n.t('retry')}
        type="outline"
        containerStyle={{marginBottom: 20, width: '90%'}}
        titleStyle={{
          paddingRight: 10,
          paddingLeft: 10,
          fontFamily: text.font,
          fontSize: text.medium,
          color: colors.main_text_theme_color
        }}
      />
    </ImageBackground>
  );
};

export default LoadingOfflineView;

LoadingOfflineView.propTypes = {
  mainBg: PropTypes.string,
  isConnected: PropTypes.bool
};

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  loadingMessage: {
    fontFamily: text.font,
    color: 'black',
    fontSize: 15
  },
  retryBtnTitle: {
    fontFamily: 'cairo',
    color: 'black',
    fontSize: 15
  },
  menuBtn: {
    backgroundColor: colors.main
  }
});
