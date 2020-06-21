import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import I18n from '../../I18n';
import {HeaderRight} from '../../components/HeaderRight';
import LoginScreen from '../../screens/auth/LoginScreen';
import RegisterScreen from '../../screens/auth/RegisterScreen';
import UserEditScreen from '../../screens/auth/UserEditScreen';
import {first} from 'lodash';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

export const LoginStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerTitle: () => <HeaderMiddle title={I18n.t('login')} />,
        headerRight: () => <HeaderRight />,
        headerBackTitle: () => null,
      },
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
  },
  {
    mode: 'modal',
    headerMode: 'none',
    swipeEnabled: false,
    animation: first(['spring', 'timing']),
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

LoginStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible: false,
  };
};
