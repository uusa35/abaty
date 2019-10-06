import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';
import I18n from '../../I18n';
import {HeaderLeft} from './../../components/HeaderLeft';
import {HeaderRight} from './../../components/HeaderRight';
import {navLabelStyle} from '../../globalStyles';
import {text} from '../../constants';
import {AbatiHomeStack} from './AbatiHomeStack';
import {AbatiCategoryStack} from './AbatiCategoryStack';
import {AbatiVideoStack} from './AbatiVideoStack';
import {AbatiSettingStack} from './AbatiSettingStack';
import {AbatiSearchStack} from './AbatiSearchStack';
import {AbatiProductStack} from './AbatiProductStack';
import {AbatiServiceStack} from './AbatiServiceStack';
import {HeaderMiddle} from '../../components/HeaderMiddle';

export const BottomTabsStack = createBottomTabNavigator(
  {
    Home: {
      screen: AbatiHomeStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="home" type="octicon" color={tintColor} />
        ),
        title: I18n.t('home')
      })
    },
    CategoryIndexScreen: {
      screen: AbatiCategoryStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="layers" type="simplelineicons" color={tintColor} />
        ),
        title: I18n.t('categories')
      })
    },
    VideoIndexAll: {
      screen: AbatiVideoStack,
      navigationOptions: ({navigation}) => ({
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
      screen: AbatiSettingStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-person" type="ionicon" color={tintColor} />
        ),
        title: I18n.t('me'),
        headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        // headerTitle: <HeaderMiddle title={I18n.t('home')}/>,
        headerBackTitle: null
      })
    },
    Search: {
      screen: AbatiSearchStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-search" type="ionicon" color={tintColor} />
        ),
        title: I18n.t('search')
      })
    },
    ProductIndexAll: {
      screen: AbatiProductStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="sort-by-alpha" type="material-icon" color={tintColor} />
        ),
        title: I18n.t('all_products')
      })
    },
    ServiceIndexAll: {
      screen: AbatiServiceStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="customerservice"
            type="antdesign"
            size={18}
            color={tintColor}
          />
        ),
        title: I18n.t('services')
      })
    }
  },
  {
    tabBarOptions: {
      lazy: false,
      showIcon: true,
      scrollEnabled: true,
      allowFontScaling: true,
      activeTintColor: '#ddca21',
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
    order: [
      'Home',
      'CategoryIndexScreen',
      'VideoIndexAll',
      'ProductIndexAll',
      'Setting'
    ]
  }
);
