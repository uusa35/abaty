import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createSwitchNavigator} from 'react-navigation';
import {HeaderLeft} from './../../components/HeaderLeft';
import {HeaderRight} from './../../components/HeaderRight';
import {navLabelStyle} from '../../globalStyles';
import {text} from '../../constants/sizes';
import {HomeStack} from './HomeStack';
import {VideoStack} from './VideoStack';
import {SettingStack} from './SettingStack';
import {SearchStack} from './SearchStack';
import {ProductStack} from './ProductStack';
import {ServiceStack} from './ServiceStack';
import I18n from '../../I18n';
import IconTabBar from '../../components/IconTabBar';
import TextTabBar from '../../components/TextTabBar';

export const BottomTabsStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar focused={focused} name="home" type="octicon" />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('home')} focused={focused} />
        ),
      }),
    },
    // CategoryIndexScreen: {
    //   screen: AbatiCategoryStack,
    //   navigationOptions: ({navigation}) => ({
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
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar focused={focused} name="play-video" type="foundation" />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('videos')} focused={focused} />
        ),
      }),
    },
    Setting: {
      screen: SettingStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar focused={focused} name="ios-person" type="ionicon" />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('me')} focused={focused} />
        ),
        headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        // headerTitle: <HeaderMiddle title={I18n.t('home')}/>,
      }),
    },
    Search: {
      screen: SearchStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar focused={focused} name="ios-search" type="ionicon" />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('search')} focused={focused} />
        ),
      }),
    },
    ProductIndexAll: {
      screen: ProductStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar
            focused={focused}
            name="sort-by-alpha"
            type="material-icon"
          />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('all_products')} focused={focused} />
        ),
      }),
    },
    ServiceIndexAll: {
      screen: ServiceStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar
            focused={focused}
            name="customerservice"
            type="antdesign"
          />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('services')} focused={focused} />
        ),
      }),
    },
  },
  {
    tabBarOptions: {
      lazy: false,
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
    order: [
      // 'CategoryIndexScreen',
      'Home',
      'ProductIndexAll',
      'VideoIndexAll',
      'ServiceIndexAll',
      'Setting',
    ],
  },
);
