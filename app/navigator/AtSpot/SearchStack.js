import {createStackNavigator} from 'react-navigation-stack';
import SearchScreen from '../../screens/search/SearchScreen';
import {Icon} from 'react-native-elements';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import React from 'react';
import ServiceShowScreen from '../../screens/service/ServiceShowScreen';
import ProductShowScreen from '../../screens/product/ProductShowScreen';
import ProductIndexScreen from '../../screens/product/ProductIndexScreen';
import SearchProductIndexScreen from '../../screens/product/SearchProductIndexScreen';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

export const SearchStack = createStackNavigator(
  {
    SearchIndex: {
      screen: gestureHandlerRootHOC(SearchScreen),
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-search" type="ionicon" color={tintColor} />
        ),
        headerLeft: () => <HeaderLeft {...navigation} />,
        headerRight: () => <HeaderRight {...navigation} display={true} />,
        headerTitle: () => <HeaderMiddle title={I18n.t('search')} />,
        headerBackTitle: () => null,
      }),
    },
    SearchProductIndex: {
      screen: gestureHandlerRootHOC(SearchProductIndexScreen),
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
      screen: gestureHandlerRootHOC(ProductShowScreen),
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
      screen: gestureHandlerRootHOC(ServiceShowScreen),
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
  },
  {
    mode: 'modal',
    headerMode: 'screen',
    swipeEnabled: true,
  },
);
