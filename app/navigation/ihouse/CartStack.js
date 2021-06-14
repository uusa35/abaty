import React, {useContext} from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import I18n from '../../I18n';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import DesigneratHomeScreen from '../../screens/home/DesigneratHomeScreen';
import CelebrityIndexScreen from '../../screens/celebrity/CelebrityIndexScreen';
import DesineratDesignerShowScreen from '../../screens/designer/DesignerShowScreen';
import ProductShowScreen from '../../screens/product/ProductShowScreen';
import NormalProductShowScreen from '../../screens/product/NormalProductShowScreen';
import ContactusScreen from '../../screens/ContactusScreen';
import ImageZoomWidget from '../../components/widgets/ImageZoomWidget';
import LoginScreen from '../../screens/auth/LoginScreen';
import RegisterScreen from '../../screens/auth/RegisterScreen';
import RoleIndexScreen from '../../screens/role/RoleIndexScreen';
import CategoryIndexScreen from '../../screens/category/CategoryIndexScreen';
import ProductIndexAllScreen from '../../screens/product/ProductIndexAllScreen';
import CartIndexScreen from '../../screens/cart/CartIndexScreen';
import CartConfirmationScreen from '../../screens/cart/CartConfirmationScreen';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {HeaderBack} from '../../components/HeaderBack';

const Stack = createStackNavigator();
const CartStack = () => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <Stack.Navigator
      screenOptions={{
        // headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: colors.header_theme_bg,
        },
        headerTitleStyle: {
          color: colors.header_theme_color,
        },
      }}>
      <Stack.Screen
        name="CartIndex"
        headerBackTitleVisible={false}
        component={CartIndexScreen}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.header_theme_bg,
          },
          headerTitleStyle: {
            color: colors.header_theme_color,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default CartStack;
