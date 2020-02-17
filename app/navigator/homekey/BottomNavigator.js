import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
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
import {ClassifiedStack} from './ClassifiedStack';
import {CategoryStack} from './CategoryStack';
import IconTabBar from '../../components/IconTabBar';
import TextTabBar from '../../components/TextTabBar';
import {FavoriteStack} from './FavoriteStack';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import ClassifiedShowScreen from '../../screens/classified/ClassifiedShowScreen';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import NormalClassifiedShowScreen from '../../screens/classified/NormalClassifiedShowScreen';

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
    Favorite: {
      screen: FavoriteStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar focused={focused} name="star" type="entypo" />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('favorites')} focused={focused} />
        ),
      }),
    },
    CategoryIndexScreen: {
      screen: CategoryStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar focused={focused} name="layers" type="simplelineicons" />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('categories')} focused={focused} />
        ),
      }),
    },
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
        headerLeft: <HeaderLeft />,
        headerRight: <HeaderRight display={true} />,
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
    ClassifiedIndexAll: {
      screen: ClassifiedStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused}) => (
          <IconTabBar focused={focused} name="news" type="entypo" />
        ),
        tabBarLabel: ({focused}) => (
          <TextTabBar title={I18n.t('classifieds')} focused={focused} />
        ),
      }),
    },
    Classified: {
      // screen: gestureHandlerRootHOC(ClassifiedShowScreen),
      screen: gestureHandlerRootHOC(NormalClassifiedShowScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight showCountry={true} displayShare={true} />,
        headerBackTitle: null,
        //   headerTransparent: true,
        // headerStyle: {
        // backgroundColor: 'white',
        // borderColor: 'transparent',
        // zIndex: 100
        // }
      }),
      path: `classified/:id`,
    },
  },
  {
    tabBarOptions: {
      lazy: false,
      showIcon: true,
      showLabel: false,
      scrollEnabled: true,
      allowFontScaling: true,
      activeTintColor: '#DD0900',
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
      'Home',
      // 'CategoryIndexScreen',
      // 'ProductIndexAll',
      // 'VideoIndexAll',
      'Favorite',
      'ClassifiedIndexAll',
      'Setting',
    ],
  },
);
