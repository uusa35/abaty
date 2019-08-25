import React, {useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ImageBackground
} from 'react-native';
import {isIOS, images, text} from './../../constants';
import FastImage from 'react-native-fast-image';
// import LottieView from 'lottie-react-native';
//import { AnimatedCircularProgress } from 'react-native-circular-progress';
import PropTypes from 'prop-types';

const LoadingView = ({logo, loadingText, isLoading, color, mainBg}) => {
  const [fill, setFill] = useState(0);
  return (
    <ImageBackground style={styles.activityContainer} source={{uri: mainBg}}>
      {/*<AnimatedCircularProgress*/}
      {/*    size={50}*/}
      {/*    width={10}*/}
      {/*    fill={fill}*/}
      {/*    tintColor={color}*/}
      {/*    style={{ opacity : 0.8 }}*/}
      {/*    onAnimationComplete={() => isLoading ? setFill(100) : setFill(fill + 10)}*/}
      {/*    backgroundColor="#3d5875" />*/}
      <ActivityIndicator style={{marginBottom: 15}} color={color} />
      {/*<LottieView*/}
      {/*  source={animations.circleLoading_2}*/}
      {/*  autoPlay*/}
      {/*  loop*/}
      {/*  style={{marginTop: isIOS ? 65 : 100}}*/}
      {/*  enableMergePathsAndroidForKitKatAndAbove*/}
      {/*/>*/}
      <FastImage
        source={{uri: logo}}
        style={{width: 150, height: 100, margin: 10}}
        resizeMode="contain"
        loadingIndicatorSource={images.logo}
      />
      <Text style={styles.loadingText}>{loadingText}</Text>
    </ImageBackground>
  );
};

export default React.memo(LoadingView);

LoadingView.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  logo: PropTypes.string,
  columns: PropTypes.number
};

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    opacity: 1
  },
  loadingText: {
    fontFamily: text.font,
    fontSize: 15,
    color: 'black',
    marginBottom: isIOS ? 35 : 50
  }
});
