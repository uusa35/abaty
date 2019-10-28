import React, {useState} from 'react';
import {Text, StyleSheet, ImageBackground} from 'react-native';
import {isIOS, images, text, animations} from './../../constants';
import FastImage from 'react-native-fast-image';
import LottieView from 'lottie-react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import PropTypes from 'prop-types';
import Spinner from 'react-native-spinkit';
import {first, shuffle} from 'lodash';
import {ABATI, MALLR} from './../../../app';

const LoadingView = ({
  logo,
  loadingText,
  isLoading,
  color,
  mainBg,
  type = 'ThreeBounce',
}) => {
  const [fill, setFill] = useState(0);
  const [moveRand, setMoveRand] = useState([
    'CircleFlip',
    'Bounce',
    'Wave',
    'WanderingCubes',
    'Pulse',
    'ChasingDots',
    'ThreeBounce',
    'Circle',
    '9CubeGrid',
    'WordPress',
    'FadingCircle',
    'FadingCircleAlt',
    'Arc',
    'ArcAlt',
  ]);

  return (
    <ImageBackground style={styles.activityContainer} source={{uri: mainBg}}>
      <Spinner type={first(shuffle(moveRand))} color={color} size={40} />
      <FastImage
        source={{uri: logo}}
        style={{width: 150, height: 100, margin: 10}}
        resizeMode="contain"
        loadingIndicatorSource={{uri: logo}}
      />
      <Text style={styles.loadingText}>{loadingText}</Text>
    </ImageBackground>
  );
};

export default LoadingView;

LoadingView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  logo: PropTypes.string,
  columns: PropTypes.number,
};

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    opacity: 1,
  },
  loadingText: {
    fontFamily: text.font,
    fontSize: 15,
    color: 'black',
    marginBottom: isIOS ? 35 : 50,
  },
});
