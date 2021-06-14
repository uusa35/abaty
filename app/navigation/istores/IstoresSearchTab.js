import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements';
import I18n from '../../I18n';
import TextTabBar from '../../components/TextTabBar';
import ProductIndexAllScreen from '../../screens/product/ProductIndexAllScreen';
import DesigneratSettingsIndexScreen from '../../screens/setting/DesigneratSettingsIndexScreen';
import DesigneratHomeScreen from '../../screens/home/DesigneratHomeScreen';
import CategoryIndexScreen from '../../screens/category/CategoryIndexScreen';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import DesigneratCartIndexScreen from '../../screens/cart/DesigneratCartIndexScreen';
import {icons} from '../../constants/images';
import ExpoHomeScreen from '../../screens/home/ExpoHomeScreen';
import IconTabBar from '../../components/IconTabBar';
import PageOneScreen from '../../screens/PageOneScreen';
import PageTwoScreen from '../../screens/PageTwoScreen';
import PageThreeScreen from '../../screens/PageThreeScreen';
import PageFourScreen from '../../screens/PageFourScreen';
import {text} from '../../constants/sizes';

const Tab = createMaterialTopTabNavigator();

const IstoresSearchTab = () => {
  const {colors, cartLength} = useContext(GlobalValuesContext);
  return (
    <Tab.Navigator
      laze={true}
      initialRouteName="Home"
      backBehavior="history"
      tabBarOptions={{
        labelStyle: {
          fontFamily: text.font,
        },

        style: {
          backgroundColor: colors.header_theme_bg,
          borderBottomWidth: 0.5,
          borderColor: colors.btn_bg_theme_color,
        },
        indicatorStyle: {
          backgroundColor: colors.btn_bg_theme_color,
        },
        activeTintColor: colors.btn_bg_theme_color,
        inactiveTintColor: colors.header_theme_color,
      }}
      shifting={false}
      labeled={false}>
      <Tab.Screen
        name="PageTwo"
        component={PageTwoScreen}
        options={({}) => ({
          tabBarLabel: I18n.t('products'),
          tabBarIcon: ({focused}) => (
            <IconTabBar
              focused={focused}
              name="layers"
              type="simplelineicons"
            />
          ),
        })}
      />
      <Tab.Screen
        name="PageThree"
        component={PageThreeScreen}
        options={() => ({
          tabBarLabel: I18n.t('istores.stores'),
          tabBarIcon: <IconTabBar focused={true} name="shop" type="entypo" />,
        })}
      />
    </Tab.Navigator>
  );
};

export default IstoresSearchTab;
