import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {HeaderLeft} from './../../components/HeaderLeft';
import {HeaderRight} from './../../components/HeaderRight';
import {navLabelStyle} from '../../globalStyles';
import {text} from '../../constants/sizes';
import {HomeStack} from './HomeStack';
import {SettingStack} from './SettingStack';
import I18n from '../../I18n';
import {ClassifiedStack} from './ClassifiedStack';
import {CategoryStack} from './CategoryStack';
import IconTabBar from '../../components/IconTabBar';
import TextTabBar from '../../components/TextTabBar';
import {FavoriteStack} from '../escrap/FavoriteStack';

export const BottomTabsStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar focused={focused} name="home" type="octicon" />
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
          <IconTabBar focused={focused} name="layers" type="simplelineicons" />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('categories')} focused={focused} />
        ),
      }),
    },
    Setting: {
      screen: SettingStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar focused={focused} name="person" type="fontisto" />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('me')} focused={focused} />
        ),
        headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight display={true} />,
        // headerTitle: () => <HeaderMiddle title={I18n.t('home')}/>,
      }),
    },
    Favorite: {
      screen: FavoriteStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar focused={focused} name="star" type="entypo" />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('favorites')} focused={focused} />
        ),
      }),
    },
    ClassifiedIndexAll: {
      screen: ClassifiedStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar focused={focused} name="news" type="entypo" />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('classifieds')} focused={focused} />
        ),
      }),
    },
  },
  {
    tabBarOptions: {
      lazy: false,
      backBehavior: 'order',
      showIcon: true,
      showLabel: false,
      scrollEnabled: true,
      allowFontScaling: true,
      activeTintColor: '#DD0900',
      inactiveTintColor: '#b2b2b2',
      activeBackgroundColor: 'white',
      labelStyle: [navLabelStyle, {fontFamily: text.font}],
      style: {
        backgroundColor: 'white',
      },
    },
    navigationOptions: {
      tabBarVisible: true,
    },
    initialRouteName: 'Home',
    order: ['Home', 'CategoryIndexScreen', 'Favorite', 'Setting'],
  },
);
