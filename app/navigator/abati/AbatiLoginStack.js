import {createStackNavigator} from 'react-navigation';
import CategoryIndexScreen from '../../screens/CategoryIndexScreen';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import validate from 'validate.js';
import I18n from '../../I18n';
import ProductIndexScreen from '../../screens/ProductIndexScreen';
import {HeaderRight} from '../../components/HeaderRight';
import NormalProductShowScreen from '../../screens/NormalProductShowScreen';
import SubCategoryIndexScreen from '../../screens/SubCategoryIndexScreen';
import React from 'react';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import UserEditScreen from '../../screens/UserEditScreen';
import AbatiHomeScreen from '../../screens/abati/AbatiHomeScreen';
import {HeaderLeft} from '../../components/HeaderLeft';

export const AbatiLoginStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('login')} />,
        headerRight: <HeaderRight display={false} />
      })
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('register')} />,
        headerRight: <HeaderRight display={false} />
        // headerBackTitle: null
      })
    },
    UserEdit: {
      screen: UserEditScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('edit_information')} />,
        headerRight: <HeaderRight display={false} />
        // headerBackTitle: null
      })
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
    swipeEnabled: false,
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01
    }
  }
);

AbatiLoginStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible: false
  };
};
