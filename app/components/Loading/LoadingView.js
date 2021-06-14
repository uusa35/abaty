import React, {useState, Fragment} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {text, width, height, iconSizes} from './../../constants/sizes';
import {isIOS} from './../../constants';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import Spinner from 'react-native-spinkit';
import {first, shuffle, isNull} from 'lodash';
import RadialGradient from 'react-native-radial-gradient';
import ImageLoaderContainer from '../widgets/ImageLoaderContainer';
import {useSelector} from 'react-redux';
import LoadingOfflineView from './LoadingOfflineView';
import I18n from '../../I18n';
import LoadingProfileView from './LoadingProfileView';
import LoadingContentView from './LoadingContentView';
import LoadingBoxedListView from './LoadingBoxedListView';
import LottieView from 'lottie-react-native';
import {animations} from '../../constants/animations';
import {EXPO} from './../../../app';

const LoadingView = ({
  loadingText = null,
  type = 'Arc',
  showLogo = false,
  shuffle = false,
}) => {
  const {
    settings,
    isLoading,
    isLoadingContent,
    isLoadingProfile,
    isLoadingBoxedList,
  } = useSelector(state => state);
  const {colors} = settings;
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
    <Fragment>
      {isLoading && (
        <RadialGradient
          style={styles.itemContainerStyle}
          colors={[colors.btn_bg_theme_color, 'lightgrey', 'white']}
          center={[width / 2, 0]}
          radius={width}>
          {EXPO ? (
            <LottieView
              source={animations.expoLoading}
              autoPlay
              loop
              resizeMode="cover"
              style={{
                alignSelf: 'center',
                width: width / 8,
                height: width / 8,
              }}
              enableMergePathsAndroidForKitKatAndAbove
            />
          ) : (
            <Fragment>
              <ImageLoaderContainer
                img={settings.logo}
                style={{
                  width: iconSizes.largest,
                  height: iconSizes.largest,
                  margin: 10,
                }}
                resizeMode="contain"
              />
              <Spinner
                type={shuffle ? first(shuffle(moveRand)) : type}
                color={colors.btn_bg_theme_color}
                size={iconSizes.medium}
              />
            </Fragment>
          )}
          {showLogo && (
            <ImageLoaderContainer
              img={settings.logo}
              style={{width: 150, height: 100, margin: 10}}
              resizeMode="contain"
            />
          )}
          {!isNull(loadingText) && (
            <Text style={styles.loadingText}>{loadingText}</Text>
          )}
        </RadialGradient>
      )}
      {isLoadingContent && (
        <LoadingContentView loadingText={I18n.t('loading')} />
      )}
      {isLoadingProfile && (
        <LoadingProfileView loadingText={I18n.t('loading')} />
      )}
      {isLoadingBoxedList && (
        <LoadingBoxedListView loadingText={I18n.t('loading')} />
      )}
    </Fragment>
  );
};

export default LoadingView;

LoadingView.propTypes = {
  isLoading: PropTypes.bool,
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
    // backgroundColor: '#0A3D62',
    overflow: 'hidden',
  },
});
