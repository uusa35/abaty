import {createStackNavigator} from 'react-navigation-stack';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import React from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import ClassifiedIndexAllScreen from '../../screens/classified/ClassifiedIndexAllScreen';
import ClassifiedFilterModalScreen from '../../screens/search/ClassifiedFilterModalScreen';
import {isIOS} from '../../constants';

export const SearchStack = createStackNavigator(
  {
    ClassifiedFilter: {
      screen: ClassifiedIndexAllScreen,
      navigationOptions: () => ({
        // header: null,
        headerTitle: () => (
          <HeaderMiddle title={I18n.t('search_classifieds')} />
        ),
        headerRight: () => <HeaderRight showCountry={true} />,
        headerBackTitle: () => null,
      }),
      ClassifiedFilterModal: {
        screen: ClassifiedFilterModalScreen,
        navigationOptions: () => ({
          headerTitle: () => (
            <HeaderMiddle title={I18n.t('search_classifieds')} />
          ),
          headerRight: () => <HeaderRight display={false} />,
          headerBackTitle: () => null,
        }),
      },
    },
  },
  {
    mode: 'modal',
    headerMode: 'screen',
    swipeEnabled: true,
    defaultNavigationOptions: () => ({
      animationEnabled: false,
    }),
  },
);
