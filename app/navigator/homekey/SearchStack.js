import {createStackNavigator} from 'react-navigation';
import SearchScreen from '../../screens/search/SearchScreen';
import {Icon} from 'react-native-elements';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import React from 'react';
import ClassifiedFilterScreen from '../../screens/search/ClassifiedFilterScreen';

export const SearchStack = createStackNavigator(
  {
    ClassifiedFilter: {
      screen: ClassifiedFilterScreen,
      navigationOptions: () => ({
        // header: null,
        headerTitle: <HeaderMiddle title={I18n.t('search_classifieds')} />,
        headerRight: <HeaderRight showCountry={true} />,
        headerBackTitle: null,
      }),
    },
  },
  {
    mode: 'modal',
    headerMode: 'screen',
    swipeEnabled: true,
  },
);
