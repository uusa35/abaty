import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';
import I18n from '../../I18n';
import {HeaderLeft} from './../../components/HeaderLeft';
import {HeaderRight} from './../../components/HeaderRight';
import {navLabelStyle} from '../../globalStyles';
import {text} from '../../constants';
import {MallrHomeStack} from './MallrHomeStack';
import {MallrCategoryStack} from './MallrCategoryStack';
import {MallrVideoStack} from './MallrVideoStack';
import {MallrSettingStack} from './MallrSettingStack';
import {MallrSearchStack} from './MallrSearchStack';
import {MallrProductStack} from './MallrProductStack';
import {MallrServiceStack} from './MallrServiceStack';

export const BottomTabsStack = createBottomTabNavigator(
  {
    Home: {
      screen: MallrHomeStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="home" type="octicon" color={tintColor} />
        ),
        title: I18n.t('home')
      })
    },
    CategoryIndexScreen: {
      screen: MallrCategoryStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="layers" type="simplelineicons" color={tintColor} />
        ),
        title: I18n.t('categories')
      })
    },
    VideoIndexAll: {
      screen: MallrVideoStack,
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
      screen: MallrSettingStack,
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
      screen: MallrSearchStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-search" type="ionicon" color={tintColor} />
        ),
        title: I18n.t('search')
      })
    },
    ProductIndexAll: {
      screen: MallrProductStack,
      navigationOptions: ({navigation}) => ({
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
