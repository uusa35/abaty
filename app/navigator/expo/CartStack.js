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
import TransparentProductShowScreen from '../../screens/product/TransparentProductShowScreen';
import CartIndexScreen from '../../screens/cart/CartIndexScreen';
import CartConfirmationScreen from '../../screens/cart/CartConfirmationScreen';
import PaymentIndexScreen from '../../screens/PaymentIndexScreen';
import {isIOS} from '../../constants';
import DesigneratCartIndexScreen from '../../screens/cart/DesigneratCartIndexScreen';
import DesigneratCartIndexFormScreen from '../../screens/cart/DesigneratCartIndexFormScreen';
import DesigneratCartConfirmationScreen from '../../screens/cart/DesigneratCartConfirmationScreen';

export const CartStack = createStackNavigator(
  {
    CartIndex: {
      screen: DesigneratCartIndexScreen,
      navigationOptions: () => ({
        // headerLeft: () => <HeaderLeft  />,
        headerRight: () => (
          <HeaderRight showCountry={true} displayShare={false} />
        ),
        headerTitle: () => <HeaderMiddle title={I18n.t('cart')} />,
        headerBackTitle: () => null,
      }),
    },
    CartIndexForm: {
      screen: DesigneratCartIndexFormScreen,
      navigationOptions: () => ({
        headerRight: () => (
          <HeaderRight showCountry={false} displayShare={false} />
        ),
        headerTitle: () => <HeaderMiddle title={I18n.t('cart_confirmation')} />,
        headerBackTitle: () => null,
      }),
    },
    CartConfirmation: {
      screen: DesigneratCartConfirmationScreen,
      navigationOptions: () => ({
        headerRight: () => (
          <HeaderRight showCountry={false} displayShare={false} />
        ),
        headerTitle: () => <HeaderMiddle title={I18n.t('cart_confirmation')} />,
        headerBackTitle: () => null,
      }),
    },
    PaymentIndex: {
      screen: PaymentIndexScreen,
      navigationOptions: () => ({
        headerRight: () => (
          <HeaderRight showCountry={false} displayShare={false} />
        ),
        headerTitle: () => (
          <HeaderMiddle title={I18n.t('payment_index_page')} />
        ),
        headerBackTitle: () => null,
      }),
    },
    Product: {
      screen: TransparentProductShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: (
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

CartStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
