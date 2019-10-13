import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';
import {HeaderLeft} from './../../components/HeaderLeft';
import {HeaderRight} from './../../components/HeaderRight';
import {navLabelStyle} from '../../globalStyles';
import {text} from '../../constants';
import {AbatiHomeStack} from './AbatiHomeStack';
import {AbatiVideoStack} from './AbatiVideoStack';
import {AbatiSettingStack} from './AbatiSettingStack';
import {AbatiSearchStack} from './AbatiSearchStack';
import {AbatiProductStack} from './AbatiProductStack';
import {AbatiServiceStack} from './AbatiServiceStack';

export const AbatiBottomTabsStack = createBottomTabNavigator(
  {
    Home: {
      screen: AbatiHomeStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon size={30} name="home" type="octicon" color={tintColor} />
        )
        // title: I18n.t('home')
      })
    },
    // CategoryIndexScreen: {
    //   screen: AbatiCategoryStack,
    //   navigationOptions: ({navigation}) => ({
    //     tabBarIcon: ({tintColor}) => (
    //       <Icon
    //           size={30}
    //           name="layers" type="simplelineicons" color={tintColor} />
    //     ),
    //     // title: I18n.t('categories')
    //   })
    // },
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
        )
        // title: I18n.t('videos'),
      })
    },
    Setting: {
      screen: AbatiSettingStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon size={30} name="ios-person" type="ionicon" color={tintColor} />
        ),
        // title: I18n.t('me'),
        headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />
        // headerTitle: <HeaderMiddle title={I18n.t('home')}/>,
      })
    },
    Search: {
      screen: AbatiSearchStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon size={30} name="ios-search" type="ionicon" color={tintColor} />
        )
        // title: I18n.t('search'),
      })
    },
    ProductIndexAll: {
      screen: AbatiProductStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon
            size={30}
            name="sort-by-alpha"
            type="material-icon"
            color={tintColor}
          />
        )
        // title: I18n.t('all_products'),
      })
    },
    ServiceIndexAll: {
      screen: AbatiServiceStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="customerservice"
            type="antdesign"
            size={30}
            color={tintColor}
          />
        )
        // title: I18n.t('services'),
      })
    }
  },
  {
    tabBarOptions: {
      lazy: false,
      showIcon: true,
      showLabel: false,
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
      // 'CategoryIndexScreen',
      'ProductIndexAll',
      'VideoIndexAll',
      'Home',
      'ServiceIndexAll',
      'Setting'
    ]
  }
);
