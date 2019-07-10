import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {width, animations, isIOS, images} from './../constants';
import FastImage from 'react-native-fast-image';
// import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';

const LoadingView = ({logo, loadingText}) => {
  return (
    <View style={styles.activityContainer}>
      {/*<ActivityIndicator style={{marginBottom: 15}} />*/}
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
    </View>
  );
};

export default LoadingView;

LoadingView.propTypes = {
  // logo: PropTypes.string.isRequired,
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
    fontFamily: 'cairo',
    fontSize: 15,
    color: 'black',
    marginBottom: isIOS ? 35 : 50
  }
});
