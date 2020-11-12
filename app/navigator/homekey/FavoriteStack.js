import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import ClassifiedIndexScreen from '../../screens/classified/ClassifiedIndexScreen';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import NormalClassifiedShowScreen from '../../screens/classified/NormalClassifiedShowScreen';
import I18n from '../../I18n';
import HomeKeyHomeScreen from '../../screens/home/HomeKeyHomeScreen';
import FavoriteClassifiedIndexScreen from '../../screens/classified/FavoriteClassifiedIndexScreen';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import ClassifiedFilterModalScreen from '../../screens/search/ClassifiedFilterModalScreen';
import {isIOS} from '../../constants';

export const FavoriteStack = createStackNavigator(
  {
    FavoriteClassifiedIndex: {
      screen: FavoriteClassifiedIndexScreen,
      navigationOptions: () => ({
        headerLeft: () => <HeaderLeft showCart={false} showSideMenu={false} />,
        headerRight: () => (
          <HeaderRight showCountry={false} showFilter={false} />
        ),
        headerTitle: () => <HeaderMiddle title={I18n.t('wishlist')} />,
        headerBackTitle: () => null,
      }),
    },
    ClassifiedIndex: {
      screen: ClassifiedIndexScreen,
      navigationOptions: () => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('classifieds')} />,
        headerRight: () => <HeaderRight showFilter={true} showCountry={true} />,
        headerBackTitle: () => null,
      }),
    },
    Classified: {
      screen: NormalClassifiedShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => (
          <HeaderRight displayShare={true} showCountry={true} />
        ),
        headerBackTitle: () => null,
        headerStyle: {
          backgroundColor: 'white',
          borderColor: 'transparent',
          zIndex: 100,
        },
      }),
      path: `classified/:id`,
    },
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
  {
    mode: 'card',
    headerMode: 'screen',
    swipeEnabled: true,
    defaultNavigationOptions: () => ({
      animationEnabled: false,
    }),
  },
);
FavoriteStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
