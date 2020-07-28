import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Icon} from 'react-native-elements';
import I18n from '../../I18n';
import {HeaderLeft} from './../../components/HeaderLeft';
import {HeaderRight} from './../../components/HeaderRight';
import {navLabelStyle} from '../../globalStyles';
import {iconSizes, text} from '../../constants/sizes';
import {HomeStack} from './HomeStack';
import {CategoryStack} from './CategoryStack';
import {VideoStack} from './VideoStack';
import {SettingStack} from './SettingStack';
import {SearchStack} from './SearchStack';
import {ProductStack} from './ProductStack';
import TextTabBar from '../../components/TextTabBar';
import IconTabBar from '../../components/IconTabBar';

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
          <IconTabBar name="layers" type="simplelineicons" focused={focused} />
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
          <IconTabBar name="person" type="fontisto" focused={focused} />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('me')} focused={focused} />
        ),
        headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight display={true} />,
        // headerTitle: () => <HeaderMiddle title={I18n.t('home')}/>,
        headerBackTitle: () => null,
      }),
    },
    Search: {
      screen: SearchStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar
            name="search1"
            type="antdesign"
            focused={focused}
            size={iconSizes.smaller}
          />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('search')} focused={focused} />
        ),
      }),
    },
  },
  {
    tabBarOptions: {
      lazy: false,
      backBehavior: 'order',
      showIcon: true,
      scrollEnabled: true,
      allowFontScaling: true,
      activeTintColor: 'black',
      // activeTintColor: '#ddca21',
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
    order: ['Home', 'CategoryIndexScreen', 'Search', 'Setting'],
  },
);
