import {createStackNavigator} from 'react-navigation';
import SettingsIndexScreen from '../../screens/SettingsIndexScreen';
import {Icon} from 'react-native-elements';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import React from 'react';

export const AbatiSettingStack = createStackNavigator(
  {
    SettingIndex: {
      screen: SettingsIndexScreen,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-person" type="ionicon" color={tintColor} />
        ),
        headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        headerTitle: <HeaderMiddle title={I18n.t('me')} />,
        headerBackTitle: null,
      }),
    },
  },
  {
    mode: 'modal',
    headerMode: 'screen',
    swipeEnabled: false,
  },
);
