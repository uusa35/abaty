import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {text, width} from './../../constants/sizes';
import {isIOS} from './../../constants';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import Spinner from 'react-native-spinkit';
import {first, shuffle} from 'lodash';
import RadialGradient from 'react-native-radial-gradient';
import ImageLoaderContainer from '../widgets/ImageLoaderContainer';

const LoadingView = ({logo, loadingText, color, type = 'ThreeBounce'}) => {
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
    <RadialGradient
      style={styles.itemContainerStyle}
      colors={['grey', 'lightgrey', 'white']}
      center={[width / 2, 0]}
      radius={width}>
      <Spinner type={first(shuffle(moveRand))} color={color} size={40} />
      <ImageLoaderContainer
        img={logo}
        style={{width: 150, height: 100, margin: 10}}
        resizeMode="contain"
      />
      <Text style={styles.loadingText}>{loadingText}</Text>
    </RadialGradient>
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
  itemContainerStyle: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A3D62',
    overflow: 'hidden',
  },
});
