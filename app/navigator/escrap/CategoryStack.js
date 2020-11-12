import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import validate from 'validate.js';
import I18n from '../../I18n';
import ProductIndexScreen from '../../screens/product/ProductIndexScreen';
import {HeaderRight} from '../../components/HeaderRight';
import SubCategoryIndexScreen from '../../screens/category/SubCategoryIndexScreen';
import ParentCategoryIndexScreen from '../../screens/category/ParentCategoryIndexScreen';
import {HeaderLeft} from '../../components/HeaderLeft';
import ChildrenCategoryIndexScreen from '../../screens/category/ChildrenCategoryIndexScreen';
import CompanyIndexScreen from '../../screens/company/CompanyIndexScreen';
import HeaderCustom from '../../components/HeaderCustom';
import EscrapCompanyShowScreen from '../../screens/company/EscrapCompanyShowScreen';
import {isIOS} from '../../constants';
import {APP_CASE} from '../../../app';

export const CategoryStack = createStackNavigator(
  {
    CategoryIndex: {
      screen: ParentCategoryIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: () => <HeaderLeft showSideMenu={false} showCart={false} />,
        headerRight: () => (
          <HeaderRight showFilter={false} showCountry={false} />
        ),
        headerTitle: (
          <HeaderMiddle
            title={
              !validate.isEmpty(navigation.state.params.name)
                ? navigation.state.params.name
                : I18n.t('categories')
            }
          />
        ),
        headerBackTitle: () => null,
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
        // headerLeft: () => <HeaderLeft {...navigation} />,
        headerRight: () => <HeaderRight {...navigation} display={true} />,
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerBackTitle: () => null,
      }),
    },
    SubCategoryIndex: {
      screen: SubCategoryIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderRight showHome={true} />,
        headerBackTitle: () => null,
      }),
    },
    ChildrenCategoryIndex: {
      screen: ChildrenCategoryIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderRight showHome={true} />,
        headerBackTitle: () => null,
      }),
    },
    CompanyIndex: {
      screen: CompanyIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderRight showHome={true} />,
        headerBackTitle: () => null,
      }),
    },
    CompanyShow: {
      screen: EscrapCompanyShowScreen,
      navigationOptions: () => ({
        headerTitle: () => null,
        headerRight: () => <HeaderCustom />,
        headerBackTitle: () => null,
      }),
      path: `user/:id`,
    },
  },
  {
    mode: 'card',
    headerMode: 'screen',
    defaultNavigationOptions: () => ({
      // headerStyle: {
      //   backgroundColor: 'green'
      // }
      headerTransparent: false,
      animationEnabled: false,
    }),
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
