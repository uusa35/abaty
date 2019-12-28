import {createStackNavigator} from 'react-navigation-stack';
import ProductIndexAllScreen from '../../screens/product/ProductIndexAllScreen';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import NormalProductShowScreen from '../../screens/product/NormalProductShowScreen';
import React from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import ImageZoomWidget from '../../components/widgets/ImageZoomWidget';
import SearchProductIndexScreen from '../../screens/product/SearchProductIndexScreen';

export const ProductStack = createStackNavigator(
  {
    ProductIndexAll: {
      screen: gestureHandlerRootHOC(ProductIndexAllScreen),
      navigationOptions: () => ({
        headerLeft: <HeaderLeft />,
        headerRight: <HeaderRight showCountry={true} />,
        headerTitle: <HeaderMiddle title={I18n.t('products')} />,
        headerBackTitle: null,
      }),
    },
    Product: {
      screen: gestureHandlerRootHOC(NormalProductShowScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight displayShare={true} display={true} />,
        headerBackTitle: null,
      }),
      path: `product/:id`,
    },
    SearchProductIndex: {
      screen: gestureHandlerRootHOC(SearchProductIndexScreen),
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft  />,
        headerRight: <HeaderRight showCountry={true} />,
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerBackTitle: null,
      }),
    },
    ImageZoom: {
      screen: gestureHandlerRootHOC(ImageZoomWidget),
      navigationOptions: ({navigation}) => ({
        headerRight: <HeaderRight />,
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerBackTitle: null,
      }),
    },
  },
  {
    mode: 'card',
    headerMode: 'screen',
    swipeEnabled: false,
  },
);

ProductStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
