import {createStackNavigator} from 'react-navigation-stack';
import VideoIndexScreen from '../../screens/video/VideoIndexScreen';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import React from 'react';
import VideoShowScreen from '../../screens/video/VideoShowScreen';
import HeaderCustom from '../../components/HeaderCustom';
import {HeaderRight} from '../../components/HeaderRight';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {isIOS} from '../../constants';

export const VideoStack = createStackNavigator(
  {
    VideoIndex: {
      screen: VideoIndexScreen,
      navigationOptions: () => ({
        headerLeft: () => <HeaderLeft />,
        headerTitle: () => <HeaderMiddle title={I18n.t('videos')} />,
        headerRight: () => <HeaderRight />,
        headerBackTitle: () => null,
      }),
    },
    VideoShow: {
      screen: VideoShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderCustom navigation={navigation} />,
        headerBackTitle: () => null,
      }),
    },
  },
  {
    mode: 'card',
    headerMode: 'screen',
    swipeEnabled: true,
    animation: 'spring',
    defaultNavigationOptions: () => ({
      animationEnabled: false,
    }),
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  },
);

VideoStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
