import React, {useState, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import I18n from './../I18n';
import {animations, colors, text} from './../constants';
import LottieView from 'lottie-react-native';
import RNRestart from 'react-native-restart';

const LoadingOfflineView = () => {
  const [connected, setConnected] = useState(false);

  useMemo(() => {
    if (connected) {
      RNRestart.Restart();
    }
  }, [connected]);

  return (
    <View style={styles.activityContainer}>
      <View
        style={{height: '30%', alignItems: 'center', justifyContent: 'center'}}>
        <Button
          icon={{name: 'repeat'}}
          onPress={() => setConnected(true)}
          title={I18n.t('retry')}
          type="outline"
          titleStyle={{fontFamily: text.font}}
        />
        <LottieView
          source={animations.offline}
          autoPlay
          loop
          style={{height: 100}}
        />
        <Text style={styles.loadingMessage}>{I18n.t('no_internet')}</Text>
      </View>
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
