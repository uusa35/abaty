import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {Button} from 'react-native-elements';
import I18n from './../../I18n';
import {text} from './../../constants/sizes';
import {images} from '../../constants/images';
import {animations} from './../../constants/animations';
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import RNRestart from 'react-native-restart';
import DesingeratBtn from '../widgets/Button/DesigneratBtn';

const LoadingOfflineView = () => {
  const handleClick = () => RNRestart.Restart();
  const {colors} = useSelector(state => state.settings);

  return (
    <ImageBackground
      style={{
        flex: 1,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      source={images.whiteBg}
      resizeMode="cover">
      <LottieView
        source={animations.offline}
        autoPlay
        loop
        style={{height: 120}}
      />
      {colors && (
        <>
          <DesingeratBtn
            handleClick={() => handleClick()}
            bg={false}
            title={I18n.t('no_internet')}
          />
          <DesingeratBtn
            handleClick={() => handleClick()}
            bg={false}
            title={I18n.t('retry')}
          />
        </>
      )}
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
});
