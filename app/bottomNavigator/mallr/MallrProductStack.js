import {createStackNavigator, createSwitchNavigator} from 'react-navigation';
import ProductIndexAllScreen from '../../screens/ProductIndexAllScreen';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import ProductShowScreen from '../../screens/ProductShowScreen';
import React from 'react';

export const MallrProductStack = createStackNavigator(
  {
    ProductIndexAll: {
      screen: ProductIndexAllScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        headerTitle: <HeaderMiddle title={I18n.t('products')} />,
        headerBackTitle: null
      })
    },
    Product: {
      screen: ProductShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: (
          <HeaderRight
            navigation={navigation}
            displayShare={true}
            display={true}
          />
        ),
        headerBackTitle: null
      }),
      path: `product/:id`
    }
  },
  {
    mode: 'card',
    headerMode: 'screen'
  }
);

MallrProductStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};
