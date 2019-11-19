import {createStackNavigator} from 'react-navigation-stack';
import SettingsIndexScreen from '../../screens/SettingsIndexScreen';
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

export const SettingStack = createStackNavigator(
  {
    SettingIndex: {
      screen: SettingsIndexScreen,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-person" type="ionicon" color={tintColor} />
        ),
        headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        headerTitle: <HeaderMiddle title={I18n.t('me')} />,
        headerBackTitle: null,
      }),
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('login')} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null,
      }),
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('register')} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null,
      }),
    },
    UserEdit: {
      screen: UserEditScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('edit_information')} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null,
      }),
    },
    ProfileIndex: {
      screen: ProfileIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: null,
        headerBackTitle: null,
      }),
      path: `product/:id`,
    },
    OrderIndex: {
      screen: OrderIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('order_history')} />,
        headerRight: null,
        headerBackTitle: null,
      }),
      path: `product/:id`,
    },
    FavoriteProductIndex: {
      screen: FavoriteProductIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerRight: (
          <HeaderRight {...navigation} displayShare={false} display={true} />
        ),
        headerTitle: <HeaderMiddle title={I18n.t('wishlist')} />,
        headerBackTitle: null,
      }),
    },
    Product: {
      screen: NormalProductShow,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
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
      screen: ClassifiedShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
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
      screen: FavoriteClassifiedIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerRight: (
          <HeaderRight {...navigation} displayShare={false} display={true} />
        ),
        headerTitle: <HeaderMiddle title={I18n.t('wishlist')} />,
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
