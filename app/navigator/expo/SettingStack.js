import {createStackNavigator} from 'react-navigation-stack';
import {Icon} from 'react-native-elements';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import React from 'react';
import LoginScreen from '../../screens/auth/LoginScreen';
import RegisterScreen from '../../screens/auth/RegisterScreen';
import UserEditScreen from '../../screens/auth/UserEditScreen';
import ProfileIndexScreen from '../../screens/auth/ProfileIndexScreen';
import OrderIndexScreen from '../../screens/OrderIndexScreen';
import FavoriteProductIndexScreen from '../../screens/product/FavoriteProductIndexScreen';
import FavoriteClassifiedIndexScreen from '../../screens/classified/FavoriteClassifiedIndexScreen';
import NormalProductShow from '../../screens/product/NormalProductShowScreen';
import ClassifiedShowScreen from '../../screens/classified/ClassifiedShowScreen';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import NormalClassifiedShowScreen from '../../screens/classified/NormalClassifiedShowScreen';
import TransparentProductShowScreen from '../../screens/product/TransparentProductShowScreen';
import ExpoSettingsIndexScreen from '../../screens/setting/ExpoSettingsIndexScreen';

export const SettingStack = createStackNavigator(
  {
    SettingIndex: {
      screen: gestureHandlerRootHOC(ExpoSettingsIndexScreen),
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-person" type="ionicon" color={tintColor} />
        ),
        headerLeft: () => <HeaderLeft showSideMenu={true} showCart={true} />,
        headerRight: () => (
          <HeaderRight showFilter={false} showCountry={false} />
        ),
        headerTitle: () => <HeaderMiddle title={I18n.t('me')} />,
        headerBackTitle: null,
      }),
    },
    Login: {
      screen: gestureHandlerRootHOC(LoginScreen),
      navigationOptions: () => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('login')} />,
        headerRight: () => (
          <HeaderRight showFilter={false} showCountry={false} />
        ),
        headerBackTitle: null,
      }),
    },
    Register: {
      screen: gestureHandlerRootHOC(RegisterScreen),
      navigationOptions: () => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('register')} />,
        headerRight: () => (
          <HeaderRight showFilter={false} showCountry={false} />
        ),
        headerBackTitle: null,
      }),
    },
    UserEdit: {
      screen: gestureHandlerRootHOC(UserEditScreen),
      navigationOptions: () => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('edit_information')} />,
        headerRight: () => (
          <HeaderRight showFilter={false} showCountry={false} />
        ),
        headerBackTitle: null,
      }),
    },
    ProfileIndex: {
      screen: gestureHandlerRootHOC(ProfileIndexScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => (
          <HeaderRight showFilter={false} showCountry={false} />
        ),
        headerBackTitle: null,
      }),
      path: `product/:id`,
    },
    OrderIndex: {
      screen: gestureHandlerRootHOC(OrderIndexScreen),
      navigationOptions: () => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('order_history')} />,
        headerRight: () => (
          <HeaderRight showFilter={false} showCountry={false} />
        ),
        headerBackTitle: null,
      }),
      path: `product/:id`,
    },
    FavoriteProductIndex: {
      screen: gestureHandlerRootHOC(FavoriteProductIndexScreen),
      navigationOptions: ({navigation}) => ({
        // headerLeft: () => <HeaderLeft {...navigation} />,
        headerRight: (
          <HeaderRight
            {...navigation}
            displayShare={false}
            showCountry={false}
            showFilter={false}
          />
        ),
        headerTitle: () => <HeaderMiddle title={I18n.t('wishlist')} />,
        headerBackTitle: null,
      }),
    },
    Product: {
      screen: gestureHandlerRootHOC(TransparentProductShowScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: (
          <HeaderRight
            navigation={navigation}
            displayShare={true}
            showCountry={true}
          />
        ),
        headerBackTitle: null,
      }),
      path: `product/:id`,
    },
    Classified: {
      // screen: gestureHandlerRootHOC(ClassifiedShowScreen),
      screen: gestureHandlerRootHOC(NormalClassifiedShowScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: (
          <HeaderRight
            navigation={navigation}
            displayShare={true}
            display={true}
          />
        ),
        headerBackTitle: null,
        //   headerTransparent: true,
        // headerStyle: {
        // backgroundColor: 'white',
        // borderColor: 'transparent',
        // zIndex: 100
        // }
      }),
      path: `classified/:id`,
    },
    FavoriteClassifiedIndex: {
      screen: gestureHandlerRootHOC(FavoriteClassifiedIndexScreen),
      navigationOptions: ({navigation}) => ({
        // headerLeft: () => <HeaderLeft {...navigation} />,
        headerRight: (
          <HeaderRight {...navigation} displayShare={false} display={true} />
        ),
        headerTitle: () => <HeaderMiddle title={I18n.t('wishlist')} />,
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

SettingStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
