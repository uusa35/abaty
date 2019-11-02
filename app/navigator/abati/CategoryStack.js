import React from 'react';
import {createStackNavigator} from 'react-navigation';
import CategoryIndexScreen from '../../screens/CategoryIndexScreen';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import validate from 'validate.js';
import I18n from '../../I18n';
import ProductIndexScreen from '../../screens/ProductIndexScreen';
import {HeaderRight} from '../../components/HeaderRight';
import NormalProductShowScreen from '../../screens/product/NormalProductShowScreen';
import SubCategoryIndexScreen from '../../screens/category/SubCategoryIndexScreen';

export const CategoryStack = createStackNavigator(
  {
    CategoryIndex: {
      screen: CategoryIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerTitle: (
          <HeaderMiddle
            title={
              !validate.isEmpty(navigation.state.params.name)
                ? navigation.state.params.name
                : I18n.t('categories')
            }
          />
        ),
        headerBackTitle: null,
        headerTransparent: true,
      }),
      params: {
        category: null,
        showMainCategory: true,
      },
      path: 'category/:id',
    },
    ProductIndex: {
      screen: ProductIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerBackTitle: null,
      }),
    },
    Product: {
      screen: NormalProductShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: (
          <HeaderRight
            navigation={navigation}
            displayShare={true}
            display={true}
          />
        ),
        headerTransparent: true,
        headerBackTitle: null,
      }),
      path: `product/:id`,
    },
    SubCategoryIndex: {
      screen: SubCategoryIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null,
      }),
    },
  },
  {
    mode: 'card',
    headerMode: 'float',
  },
);

CategoryStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};