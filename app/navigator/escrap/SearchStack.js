import {createStackNavigator} from 'react-navigation-stack';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import React from 'react';
import ClassifiedFilterScreen from '../../screens/search/ClassifiedFilterScreen';
import {HeaderLeft} from '../../components/HeaderLeft';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

export const SearchStack = createStackNavigator(
  {
    ClassifiedFilter: {
      screen: gestureHandlerRootHOC(ClassifiedFilterScreen),
      navigationOptions: () => ({
        // header: null,
        headerTitle: <HeaderMiddle title={I18n.t('search_classifieds')} />,
        headerRight: <HeaderRight showCountry={true} />,
        headerLeft: <HeaderLeft showSideMenu={false} showCart={false} />,
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
