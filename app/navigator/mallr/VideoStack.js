import {createStackNavigator} from 'react-navigation';
import VideoIndexScreen from '../../screens/video/VideoIndexScreen';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import React from 'react';

export const VideoStack = createStackNavigator(
  {
    VideoIndex: {
      screen: VideoIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: <HeaderLeft {...navigation} />,
        headerTitle: <HeaderMiddle title={I18n.t('videos')} />,
        headerBackTitle: null,
      }),
    },
  },
  {
    mode: 'card',
    headerMode: 'float',
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
