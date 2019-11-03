import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Icon} from 'react-native-elements';
import {HeaderLeft} from './../../components/HeaderLeft';
import {HeaderRight} from './../../components/HeaderRight';
import {navLabelStyle} from '../../globalStyles';
import {text} from '../../constants';
import {HomeStack} from './HomeStack';
import {VideoStack} from './VideoStack';
import {SettingStack} from './SettingStack';
import {SearchStack} from './SearchStack';
import {ProductStack} from './ProductStack';
import {ServiceStack} from './ServiceStack';
import I18n from '../../I18n';

export const BottomTabsStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon
            size={text.xlarge}
            name="home"
            type="octicon"
            color={tintColor}
          />
        ),
        title: I18n.t('home'),
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
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="play-video"
            type="foundation"
            size={text.xlarge}
            color={tintColor}
          />
        ),
        title: I18n.t('videos'),
      }),
    },
    Setting: {
      screen: SettingStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon
            size={text.xlarge}
            name="ios-person"
            type="ionicon"
            color={tintColor}
          />
        ),
        title: I18n.t('me'),
        headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        // headerTitle: <HeaderMiddle title={I18n.t('home')}/>,
      }),
    },
    Search: {
      screen: SearchStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon
            size={text.xlarge}
            name="ios-search"
            type="ionicon"
            color={tintColor}
          />
        ),
        title: I18n.t('search'),
      }),
    },
    ProductIndexAll: {
      screen: ProductStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon
            size={text.xlarge}
            name="sort-by-alpha"
            type="material-icon"
            color={tintColor}
          />
        ),
        title: I18n.t('all_products'),
      }),
    },
    ServiceIndexAll: {
      screen: ServiceStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="customerservice"
            type="antdesign"
            size={text.xlarge}
            color={tintColor}
          />
        ),
        title: I18n.t('services'),
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
