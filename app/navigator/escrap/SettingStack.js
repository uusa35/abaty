import {createStackNavigator} from 'react-navigation-stack';
import SettingsIndexScreen from '../../screens/setting/SettingsIndexScreen';
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
import NormalClassifiedShowScreen from '../../screens/classified/NormalClassifiedShowScreen';
import ProfileClassifiedIndexScreen from '../../screens/classified/ProfileClassifiedIndexScreen';
import ClassifiedEditScreen from '../../screens/classified/ClassifiedEditScreen';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import TextTabBar from '../../components/TextTabBar';
import ContactusScreen from '../../screens/ContactusScreen';

export const SettingStack = createStackNavigator(
  {
    SettingIndex: {
      screen: SettingsIndexScreen,
      navigationOptions: () => ({
        headerLeft: () => <HeaderLeft showSideMenu={false} showCart={false} />,
        headerRight: () => <HeaderRight displayShare={false} />,
        headerTitle: () => <HeaderMiddle title={I18n.t('me')} />,
        headerBackTitle: () => null,
      }),
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: () => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('login')} />,
        headerRight: () => <HeaderRight />,
        headerBackTitle: () => null,
      }),
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: () => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('register')} />,
        headerRight: () => <HeaderRight />,
        headerBackTitle: () => null,
      }),
    },
    UserEdit: {
      screen: UserEditScreen,
      navigationOptions: () => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('edit_information')} />,
        headerRight: () => <HeaderRight />,
        headerBackTitle: () => null,
      }),
    },
    ProfileIndex: {
      screen: ProfileIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderRight />,
        headerBackTitle: () => null,
      }),
      path: `product/:id`,
    },
    ProfileClassifiedIndex: {
      screen: ProfileClassifiedIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderRight />,
        headerBackTitle: () => null,
      }),
    },
    OrderIndex: {
      screen: OrderIndexScreen,
      navigationOptions: () => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('order_history')} />,
        headerRight: null,
        headerBackTitle: () => null,
      }),
      path: `product/:id`,
    },
    FavoriteProductIndex: {
      screen: FavoriteProductIndexScreen,
      navigationOptions: () => ({
        // headerLeft: () => <HeaderLeft  />,
        headerRight: () => <HeaderRight displayShare={false} display={true} />,
        headerTitle: () => <HeaderMiddle title={I18n.t('wishlist')} />,
        headerBackTitle: () => null,
      }),
    },
    Product: {
      screen: NormalProductShow,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => (
          <HeaderRight displayShare={true} showCountry={true} />
        ),
        headerBackTitle: () => null,
      }),
      path: `product/:id`,
    },
    Classified: {
      screen: NormalClassifiedShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => (
          <HeaderRight showCountry={true} showFilter={false} />
        ),
        headerBackTitle: () => null,
        //   headerTransparent: true,
        // headerStyle: {
        // backgroundColor: 'white',
        // borderColor: 'transparent',
        // zIndex: 100
        // }
      }),
      path: `classified/:id`,
    },
    ClassifiedEdit: {
      screen: ClassifiedEditScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => (
          <HeaderRight displayShare={false} showFilter={false} />
        ),
        headerBackTitle: () => null,
      }),
    },
    FavoriteClassifiedIndex: {
      screen: FavoriteClassifiedIndexScreen,
      navigationOptions: () => ({
        // headerLeft: () => <HeaderLeft  />,
        headerRight: () => <HeaderRight displayShare={false} display={true} />,
        headerTitle: () => <HeaderMiddle title={I18n.t('wishlist')} />,
        headerBackTitle: () => null,
      }),
    },
    Contactus: {
      screen: ContactusScreen,
      navigationOptions: () => ({
        headerRight: () => <HeaderRight />,
        headerTitle: () => <HeaderMiddle title={I18n.t('contactus')} />,
        headerBackTitle: () => null,
      }),
      path: 'contactus',
    },
  },
  {
    mode: 'card',
    headerMode: 'screen',
    swipeEnabled: true,
    animation: 'spring',
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

SettingStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
