import {createStackNavigator} from 'react-navigation-stack';
import ProductIndexAllScreen from '../../screens/product/ProductIndexAllScreen';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import ProductShowScreen from '../../screens/product/ProductShowScreen';
import React from 'react';
import CartIndexScreen from '../../screens/cart/CartIndexScreen';
import MallrHomeScreen from '../../screens/home/MallrHomeScreen';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import SearchProductIndexScreen from '../../screens/product/SearchProductIndexScreen';
import ImageZoomWidget from '../../components/widgets/ImageZoomWidget';

export const ProductStack = createStackNavigator(
  {
    ProductIndexAll: {
      screen: gestureHandlerRootHOC(ProductIndexAllScreen),
      navigationOptions: () => ({
        headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight showCountry={true} />,
        headerTitle: () => <HeaderMiddle title={I18n.t('products')} />,
        headerBackTitle: null,
      }),
    },
    Product: {
      screen: gestureHandlerRootHOC(ProductShowScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => (
          <HeaderRight displayShare={true} showCountry={true} />
        ),
        headerBackTitle: null,
      }),
      path: `product/:id`,
    },
    Home: {
      screen: gestureHandlerRootHOC(MallrHomeScreen),
      navigationOptions: () => ({
        headerLeft: () => <HeaderLeft />,
        headerRight: () => (
          <HeaderRight showCountry={true} displayShare={false} />
        ),
        headerTitle: () => (
          <HeaderMiddle title={I18n.t('home')} showLogo={true} />
        ),
        headerBackTitle: null,
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
        headerBackTitle: null,
      }),
    },
    ImageZoom: {
      screen: gestureHandlerRootHOC(ImageZoomWidget),
      navigationOptions: ({navigation}) => ({
        headerRight: () => <HeaderRight />,
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerBackTitle: null,
      }),
    },
  },
  {
    mode: 'card',
    headerMode: 'screen',
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
