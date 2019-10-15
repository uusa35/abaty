import {createStackNavigator} from 'react-navigation';
import SearchScreen from '../../screens/SearchScreen';
import {Icon} from 'react-native-elements';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import React from 'react';

export const SearchStack = createStackNavigator(
  {
    SearchIndex: {
      screen: SearchScreen,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-search" type="ionicon" color={tintColor} />
        ),
        headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        headerTitle: <HeaderMiddle title={I18n.t('search')} />,
        headerBackTitle: null
      })
    }
  },
  {
    mode: 'modal',
    headerMode: 'screen',
    swipeEnabled: true
  }
);