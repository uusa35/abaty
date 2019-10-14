import {createStackNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import React from 'react';
import MallrSettingsIndexScreen from '../../screens/mallr/MallrSettingsIndexScreen';
import MallrAccountScreen from '../../screens/mallr/MallrAccountScreen';

export const MallrSettingStack = createStackNavigator(
  {
    Account: {
      screen: MallrAccountScreen,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-person" type="ionicon" color={tintColor} />
        ),
        headerLeft: <HeaderLeft />,
        headerRight: <HeaderRight display={true} />,
        headerTitle: <HeaderMiddle title={I18n.t('me')} />,
        headerBackTitle: null
      })
    },
    SettingIndex: {
      screen: MallrSettingsIndexScreen,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-person" type="ionicon" color={tintColor} />
        ),
        headerLeft: <HeaderLeft />,
        headerRight: <HeaderRight display={true} />,
        headerTitle: <HeaderMiddle title={I18n.t('me')} />,
        headerBackTitle: null
      })
    }
  },
  {
    mode: 'card',
    headerMode: 'screen',
    swipeEnabled: false
  }
);
