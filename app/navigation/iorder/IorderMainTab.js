import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerActions} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
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
import IorderHomeScreen from '../../screens/home/IorderHomeScreen';
import IconTabBar from '../../components/IconTabBar';
import ContactusScreen from '../../screens/ContactusScreen';
import PageOneScreen from '../../screens/PageOneScreen';
import ExpoSettingsIndexScreen from '../../screens/setting/ExpoSettingsIndexScreen';
import CategoryIndexCollapseScreen from '../../screens/category/CategoryIndexCollapseScreen';
import {iconSizes} from '../../constants/sizes';

const MaterialTab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const IorderMainTab = () => {
  const {colors, cartLength} = useContext(GlobalValuesContext);
  return (
    <Tab.Navigator
      laze={false}
      initialRouteName="Home"
      activeBackgroundColor="black"
      inActiveBackgroundColor="black"
      backBehavior="history"
      tabBarOptions={{
        style: {
          backgroundColor: colors.footer_bg_theme_color,
        },
        activeBackgroundColor: colors.footer_bg_theme_color,
        inactiveBackgroundColor: colors.footer_bg_theme_color,
      }}
      activeColor={colors.footer_theme_color}
      inactiveColor="white"
      shifting={true}
      labeled={true}>
      <Tab.Screen
        name="Home"
        component={IorderHomeScreen}
        options={() => ({
          tabBarLabel: ({focused}) => (
            <TextTabBar
              showLabel={true}
              title={I18n.t('home')}
              focused={focused}
            />
          ),
          tabBarIcon: ({focused}) => (
            <FastImage
              source={icons.homeThree}
              style={{width: iconSizes.smaller, height: iconSizes.smaller}}
              tintColor={
                focused ? colors.btn_bg_theme_color : colors.footer_theme_color
              }
              resizeMode="contain"
            />
          ),
          tabBarVisible: true,
        })}
        headerLeft={({navigation}) => (
          <Icon
            menu="menu"
            type="feather"
            size={25}
            style={[{color: 'black'}]}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        )}
      />
      <Tab.Screen
        name="CartTab"
        component={DesigneratCartIndexScreen}
        options={({route}) => ({
          tabBarLabel: ({focused}) => (
            <TextTabBar
              showLabel={true}
              title={I18n.t('cart')}
              focused={focused}
            />
          ),
          tabBarIcon: ({focused}) => (
            <FastImage
              source={icons.cartFive}
              style={{width: iconSizes.smaller, height: iconSizes.smaller}}
              tintColor={
                focused ? colors.btn_bg_theme_color : colors.footer_theme_color
              }
              resizeMode="contain"
            />
          ),
          tabBarBadge: cartLength ? cartLength : null,
          tabBarBadgeStyle: {
            backgroundColor: colors.btn_bg_theme_color,
            color: colors.footer_theme_color,
          },
        })}
      />
      <Tab.Screen
        name="CategoryTab"
        component={CategoryIndexCollapseScreen}
        options={({}) => ({
          tabBarLabel: ({focused}) => (
            <TextTabBar
              showLabel={true}
              title={I18n.t('sections')}
              focused={focused}
            />
          ),
          tabBarIcon: ({focused}) => (
            <FastImage
              source={icons.categoriesSecond}
              style={{width: iconSizes.smaller, height: iconSizes.smaller}}
              tintColor={
                focused ? colors.btn_bg_theme_color : colors.footer_theme_color
              }
              resizeMode="contain"
            />
          ),
        })}
      />
      <Tab.Screen
        name="SettingTab"
        component={ExpoSettingsIndexScreen}
        options={() => ({
          tabBarLabel: ({focused}) => (
            <TextTabBar
              showLabel={true}
              title={I18n.t('my_account')}
              focused={focused}
            />
          ),
          tabBarIcon: ({focused}) => (
            <FastImage
              source={icons.userThree}
              style={{width: iconSizes.smaller, height: iconSizes.smaller}}
              tintColor={
                focused ? colors.btn_bg_theme_color : colors.footer_theme_color
              }
              resizeMode="contain"
            />
          ),
        })}
      />
      <Tab.Screen
        name="Contactus"
        component={ContactusScreen}
        options={() => ({
          tabBarLabel: ({focused}) => (
            <TextTabBar
              showLabel={true}
              title={I18n.t('contactus')}
              focused={focused}
            />
          ),
          tabBarIcon: ({focused}) => (
            <FastImage
              source={icons.contactus}
              style={{width: iconSizes.smaller, height: iconSizes.smaller}}
              tintColor={
                focused ? colors.btn_bg_theme_color : colors.footer_theme_color
              }
              resizeMode="contain"
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default IorderMainTab;
