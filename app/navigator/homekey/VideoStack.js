import {createStackNavigator} from 'react-navigation-stack';
import VideoIndexScreen from '../../screens/video/VideoIndexScreen';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import React from 'react';
import VideoShowScreen from '../../screens/video/VideoShowScreen';
import HeaderCustom from '../../components/HeaderCustom';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

export const VideoStack = createStackNavigator(
  {
    VideoIndex: {
      screen: gestureHandlerRootHOC(VideoIndexScreen),
      navigationOptions: ({navigation}) => ({
        headerLeft: () => <HeaderLeft {...navigation} />,
        headerTitle: () => <HeaderMiddle title={I18n.t('videos')} />,
        headerBackTitle: () => null,
      }),
    },
    VideoShow: {
      screen: gestureHandlerRootHOC(VideoShowScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: <HeaderCustom navigation={navigation} />,
        headerBackTitle: () => null,
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
