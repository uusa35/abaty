import React, {useState, Fragment} from 'react';
import {Text, StyleSheet} from 'react-native';
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

const LoadingView = ({
  loadingText = null,
  color,
  type = 'Arc',
  showLogo = false,
  shuffle = false,
}) => {
  const {
    settings,
    isLoading,
    isLoadingContent,
    isLoadingProfile,
    network,
  } = useSelector((state) => state);
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
          colors={['grey', 'lightgrey', 'white']}
          center={[width / 2, 0]}
          radius={width}>
          <Spinner
            type={shuffle ? first(shuffle(moveRand)) : type}
            color={color}
            size={iconSizes.medium}
          />
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
        <LoadingProfileView
          loadingText={I18n.t('loading')}
          isLoadingContent={isLoadingProfile}
          logo={logo}
        />
      )}
    </Fragment>
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
    // backgroundColor: '#0A3D62',
    overflow: 'hidden',
  },
});

{
  /*<LoadingOfflineView mainBg={main_bg} dispatch={dispatch} />*/
}
// if (isLoading) {
//   return (
//       <LoadingView
//           loadingText={I18n.t('loading')}
//           isLoading={isLoading}
//           logo={logo}
//           color={colors ? colors.btn_bg_theme_color : 'black'}
//           mainBg={main_bg}
//       />
//   );
// }
// if (isLoadingContent) {
//   return (
//       <LoadingContentView
//           loadingText={I18n.t('loading')}
//           isLoadingContent={isLoadingContent}
//           logo={logo}
//       />
//   );
// }
// if (isLoadingProfile) {
//   return (
//       <LoadingProfileView
//           loadingText={I18n.t('loading')}
//           isLoadingContent={isLoadingProfile}
//           logo={logo}
//       />
//   );
// }
// !network.isConnected && bootStrapped ? (
//     <LoadingOfflineView mainBg={main_bg} dispatch={dispatch} />
