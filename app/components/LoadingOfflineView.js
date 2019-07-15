import React, {useState, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import I18n from './../I18n';
import {animations, colors, text, width} from './../constants';
// import LottieView from 'lottie-react-native';
import RNRestart from 'react-native-restart';
import CodePush from 'react-native-code-push';

const LoadingOfflineView = ({isConnected}) => {
  const [connected, setConnected] = useState(isConnected);

  useMemo(() => {
    if (connected) {
      CodePush.restartApp();
    }
  }, [connected]);

  return (
    <View
      style={{
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Button
        onPress={() => setConnected(!connected)}
        title={I18n.t('no_internet')}
        raised
        type="outline"
        containerStyle={{marginBottom: 20, width: '100%'}}
        titleStyle={{
          fontFamily: text.font,
          fontSize: text.medium,
          color: colors.main_text_theme_color
        }}
      />
      <Button
        raised
        icon={{name: 'repeat', type: 'font-awesome', color: 'red'}}
        onPress={() => setConnected(!connected)}
        title={I18n.t('retry')}
        type="outline"
        containerStyle={{marginBottom: 20, width: '100%'}}
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
    </View>
  );
};

export default React.memo(LoadingOfflineView);

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
