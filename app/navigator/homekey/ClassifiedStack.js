import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import ClassifiedIndexScreen from '../../screens/classified/ClassifiedIndexScreen';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import NormalClassifiedShowScreen from '../../screens/classified/NormalClassifiedShowScreen';
import I18n from '../../I18n';
import HomeKeyHomeScreen from '../../screens/home/HomeKeyHomeScreen';
import ClassifiedIndexAllScreen from '../../screens/classified/ClassifiedIndexAllScreen';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import ImageZoomWidget from '../../components/widgets/ImageZoomWidget';
import ClassifiedFilterModalScreen from '../../screens/search/ClassifiedFilterModalScreen';
import {isIOS} from '../../constants';

export const ClassifiedStack = createStackNavigator(
  {
    ClassifiedIndexAll: {
      screen: ClassifiedIndexAllScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('classifieds')} />,
        headerRight: () => <HeaderRight showFilter={true} showCountry={true} />,
        headerLeft: () => <HeaderLeft showCart={false} showSideMenu={false} />,
        headerBackTitle: () => null,
      }),
    },
    ClassifiedIndex: {
      screen: ClassifiedIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('classifieds')} />,
        headerRight: () => <HeaderRight showFilter={true} showCountry={true} />,
        headerBackTitle: () => null,
      }),
    },
    Home: {
      screen: HomeKeyHomeScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: () => <HeaderLeft {...navigation} />,
        headerRight: () => <HeaderRight {...navigation} display={true} />,
        // headerTitle: () => <HeaderMiddle title={I18n.t('home')}/>,
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
ClassifiedStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
