import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';
import I18n from '../../I18n';
import {HeaderLeft} from './../../components/HeaderLeft';
import {HeaderRight} from './../../components/HeaderRight';
import {navLabelStyle} from '../../globalStyles';
import {text} from '../../constants';
import {HomeStack} from './HomeStack';
import {CategoryStack} from './CategoryStack';
import {VideoStack} from './VideoStack';
import {SettingStack} from './SettingStack';
import {SearchStack} from './SearchStack';
import {ProductStack} from './ProductStack';

export const BottomTabsStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="home" type="octicon" color={tintColor} />
        ),
        title: I18n.t('home')
      })
    },
    CategoryIndexScreen: {
      screen: CategoryStack,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="layers" type="simplelineicons" color={tintColor} />
        ),
        title: I18n.t('categories')
      })
    },
    VideoIndexAll: {
      screen: VideoStack,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="play-video"
            type="foundation"
            size={30}
            color={tintColor}
          />
        ),
        title: I18n.t('videos')
      })
    },
    Setting: {
      screen: SettingStack,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-person" type="ionicon" color={tintColor} />
        ),
        title: I18n.t('me'),
        headerLeft: <HeaderLeft />,
        headerRight: <HeaderRight display={true} />,
        // headerTitle: <HeaderMiddle title={I18n.t('home')}/>,
        headerBackTitle: null
      })
    },
    Search: {
      screen: SearchStack,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-search" type="ionicon" color={tintColor} />
        ),
        title: I18n.t('search')
      })
    },
    ProductIndexAll: {
      screen: ProductStack,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="sort-by-alpha" type="material-icon" color={tintColor} />
        ),
        title: I18n.t('all_products')
      })
    }
  },
  {
    tabBarOptions: {
      lazy: false,
      showIcon: true,
      scrollEnabled: true,
      allowFontScaling: true,
      activeTintColor: 'black',
      // activeTintColor: '#ddca21',
      inactiveTintColor: '#b2b2b2',
      activeBackgroundColor: 'white',
      animationEnabled: true,
      labelStyle: [navLabelStyle, {fontFamily: text.font}],
      style: {
        backgroundColor: 'white'
      }
    },
    navigationOptions: {
      tabBarVisible: true
    },
    initialRouteName: 'Home',
    order: ['Home', 'CategoryIndexScreen', 'Search', 'Setting']
  }
);
