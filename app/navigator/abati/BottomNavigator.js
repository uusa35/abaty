import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {HeaderLeft} from './../../components/HeaderLeft';
import {HeaderRight} from './../../components/HeaderRight';
import {navLabelStyle} from '../../globalStyles';
import {text} from '../../constants/sizes';
import {HomeStack} from './HomeStack';
import {VideoStack} from './VideoStack';
import {SettingStack} from './SettingStack';
import {ProductStack} from './ProductStack';
import {ServiceStack} from './ServiceStack';
import I18n from '../../I18n';
import IconTabBar from '../../components/IconTabBar';
import TextTabBar from '../../components/TextTabBar';

export const BottomTabsStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar
            focused={focused}
            name="home"
            type="octicon"
            showLabel={true}
          />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar
            title={I18n.t('home')}
            focused={focused}
            showLabel={true}
          />
        ),
      }),
    },
    // CategoryIndexScreen: {
    //   screen: AbatiCategoryStack,
    //   navigationOptions: () => ({
    //     tabBarIcon: ({tintColor}) => (
    //       <Icon
    //           size={text.xlarge}
    //           name="layers" type="simplelineicons" color={tintColor} />
    //     ),
    //     // title: I18n.t('categories')
    //   })
    // },
    VideoIndexAll: {
      screen: VideoStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar
            focused={focused}
            name="play-video"
            type="foundation"
            showLabel={true}
          />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar
            title={I18n.t('videos')}
            focused={focused}
            showLabel={true}
          />
        ),
      }),
    },
    Setting: {
      screen: SettingStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar
            name="person"
            type="fontisto"
            focused={focused}
            showLabel={true}
          />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('me')} focused={focused} showLabel={true} />
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
          <IconTabBar
            focused={focused}
            name="sort-by-alpha"
            type="material-icon"
            showLabel={true}
          />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar
            title={I18n.t('all_products')}
            focused={focused}
            showLabel={true}
          />
        ),
      }),
    },
    ServiceIndexAll: {
      screen: ServiceStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar
            focused={focused}
            name="customerservice"
            type="antdesign"
            showLabel={true}
          />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar
            title={I18n.t('services')}
            focused={focused}
            showLabel={true}
          />
        ),
      }),
    },
  },
  {
    tabBarOptions: {
      lazy: false,
      backBehavior: 'order',
      showIcon: true,
      showLabel: true,
      scrollEnabled: true,
      allowFontScaling: true,
      activeTintColor: '#ddca21',
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
    order: [
      'Home',
      'ProductIndexAll',
      'VideoIndexAll',
      'ServiceIndexAll',
      'Setting',
    ],
  },
);
