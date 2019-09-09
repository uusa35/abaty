import React from 'react';
import {connect} from 'react-redux';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer
} from 'react-navigation';
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer
} from 'react-navigation-redux-helpers';
import I18n, {isRTL} from './I18n';
import SideMenu from './components/SideMenu';
import {text} from './constants';
import HomeScreen from './screens/HomeScreen';
import {HeaderLeft} from './components/HeaderLeft';
import {Icon} from 'react-native-elements';
import ContactusScreen from './screens/ContactusScreen';
import CategoryIndexScreen from './screens/CategoryIndexScreen';
import SubCategoryIndexScreen from './screens/SubCategoryIndexScreen';
import UserIndexScreen from './screens/UserIndexScreen';
import UserShowScreen from './screens/UserShowScreen';
import ImageZoomWidget from './components/widgets/ImageZoomWidget';
import {HeaderRight} from './components/HeaderRight';
import HeaderCustom from './components/HeaderCustom';
import {HeaderMiddle} from './components/HeaderMiddle';
import validate from 'validate.js';
import DesignerShowScreen from './screens/DesignerShowScreen';
import ProductShowScreen from './screens/ProductShowScreen';
import BrandShowScreen from './screens/BrandShowScreen';
import BrandIndexScreen from './screens/BrandIndexScreen';
import ProductIndexScreen from './screens/ProductIndexScreen';
import CartIndexScreen from './screens/CartIndexScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CartConfirmationScreen from './screens/CartConfirmationScreen';
import PaymentIndexScreen from './screens/PaymentIndexScreen';
import IntroductionScreen from './screens/IntroductionScreen';
import FavoriteProductIndexScreen from './screens/FavoriteProductIndexScreen';
import FavoriteClassifiedIndexScreen from './screens/FavoriteClassifiedIndexScreen';
import ProductIndexAllScreen from './screens/ProductIndexAllScreen';
import ProfileIndexScreen from './screens/ProfileIndexScreen';
import UserEditScreen from './screens/UserEditScreen';
import {navLabelStyle} from './globalStyles';
import VideoIndexScreen from './screens/VideoIndexScreen';
import ServiceIndexScreen from './screens/ServiceIndexScreen';
import ServiceShowScreen from './screens/ServiceShowScreen';
import OrderIndexScreen from './screens/OrderIndexScreen';
import TermAndConditionScreen from './screens/TermAndConditionScreen';
import ServiceIndexAllScreen from './screens/ServiceIndexAllScreen';
import CollectionIndexScreen from './screens/CollectionIndexScreen';
import HomeKeyScreen from './screens/HomeKeyScreen';
import ClassifiedShowScreen from './screens/ClassifiedShowScreen';
import ClassifiedIndexScreen from './screens/ClassifiedIndexScreen';
import ClassifiedStoreScreen from './screens/ClassifiedStoreScreen';
import SettingsIndexScreen from './screens/SettingsIndexScreen';

const navMiddleware = createReactNavigationReduxMiddleware(state => state.nav);

const HomeStack = createStackNavigator(
  {
    // Introduction: {
    //   screen: IntroductionScreen,
    //   navigationOptions: ({navigation}) => ({
    //     header: null,
    //     showLabel: false,
    //     showIcon: false,
    //     tabBarVisible: false
    //   })
    // },
    Home: {
      screen: HomeScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        // headerTitle: <HeaderMiddle title={I18n.t('home')}/>,
        headerBackTitle: null
      }),
      path: 'home'
    },
    CartIndex: {
      screen: CartIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        // HeaderRight: <HeaderRight {...navigation} />,
        headerTitle: <HeaderMiddle title={I18n.t('cart')} />,
        headerBackTitle: null
      })
    },
    CartConfirmation: {
      screen: CartConfirmationScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('cart_confirmation')} />,
        headerBackTitle: null
      })
    },
    PaymentIndex: {
      screen: PaymentIndexScreen,
      navigationOptions: ({navigation}) => ({
        HeaderRight: <HeaderLeft {...navigation} />,
        headerTitle: <HeaderMiddle title={I18n.t('payment_index_page')} />,
        headerBackTitle: null
      })
    },
    SubCategoryIndex: {
      screen: SubCategoryIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null
      })
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('login')} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null
      })
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('register')} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null
      })
    },
    UserEdit: {
      screen: UserEditScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('edit_information')} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null
      })
    },
    UserIndex: {
      screen: UserIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null
      })
    },
    User: {
      screen: UserShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderCustom navigation={navigation} />,
        headerBackTitle: null
      }),
      path: `user/:id`
    },
    DesignerShow: {
      screen: DesignerShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderCustom navigation={navigation} />,
        headerBackTitle: null
      }),
      path: `user/:id`
    },
    ProductIndex: {
      screen: ProductIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerRight: (
          <HeaderRight {...navigation} displayShare={false} display={true} />
        ),
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerBackTitle: null
      })
    },
    CollectionIndex: {
      screen: CollectionIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerRight: (
          <HeaderRight {...navigation} displayShare={false} display={true} />
        ),
        headerTitle: <HeaderMiddle title={I18n.t('our_collections')} />,
        headerBackTitle: null
      })
    },
    ServiceIndex: {
      screen: ServiceIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerRight: (
          <HeaderRight {...navigation} displayShare={false} display={true} />
        ),
        headerTitle: <HeaderMiddle title={I18n.t('services')} />,
        headerBackTitle: null
      })
    },
    Product: {
      screen: ProductShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: (
          <HeaderRight
            navigation={navigation}
            displayShare={true}
            display={true}
          />
        ),
        headerBackTitle: null
      }),
      path: `product/:id`
    },
    Service: {
      screen: ServiceShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: (
          <HeaderRight
            navigation={navigation}
            displayShare={true}
            display={true}
          />
        ),
        headerBackTitle: null
      }),
      path: `product/:id`
    },
    FavoriteProductIndex: {
      screen: FavoriteProductIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerRight: (
          <HeaderRight {...navigation} displayShare={false} display={true} />
        ),
        headerTitle: <HeaderMiddle title={I18n.t('wishlist')} />,
        headerBackTitle: null
      })
    },
    FavoriteClassifiedIndex: {
      screen: FavoriteClassifiedIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerRight: (
          <HeaderRight {...navigation} displayShare={false} display={true} />
        ),
        headerTitle: <HeaderMiddle title={I18n.t('wishlist')} />,
        headerBackTitle: null
      })
    },
    ImageZoom: {
      screen: ImageZoomWidget,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerBackTitle: null
      })
    },
    Contactus: {
      screen: ContactusScreen,
      navigationOptions: () => ({
        headerTitle: <HeaderMiddle title={I18n.t('contactus')} />
      }),
      path: 'contactus'
    },
    TermAndCondition: {
      screen: TermAndConditionScreen,
      navigationOptions: () => ({
        headerTitle: <HeaderMiddle title={I18n.t('terms_and_conditions')} />
      })
    },
    BrandIndex: {
      screen: BrandIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('brands')} />,
        headerBackTitle: null
      })
    },
    BrandShow: {
      screen: BrandShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderCustom navigation={navigation} />,
        headerBackTitle: null
      })
    },
    ProfileIndex: {
      screen: ProfileIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: null,
        headerBackTitle: null
      }),
      path: `product/:id`
    },
    OrderIndex: {
      screen: OrderIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('order_history')} />,
        headerRight: null,
        headerBackTitle: null
      }),
      path: `product/:id`
    },
    HomeKey: {
      screen: HomeKeyScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        // headerTitle: <HeaderMiddle title={I18n.t('home')}/>,
        headerBackTitle: null
      })
    },
    ClassifiedIndex: {
      screen: ClassifiedIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        headerBackTitle: null
      })
    },
    Classified: {
      screen: ClassifiedShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: (
          <HeaderRight
            navigation={navigation}
            displayShare={true}
            display={true}
          />
        ),
        headerBackTitle: null
        //   headerTransparent: true,
        // headerStyle: {
        // backgroundColor: 'white',
        // borderColor: 'transparent',
        // zIndex: 100
        // }
      }),
      path: `classified/:id`
    },
    ClassifiedStore: {
      screen: ClassifiedStoreScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('new_classified')} />,
        headerRight: (
          <HeaderRight
            navigation={navigation}
            displayShare={false}
            display={false}
          />
        ),
        headerBackTitle: null
      })
    },
    SettingIndex: {
      screen: SettingsIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('settings')} />,
        headerBackTitle: null
      })
    }
  },
  {
    mode: 'card',
    headerMode: 'screen',
    swipeEnabled: false
  }
);

const ClassifiedStack = createStackNavigator(
  {
    HomeKey: {
      screen: HomeKeyScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        // headerTitle: <HeaderMiddle title={I18n.t('home')}/>,
        headerBackTitle: null
      })
    },
    ClassifiedIndex: {
      screen: ClassifiedIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        // headerTitle: <HeaderMiddle title={I18n.t('home')}/>,
        headerBackTitle: null
      })
    },
    Classified: {
      screen: ClassifiedShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: (
          <HeaderRight
            navigation={navigation}
            displayShare={true}
            display={true}
          />
        ),
        headerBackTitle: null,
        headerStyle: {
          backgroundColor: 'white',
          borderColor: 'transparent',
          zIndex: 100
        }
      }),
      path: `classified/:id`
    }
  },
  {
    mode: 'card',
    headerMode: 'screen',
    swipeEnabled: false
  }
);
const BrandStack = createStackNavigator(
  {
    BrandIndex: {
      screen: BrandIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: <HeaderLeft {...navigation} />,
        headerTitle: <HeaderMiddle title={I18n.t('brands')} />,
        headerBackTitle: null
      })
    },
    BrandShow: {
      screen: BrandShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderCustom navigation={navigation} />,
        headerBackTitle: null
      })
    },
    ProductIndex: {
      screen: ProductIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerBackTitle: null
      })
    },
    Product: {
      screen: ProductShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: (
          <HeaderRight
            navigation={navigation}
            displayShare={true}
            display={true}
          />
        ),
        headerBackTitle: null
      }),
      path: `product/:id`
    }
  },
  {
    mode: 'card',
    headerMode: 'float'
  }
);

const ProductStack = createStackNavigator(
  {
    ProductIndexAll: {
      screen: ProductIndexAllScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        headerTitle: <HeaderMiddle title={I18n.t('products')} />,
        headerBackTitle: null
      })
    },
    Product: {
      screen: ProductShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: (
          <HeaderRight
            navigation={navigation}
            displayShare={true}
            display={true}
          />
        ),
        headerBackTitle: null
      }),
      path: `product/:id`
    }
  },
  {
    mode: 'card',
    headerMode: 'float'
  }
);

const ServiceStack = createStackNavigator(
  {
    ServiceIndexAll: {
      screen: ServiceIndexAllScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        headerTitle: <HeaderMiddle title={I18n.t('services')} />,
        headerBackTitle: null
      })
    },
    Service: {
      screen: ServiceShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: (
          <HeaderRight
            navigation={navigation}
            displayShare={true}
            display={true}
          />
        ),
        headerBackTitle: null,
        headerStyle: {
          // backgroundColor: 'white',
          // zIndex: 100
        }
      }),
      path: `service/:id`
    }
  },
  {
    mode: 'card',
    headerMode: 'float'
  }
);

const VideoStack = createStackNavigator(
  {
    VideoIndex: {
      screen: VideoIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: <HeaderLeft {...navigation} />,
        headerTitle: <HeaderMiddle title={I18n.t('videos')} />,
        headerBackTitle: null
      })
    }
  },
  {
    mode: 'card',
    headerMode: 'float'
  }
);

const CategoryStack = createStackNavigator(
  {
    CategoryIndex: {
      screen: CategoryIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerTitle: (
          <HeaderMiddle
            title={
              !validate.isEmpty(navigation.state.params.name)
                ? navigation.state.params.name
                : I18n.t('categories')
            }
          />
        ),
        headerBackTitle: null,
        headerTransparent: true
      }),
      params: {
        category: null,
        showMainCategory: true
      },
      path: 'category/:id'
    },
    ProductIndex: {
      screen: ProductIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerBackTitle: null
      })
    },
    Product: {
      screen: ProductShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: (
          <HeaderRight
            navigation={navigation}
            displayShare={true}
            display={true}
          />
        ),
        headerTransparent: true,
        headerBackTitle: null
      }),
      path: `product/:id`
    },
    SubCategoryIndex: {
      screen: SubCategoryIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null
      })
    }
  },
  {
    mode: 'card',
    headerMode: 'float'
  }
);
const TabsStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => <Icon name="home" color={tintColor} />,
        title: I18n.t('home')
      })
    },
    CategoryIndexScreen: {
      screen: CategoryStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="layers" type="simplelineicons" color={tintColor} />
        ),
        title: I18n.t('categories')
      })
    },
    VideoIndexScreen: {
      screen: VideoStack,
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
    ProductIndexAll: {
      screen: ProductStack,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="sort-by-alpha" type="material-icon" color={tintColor} />
        ),
        title: I18n.t('all_products')
      })
    },
    ServiceIndexAll: {
      screen: ServiceStack,
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
    order: [
      'CategoryIndexScreen',
      'VideoIndexScreen',
      'Home',
      'ServiceIndexAll',
      'ProductIndexAll'
    ]
  }
);

HomeStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

// CartStack.navigationOptions = ({navigation}) => {
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }
//   return {
//     tabBarVisible
//   };
// };

VideoStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

ProductStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};
CategoryStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};
BrandStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

const RootNavigator = createDrawerNavigator(
  {
    Tabs: {
      screen: TabsStack
    }
  },
  {
    contentComponent: ({navigation}) => <SideMenu navigation={navigation} />,
    drawerPosition: isRTL ? 'right' : 'left',
    drawerBackgroundColor: 'white',
    overlayColor: 'transparent',
    contentOptions: {
      // activeTintColor: '#e91e63',
      activeTintColor: 'black',
      itemsContainerStyle: {
        marginVertical: 0
      },
      iconContainerStyle: {
        opacity: 1
      }
    }
  }
);

const AppWithNavigationState = createReduxContainer(RootNavigator);

const mapStateToProps = state => ({
  state: state.nav,
  network: state.network
});

const AppNavigator = connect(mapStateToProps)(
  createAppContainer(AppWithNavigationState)
);

export {RootNavigator, AppNavigator, navMiddleware};
