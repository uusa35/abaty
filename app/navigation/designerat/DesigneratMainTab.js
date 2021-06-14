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

const MaterialTab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DesigneratMainTab = () => {
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
        component={DesigneratHomeScreen}
        options={() => ({
          tabBarLabel: ({focused}) => (
            <TextTabBar
              showLabel={true}
              title={I18n.t('designers')}
              focused={focused}
            />
          ),
          tabBarIcon: ({focused}) => (
            <FastImage
              source={icons.designerat}
              resizeMode="contain"
              style={{width: 25, height: 25}}
              tintColor={
                focused ? colors.btn_bg_theme_color : colors.footer_theme_color
              }
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
        name="CategoryTab"
        component={CategoryIndexScreen}
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
              source={icons.hanger}
              resizeMode="contain"
              style={{width: 25, height: 25}}
              tintColor={
                focused ? colors.btn_bg_theme_color : colors.footer_theme_color
              }
            />
          ),
        })}
      />
      <Tab.Screen
        name="ProductTab"
        component={ProductIndexAllScreen}
        options={() => ({
          tabBarLabel: ({focused}) => (
            <TextTabBar
              showLabel={true}
              title={I18n.t('market')}
              focused={focused}
            />
          ),
          tabBarIcon: ({focused}) => (
            <FastImage
              source={icons.compass}
              resizeMode="contain"
              style={{width: 25, height: 25}}
              tintColor={
                focused ? colors.btn_bg_theme_color : colors.footer_theme_color
              }
            />
          ),
        })}
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
              source={icons.cart}
              resizeMode="contain"
              style={{width: 25, height: 25}}
              tintColor={
                focused ? colors.btn_bg_theme_color : colors.footer_theme_color
              }
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
        name="SettingTab"
        component={DesigneratSettingsIndexScreen}
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
              source={icons.profile}
              resizeMode="contain"
              style={{width: 25, height: 25}}
              tintColor={
                focused ? colors.btn_bg_theme_color : colors.footer_theme_color
              }
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default DesigneratMainTab;
