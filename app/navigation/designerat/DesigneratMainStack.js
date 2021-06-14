import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import DesigneratMainTab from './MainTab';
import SideMenu from '../components/SideMenu';
import {useNetInfo} from '@react-native-community/netinfo';
import {useDispatch} from 'react-redux';
import {appBootstrap} from '../redux/actions';
import AppContainer from '../components/containers/AppContainer';
import AccountStack from './designerat/AccountStack';
import CelebrityIndexScreen from '../screens/celebrity/CelebrityIndexScreen';
import {HeaderMiddle} from '../components/HeaderMiddle';
import DesineratDesignerShowScreen from '../screens/designer/DesignerShowScreen';
import {HeaderRight} from '../components/HeaderRight';
import NormalProductShowScreen from '../screens/product/NormalProductShowScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import I18n from '../I18n';
import RegisterScreen from '../screens/auth/RegisterScreen';
import RoleIndexScreen from '../screens/role/RoleIndexScreen';
import ImageZoomWidget from '../components/widgets/ImageZoomWidget';
import ContactusScreen from '../screens/ContactusScreen';
import HomeStack from './designerat/HomeStack';
import CategoryStack from './designerat/CategoryStack';
import AccountStackk from './designerat/AccountStack';
import CartStack from './designerat/CartStack';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DesigneratMainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // header: null,
        tabBarVisible: true,
      }}></Stack.Navigator>
  );
};

export default DesigneratMainStack;
