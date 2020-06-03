import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {Button} from 'react-native-elements';
import I18n from './../../I18n';
import {text, height} from './../../constants/sizes';
import {animations} from './../../constants/animations';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import {resetStore} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';

const LoadingOfflineView = () => {
  const dispatch = useDispatch();
  const {settings} = useSelector((state) => state);

  const handleClick = () => {
    dispatch(resetStore());
  };

  return (
    <ImageBackground
      style={{
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      source={{uri: settings.main_bg}}
      resizeMode="cover">
      <LottieView
        source={animations.offline}
        autoPlay
        loop
        style={{height: 120}}
      />
      <Button
        onPress={() => handleClick()}
        title={I18n.t('no_internet')}
        raised
        type="outline"
        containerStyle={{marginBottom: 20, width: '90%'}}
        titleStyle={{
          fontFamily: text.font,
          fontSize: text.medium,
          color: settings.colors.main_text_theme_color,
        }}
      />
      <Button
        raised
        icon={{name: 'ios-repeat', type: 'ionicon', color: 'red'}}
        onPress={() => handleClick()}
        title={I18n.t('retry')}
        type="outline"
        containerStyle={{marginBottom: 20, width: '90%'}}
        titleStyle={{
          paddingRight: 10,
          paddingLeft: 10,
          fontFamily: text.font,
          fontSize: text.medium,
          color: settings.colors.main_text_theme_color,
        }}
      />
    </ImageBackground>
  );
};

export default LoadingOfflineView;

LoadingOfflineView.propTypes = {
  mainBg: PropTypes.string,
  isConnected: PropTypes.bool,
};

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  loadingMessage: {
    fontFamily: text.font,
    color: 'black',
    fontSize: 15,
  },
  retryBtnTitle: {
    fontFamily: 'cairo',
    color: 'black',
    fontSize: 15,
  },
  // menuBtn: {
  //   backgroundColor: settings.colors.main,
  // },
});
