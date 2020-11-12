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
import CartIndexScreen from '../../screens/cart/CartIndexScreen';
import {isIOS} from '../../constants';

export const ProductStack = createStackNavigator(
  {
    ProductIndexAll: {
      screen: ProductIndexAllScreen,
      navigationOptions: () => ({
        headerLeft: () => <HeaderLeft showCart={true} />,
        headerRight: () => <HeaderRight showCountry={true} />,
        headerTitle: () => <HeaderMiddle title={I18n.t('products')} />,
        headerBackTitle: () => null,
      }),
    },
    Product: {
      screen: NormalProductShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => (
          <HeaderRight displayShare={true} showCountry={true} display={true} />
        ),
        headerBackTitle: () => null,
      }),
      path: `product/:id`,
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
    CartIndex: {
      screen: CartIndexScreen,
      navigationOptions: () => ({
        // headerLeft: () => <HeaderLeft  />,
        headerRight: () => (
          <HeaderRight showCountry={true} displayShare={false} />
        ),
        headerTitle: () => <HeaderMiddle title={I18n.t('cart')} />,
        headerBackTitle: () => null,
      }),
    },
  },
  {
    mode: 'card',
    headerMode: 'screen',
    swipeEnabled: true,
    animation: 'spring',
    animationEnabled: false,
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
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
