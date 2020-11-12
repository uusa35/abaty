import {createStackNavigator} from 'react-navigation-stack';
import SearchScreen from '../../screens/search/SearchScreen';
import {Icon} from 'react-native-elements';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import React from 'react';
import ServiceShowScreen from '../../screens/service/ServiceShowScreen';
import NormalProductShowScreen from '../../screens/product/NormalProductShowScreen';
import AbatiHomeScreen from '../../screens/home/AbatiHomeScreen';
import SearchProductIndexScreen from '../../screens/product/SearchProductIndexScreen';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {isIOS} from '../../constants';
import ExpoHomeScreen from '../../screens/home/ExpoHomeScreen';

export const SearchStack = createStackNavigator(
  {
    SearchIndex: {
      screen: SearchScreen,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="search1" type="antdesign" color={tintColor} />
        ),
        headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight display={true} />,
        headerTitle: () => <HeaderMiddle title={I18n.t('search')} />,
        headerBackTitle: () => null,
      }),
    },
    SearchProductIndex: {
      screen: SearchProductIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: () => <HeaderLeft  />,
        headerRight: () => <HeaderRight showCountry={true} />,
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerBackTitle: () => null,
      }),
    },
    Product: {
      screen: NormalProductShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: (
          <HeaderRight
            navigation={navigation}
            displayShare={true}
            display={true}
          />
        ),
        headerBackTitle: () => null,
      }),
      path: `product/:id`,
    },
    Service: {
      screen: ServiceShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: (
          <HeaderRight
            navigation={navigation}
            displayShare={true}
            display={true}
          />
        ),
        headerBackTitle: () => null,
        headerStyle: {
          // backgroundColor: 'white',
          // zIndex: 100
        },
      }),
      path: `service/:id`,
    },
    Home: {
      screen: ExpoHomeScreen,
      navigationOptions: () => ({
        headerLeft: () => <HeaderLeft />,
        headerRight: () => (
          <HeaderRight displayShare={false} showCountry={true} />
        ),
        headerTitle: () => (
          <HeaderMiddle title={I18n.t('home')} showLogo={true} />
        ),
        headerBackTitle: () => null,
      }),
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
