import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {HeaderLeft} from './../../components/HeaderLeft';
import {HeaderRight} from './../../components/HeaderRight';
import {navLabelStyle} from '../../globalStyles';
import {iconSizes, text} from '../../constants/sizes';
import {HomeStack} from './HomeStack';
import {SettingStack} from './SettingStack';
import {SearchStack} from './SearchStack';
import {ProductStack} from './ProductStack';
import I18n from '../../I18n';
import IconTabBar from '../../components/IconTabBar';
import TextTabBar from '../../components/TextTabBar';
import {CartStack} from './CartStack';
import {ContactStack} from './ContactStack';

export const BottomTabsStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar focused={focused} name="home" type="antdesign" />
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
    // VideoIndexAll: {
    //   screen: VideoStack,
    //   navigationOptions: ({navigation}) => ({
    //     tabBarIcon: ({focused}) => (
    //       <IconTabBar focused={focused} name="play-video" type="foundation" />
    //     ),
    //     tabBarLabel: ({focused}) => (
    //       <TextTabBar title={I18n.t('videos')} focused={focused} />
    //     ),
    //   }),
    // },
    Cart: {
      screen: CartStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar
            focused={focused}
            name="cart-arrow-down"
            type="font-awesome"
          />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('cart')} focused={focused} />
        ),
      }),
    },
    Contact: {
      screen: ContactStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar
            focused={focused}
            name="filter-list"
            type="materialicons"
          />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('more')} focused={focused} />
        ),
        headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight display={true} />,
      }),
    },
    Setting: {
      screen: SettingStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar focused={focused} name="person" type="fontisto" />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('me')} focused={focused} />
        ),
        headerLeft: () => <HeaderLeft {...navigation} />,
        headerRight: () => <HeaderRight {...navigation} display={true} />,
        // headerTitle: () => <HeaderMiddle title={I18n.t('home')}/>,
      }),
    },
    Search: {
      screen: SearchStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar
            focused={focused}
            name="search1"
            type="antdesign"
            size={iconSizes.smaller}
          />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('search')} focused={focused} />
        ),
      }),
    },
    ProductIndexAll: {
      screen: ProductStack,
      navigationOptions: () => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar focused={focused} name="shop" type="entypo" />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('all_products')} focused={focused} />
        ),
        activeBackgroundColor: 'green',
      }),
    },
    // ServiceIndexAll: {
    //   screen: ServiceStack,
    //   navigationOptions: ({navigation}) => ({
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
      lazy: false,
      backBehavior: 'order',
      showIcon: true,
      showLabel: false,
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
    order: ['Home', 'Cart', 'Setting', 'Contact'],
  },
);
