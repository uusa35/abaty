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

export const ProductStack = createStackNavigator(
  {
    ProductIndexAll: {
      screen: ProductIndexAllScreen,
      navigationOptions: () => ({
        headerLeft: <HeaderLeft />,
        headerRight: <HeaderRight showCountry={true} />,
        headerTitle: <HeaderMiddle title={I18n.t('products')} />,
        headerBackTitle: null,
      }),
    },
    Product: {
      screen: ProductShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight displayShare={true} />,
        headerBackTitle: null,
      }),
      path: `product/:id`,
    },
    Home: {
      screen: MallrHomeScreen,
      navigationOptions: () => ({
        headerLeft: <HeaderLeft />,
        HeaderRight: <HeaderRight showCountry={true} displayShare={false} />,
        headerTitle: <HeaderMiddle title={I18n.t('home')} showLogo={true} />,
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
