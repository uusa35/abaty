import {createStackNavigator} from 'react-navigation-stack';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import React from 'react';
import {HeaderLeft} from '../../components/HeaderLeft';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import ClassifiedIndexAllScreen from '../../screens/classified/ClassifiedIndexAllScreen';
import ClassifiedIndexScreen from '../../screens/classified/ClassifiedIndexScreen';
import NormalClassifiedShowScreen from '../../screens/classified/NormalClassifiedShowScreen';
import ImageZoomWidget from '../../components/widgets/ImageZoomWidget';
import {FavoriteStack} from '../homekey/FavoriteStack';

export const SearchStack = createStackNavigator(
  {
    ClassifiedFilter: {
      screen: ClassifiedIndexAllScreen,
      navigationOptions: () => ({
        // header: null,
        headerTitle: () => (
          <HeaderMiddle title={I18n.t('search_classifieds')} />
        ),
        headerRight: () => (
          <HeaderRight showCountry={true} showClassifiedsFilter={true} />
        ),
        headerLeft: () => <HeaderLeft showSideMenu={false} showCart={false} />,
        headerBackTitle: () => null,
      }),
    },
    ClassifiedIndex: {
      screen: ClassifiedIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerzLeft: <HeaderLeft  />,
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => (
          <HeaderRight showCountry={true} showClassifiedsFilter={true} />
        ),
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
          <HeaderRight
            navigation={navigation}
            displayShare={true}
            showCountry={true}
          />
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
    ImageZoom: {
      screen: ImageZoomWidget,
      navigationOptions: ({navigation}) => ({
        headerRight: () => <HeaderRight />,
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerBackTitle: () => null,
      }),
    },
  },
  {
    mode: 'modal',
    headerMode: 'screen',
    swipeEnabled: true,
  },
);

SearchStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
