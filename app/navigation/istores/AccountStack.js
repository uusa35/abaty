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
import SettingsIndexScreen from '../../screens/setting/SettingsIndexScreen';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const Stack = createStackNavigator();

const AccountStackk = () => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: colors.header_theme_bg,
        },
        headerTitleStyle: {
          color: colors.header_theme_color,
        },
      }}>
      <Stack.Screen
        name="SettingIndex"
        headerBackTitleVisible={false}
        component={SettingsIndexScreen}
        options={{
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.header_theme_bg,
          },
          headerTitleStyle: {
            color: colors.header_theme_color,
          },
          headerRight: () => (
            <HeaderRight
              showCart={false}
              showProductsSearch={true}
              showProductFavorite={true}
            />
          ),
          headerLeft: () => <HeaderLeft />,
          headerTitle: () => (
            <HeaderMiddle title={I18n.t('market')} showLogo={true} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default AccountStackk;
