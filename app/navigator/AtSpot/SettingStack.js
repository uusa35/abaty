import {createStackNavigator} from 'react-navigation-stack';
import {Icon} from 'react-native-elements';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import React from 'react';
import MallrSettingsIndexScreen from '../../screens/mallr/MallrSettingsIndexScreen';
import MallrAccountScreen from '../../screens/mallr/MallrAccountScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import RegisterScreen from '../../screens/auth/RegisterScreen';
import UserEditScreen from '../../screens/auth/UserEditScreen';
import ProductIndexScreen from '../../screens/product/ProductIndexScreen';
import ProductShowScreen from '../../screens/product/ProductShowScreen';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import SearchProductIndexScreen from '../../screens/product/SearchProductIndexScreen';

export const SettingStack = createStackNavigator(
  {
    Account: {
      screen: gestureHandlerRootHOC(MallrAccountScreen),
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-person" type="ionicon" color={tintColor} />
        ),
        headerLeft: <HeaderLeft />,
        headerRight: <HeaderRight display={true} />,
        headerTitle: <HeaderMiddle title={I18n.t('me')} />,
        headerBackTitle: null,
      }),
    },
    Login: {
      screen: gestureHandlerRootHOC(LoginScreen),
      navigationOptions: () => ({
        headerTitle: <HeaderMiddle title={I18n.t('login')} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null,
      }),
    },
    Register: {
      screen: gestureHandlerRootHOC(RegisterScreen),
      navigationOptions: () => ({
        headerTitle: <HeaderMiddle title={I18n.t('register')} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null,
      }),
    },
    UserEdit: {
      screen: gestureHandlerRootHOC(UserEditScreen),
      navigationOptions: () => ({
        headerTitle: <HeaderMiddle title={I18n.t('edit_information')} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null,
      }),
    },
    ProductIndex: {
      screen: gestureHandlerRootHOC(ProductIndexScreen),
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft />,
        headerRight: <HeaderRight displayShare={false} display={true} />,
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerBackTitle: null,
      }),
    },
    SearchProductIndex: {
      screen: gestureHandlerRootHOC(SearchProductIndexScreen),
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft  />,
        headerRight: <HeaderRight showCountry={true} />,
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerBackTitle: null,
      }),
    },
    Product: {
      screen: gestureHandlerRootHOC(ProductShowScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight displayShare={true} display={true} />,
        headerBackTitle: null,
      }),
      path: `product/:id`,
    },
  },
  {
    mode: 'card',
    headerMode: 'screen',
    swipeEnabled: false,
  },
);