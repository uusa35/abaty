import {createStackNavigator} from 'react-navigation';
import BrandIndexScreen from '../../screens/BrandIndexScreen';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import BrandShowScreen from '../../screens/BrandShowScreen';
import HeaderCustom from '../../components/HeaderCustom';
import ProductIndexScreen from '../../screens/ProductIndexScreen';
import {HeaderRight} from '../../components/HeaderRight';
import ProductShowScreen from '../../screens/ProductShowScreen';
import React from 'react';

export const AbatiBrandStack = createStackNavigator(
  {
    BrandIndex: {
      screen: BrandIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: <HeaderLeft {...navigation} />,
        headerTitle: <HeaderMiddle title={I18n.t('brands')} />,
        headerBackTitle: null
      })
    },
    BrandShow: {
      screen: BrandShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderCustom navigation={navigation} />,
        headerBackTitle: null
      })
    },
    ProductIndex: {
      screen: ProductIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
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
    headerMode: 'float'
  }
);

AbatiBrandStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};