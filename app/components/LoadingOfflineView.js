import React, {useState, useMemo} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {Button} from 'react-native-elements';
import I18n from './../I18n';
import {colors, text, mainBg} from './../constants';
// import LottieView from 'lottie-react-native';
import RNRestart from 'react-native-restart';
import CodePush from 'react-native-code-push';
import PropTypes from 'prop-types';

const LoadingOfflineView = ({isConnected, mainBg}) => {
  const [connected, setConnected] = useState(isConnected);

  useMemo(() => {
    if (connected) {
      CodePush.restartApp();
    }
  }, [connected]);

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
        onPress={() => setConnected(!connected)}
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
      {/*<LottieView*/}
      {/*  source={animations.offline}*/}
      {/*  autoPlay*/}
      {/*  loop*/}
      {/*  style={{height: 100}}*/}
      {/*/>*/}
    </ImageBackground>
  );
};

export default React.memo(LoadingOfflineView);

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
