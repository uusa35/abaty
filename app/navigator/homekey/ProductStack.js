import {createStackNavigator} from 'react-navigation-stack';
import ProductIndexAllScreen from '../../screens/product/ProductIndexAllScreen';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import NormalProductShowScreen from '../../screens/product/NormalProductShowScreen';
import React from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {isIOS} from '../../constants';

export const ProductStack = createStackNavigator(
  {
    ProductIndexAll: {
      screen: ProductIndexAllScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: () => <HeaderLeft {...navigation} />,
        headerRight: () => <HeaderRight {...navigation} display={true} />,
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
  },
  {
    mode: 'card',
    headerMode: 'float',
    defaultNavigationOptions: () => ({
      animationEnabled: false,
    }),
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
