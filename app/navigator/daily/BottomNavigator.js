import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {HeaderLeft} from './../../components/HeaderLeft';
import {HeaderRight} from './../../components/HeaderRight';
import {navLabelStyle} from '../../globalStyles';
import {iconSizes, text} from '../../constants/sizes';
import {HomeStack} from './HomeStack';
import {SettingStack} from './SettingStack';
import {ProductStack} from './ProductStack';
import I18n from '../../I18n';
import IconTabBar from '../../components/IconTabBar';
import TextTabBar from '../../components/TextTabBar';
import CategoryIndexScreen from '../../screens/category/CategoryIndexScreen';
import {CategoryStack} from './CategoryStack';

export const BottomTabsStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar focused={focused} name="home" type="feather" />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('home')} focused={focused} />
        ),
      }),
    },
    CategoryIndexScreen: {
      screen: CategoryStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar
            size={iconSizes.medium}
            name="briefcase-search-outline"
            type="material-community"
            focused={focused}
          />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('categories')} focused={focused} />
        ),
      }),
    },
    // VideoIndexAll: {
    //   screen: VideoStack,
    //   navigationOptions: () => ({
    //     tabBarIcon: ({focused}) => (
    //       <IconTabBar focused={focused} name="play-video" type="foundation" />
    //     ),
    //     tabBarLabel: ({focused}) => (
    //       <TextTabBar title={I18n.t('videos')} focused={focused} />
    //     ),
    //   }),
    // },
    Setting: {
      screen: SettingStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar name="torso-female" type="foundation" focused={focused} />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('me')} focused={focused} />
        ),
        headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight display={true} />,
        // headerTitle: () => <HeaderMiddle title={I18n.t('home')}/>,
      }),
    },
    // Search: {
    //   screen: SearchStack,
    //   navigationOptions: () => ({
    //     tabBarIcon: ({focused}) => (
    //       <IconTabBar focused={focused} name="ios-search" type="ionicon" />
    //     ),
    //     tabBarLabel: ({focused}) => (
    //       <TextTabBar title={I18n.t('search')} focused={focused} />
    //     ),
    //   }),
    // },
    ProductIndexAll: {
      screen: ProductStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar focused={focused} name="female" type="font-awesome" />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('all_products')} focused={focused} />
        ),
      }),
    },
    // ServiceIndexAll: {
    //   screen: ServiceStack,
    //   navigationOptions: () => ({
    //     tabBarIcon: ({focused}) => (
    //       <IconTabBar
    //         focused={focused}
    //         name="customerservice"
    //         type="antdesign"
    //       />
    //     ),
    //     tabBarLabel: ({focused}) => (
    //       <TextTabBar title={I18n.t('services')} focused={focused} />
    //     ),
    //   }),
    // },
  },
  {
    tabBarOptions: {
      lazy: true,
      showIcon: true,
      showLabel: true,
      scrollEnabled: true,
      allowFontScaling: true,
      activeTintColor: '#ddca21',
      inactiveTintColor: '#b2b2b2',
      activeBackgroundColor: 'white',
      animationEnabled: true,
      labelStyle: [navLabelStyle, {fontFamily: text.font}],
      style: {
        backgroundColor: 'white',
      },
    },
    navigationOptions: {
      tabBarVisible: true,
    },
    initialRouteName: 'Home',
    order: ['Home', 'ProductIndexAll', 'CategoryIndexScreen', 'Setting'],
  },
);
