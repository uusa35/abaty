import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import I18n from '../../I18n';
import PageOneScreen from '../../screens/PageOneScreen';
import PageTwoScreen from '../../screens/PageTwoScreen';
import {text, width} from '../../constants/sizes';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import CartIndexScreen from '../../screens/cart/CartIndexScreen';
import CartConfirmationScreen from '../../screens/cart/CartConfirmationScreen';
import PaymentIndexScreen from '../../screens/PaymentIndexScreen';
import SubCategoryIndexScreen from '../../screens/category/SubCategoryIndexScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import RegisterScreen from '../../screens/auth/RegisterScreen';
import UserEditScreen from '../../screens/auth/UserEditScreen';
import DesignerIndexScreen from '../../screens/designer/DesignerIndexScreen';
import CompanyIndexScreen from '../../screens/company/CompanyIndexScreen';
import CelebrityIndexScreen from '../../screens/celebrity/CelebrityIndexScreen';
import CompanyShowScreen from '../../screens/company/CompanyShowScreen';
import HeaderCustom from '../../components/HeaderCustom';
import DesignerShowScreen from '../../screens/designer/DesignerShowScreen';
import CelebrityShowScreen from '../../screens/celebrity/CelebrityShowScreen';
import ProductIndexScreen from '../../screens/product/ProductIndexScreen';
import ServiceIndexScreen from '../../screens/service/ServiceIndexScreen';
import CollectionIndexScreen from '../../screens/collection/CollectionIndexScreen';
import ProductShowScreen from '../../screens/product/ProductShowScreen';
import ServiceShowScreen from '../../screens/service/ServiceShowScreen';
import FavoriteProductIndexScreen from '../../screens/product/FavoriteProductIndexScreen';
import FavoriteClassifiedIndexScreen from '../../screens/classified/FavoriteClassifiedIndexScreen';
import ImageZoomWidget from '../../components/widgets/ImageZoomWidget';
import ContactusScreen from '../../screens/ContactusScreen';
import TermAndConditionScreen from '../../screens/TermAndConditionScreen';
import BrandIndexScreen from '../../screens/brand/BrandIndexScreen';
import BrandShowScreen from '../../screens/brand/BrandShowScreen';
import ProfileIndexScreen from '../../screens/auth/ProfileIndexScreen';
import OrderIndexScreen from '../../screens/OrderIndexScreen';
import ClassifiedIndexScreen from '../../screens/classified/ClassifiedIndexScreen';
import ClassifiedShowScreen from '../../screens/classified/ClassifiedShowScreen';
import ClassifiedStoreScreen from '../../screens/classified/ClassifiedStoreScreen';
import ChooseCategoryScreen from '../../screens/classified/ChooseCategoryScreen';
import CategoryGroupsScreen from '../../screens/classified/CategoryGroupsScreen';
import React from 'react';
import MallrHomeScreen from '../../screens/home/MallrHomeScreen';
import ShopperShowScreen from '../../screens/designer/ShopperShowScreen';
import {Icon} from 'react-native-elements';
import MallrSettingsIndexScreen from './../../screens/setting/MallrSettingsIndexScreen';
import HomeKeyHomeScreen from '../../screens/home/HomeKeyHomeScreen';
import SearchProductIndexScreen from '../../screens/product/SearchProductIndexScreen';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import PolicyScreen from '../../screens/PolicyScreen';
import {isIOS} from '../../constants';
import NormalProductShowScreen from '../../screens/product/NormalProductShowScreen';

export const HomeStack = createStackNavigator(
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
      screen: createMaterialTopTabNavigator(
        {
          Main: {
            screen: MallrHomeScreen,
            navigationOptions: {
              headerBackTitle: () => null,
              title: I18n.t('home'),
            },
          },
          PageOne: {
            screen: PageOneScreen,
            navigationOptions: {
              headerBackTitle: () => null,
            },
          },
          PageTwo: {
            screen: PageTwoScreen,
            navigationOptions: {
              headerBackTitle: () => null,
            },
          },
          // PageThree: {
          //   screen: PageThreeScreen,
          //   navigationOptions: {
          //     headerBackTitle: null
          //   }
          // },
          // PageFour: {
          //   screen: PageFourScreen,
          //   navigationOptions: {
          //     headerBackTitle: null
          //   }
          // }
        },
        {
          tabBarOptions: {
            lazy: false,
            showIcon: false,
            scrollEnabled: true,
            allowFontScaling: false,
            activeTintColor: 'black',
            inactiveTintColor: '#b2b2b2',
            activeBackgroundColor: 'transparent',
            labelStyle: {
              fontFamily: text.font,
            },
            style: {
              backgroundColor: 'transparent',
              maxHeight: 50,
              width: '100%',
              // flex : 1,
              alignSelf: 'flex-start',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              borderBottomWidth: 0.5,
              borderColor: 'lightgrey',
            },
            tabStyle: {
              backgroundColor: 'transparent',
              width: width / 3,
            },
            indicatorStyle: {
              backgroundColor: 'black',
            },
          },
          navigationOptions: () => ({
            tabBarVisible: true,
            headerLeft: () => <HeaderLeft showCart={true} />,
            headerRight: () => (
              <HeaderRight displayShare={false} showCountry={true} />
            ),
            headerTitle: () => (
              <HeaderMiddle showLogo={true} title={I18n.t('home')} />
            ),
            headerBackTitle: () => null,
          }),
          initialRouteName: 'Main',
          order: ['Main', 'PageOne', 'PageTwo'],
        },
      ),
    },
    CartIndex: {
      screen: CartIndexScreen,
      navigationOptions: () => ({
        // headerLeft: () => <HeaderLeft />,
        headerRight: () => (
          <HeaderRight showCountry={true} displayShare={false} />
        ),
        headerTitle: () => <HeaderMiddle title={I18n.t('cart')} />,
        headerBackTitle: () => null,
      }),
    },
    CartConfirmation: {
      screen: CartConfirmationScreen,
      navigationOptions: () => ({
        headerRight: () => (
          <HeaderRight showCountry={false} displayShare={false} />
        ),
        headerTitle: () => <HeaderMiddle title={I18n.t('cart_confirmation')} />,
        headerBackTitle: () => null,
      }),
    },
    PaymentIndex: {
      screen: PaymentIndexScreen,
      navigationOptions: () => ({
        headerRight: () => <HeaderRight />,
        headerTitle: () => (
          <HeaderMiddle title={I18n.t('payment_index_page')} />
        ),
        headerBackTitle: () => null,
      }),
    },
    SubCategoryIndex: {
      screen: SubCategoryIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderRight display={false} />,
        headerBackTitle: () => null,
      }),
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: () => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('login')} />,
        headerRight: () => <HeaderRight display={false} />,
        headerBackTitle: () => null,
      }),
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: () => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('register')} />,
        headerRight: () => <HeaderRight display={false} />,
        headerBackTitle: () => null,
      }),
    },
    UserEdit: {
      screen: UserEditScreen,
      navigationOptions: () => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('edit_information')} />,
        headerRight: () => <HeaderRight display={false} />,
        headerBackTitle: () => null,
      }),
    },
    DesignerIndex: {
      screen: DesignerIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderRight display={false} />,
        headerBackTitle: () => null,
      }),
    },
    CompanyIndex: {
      screen: CompanyIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderRight display={false} />,
        headerBackTitle: () => null,
      }),
    },
    CelebrityIndex: {
      screen: CelebrityIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderRight display={false} />,
        headerBackTitle: () => null,
      }),
    },
    CompanyShow: {
      screen: CompanyShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderCustom navigation={navigation} />,
        headerBackTitle: () => null,
      }),
      path: `user/:id`,
    },
    ShopperShow: {
      screen: ShopperShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderCustom navigation={navigation} />,
        headerBackTitle: () => null,
      }),
      path: `user/:id`,
    },
    DesignerShow: {
      screen: DesignerShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderCustom navigation={navigation} />,
        headerBackTitle: () => null,
      }),
      path: `user/:id`,
    },
    CelebrityShow: {
      screen: CelebrityShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderCustom navigation={navigation} />,
        headerBackTitle: () => null,
      }),
      path: `user/:id`,
    },
    ProductIndex: {
      screen: ProductIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight displayShare={false} display={true} />,
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerBackTitle: () => null,
      }),
    },
    SearchProductIndex: {
      screen: SearchProductIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: () => <HeaderLeft  />,
        headerRight: () => <HeaderRight showCountry={true} />,
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerBackTitle: () => null,
      }),
    },
    Product: {
      screen: NormalProductShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderRight displayShare={true} display={true} />,
        headerBackTitle: () => null,
      }),
      path: `product/:id`,
    },
    ServiceIndex: {
      screen: ServiceIndexScreen,
      navigationOptions: () => ({
        // headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight displayShare={false} display={true} />,
        headerTitle: () => <HeaderMiddle title={I18n.t('services')} />,
        headerBackTitle: () => null,
      }),
    },
    Service: {
      screen: ServiceShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => (
          <HeaderRight
            navigation={navigation}
            displayShare={true}
            display={true}
          />
        ),
        headerBackTitle: () => null,
      }),
      path: `product/:id`,
    },
    CollectionIndex: {
      screen: CollectionIndexScreen,
      navigationOptions: () => ({
        // headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight displayShare={false} display={true} />,
        headerTitle: () => <HeaderMiddle title={I18n.t('our_collections')} />,
        headerBackTitle: () => null,
      }),
    },
    FavoriteProductIndex: {
      screen: FavoriteProductIndexScreen,
      navigationOptions: () => ({
        // headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight displayShare={false} display={true} />,
        headerTitle: () => <HeaderMiddle title={I18n.t('wishlist')} />,
        headerBackTitle: () => null,
      }),
    },
    FavoriteClassifiedIndex: {
      screen: FavoriteClassifiedIndexScreen,
      navigationOptions: () => ({
        // headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight displayShare={false} display={true} />,
        headerTitle: () => <HeaderMiddle title={I18n.t('wishlist')} />,
        headerBackTitle: () => null,
      }),
    },
    ImageZoom: {
      screen: ImageZoomWidget,
      navigationOptions: ({navigation}) => ({
        headerRight: () => <HeaderRight />,
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerBackTitle: () => null,
      }),
    },
    Contactus: {
      screen: ContactusScreen,
      navigationOptions: () => ({
        headerRight: () => <HeaderRight />,
        headerTitle: () => <HeaderMiddle title={I18n.t('contactus')} />,
      }),
      path: 'contactus',
    },
    TermAndCondition: {
      screen: TermAndConditionScreen,
      navigationOptions: () => ({
        headerRight: () => (
          <HeaderRight displayShare={false} displayCountry={false} />
        ),
        headerTitle: () => (
          <HeaderMiddle title={I18n.t('terms_and_conditions')} />
        ),
      }),
    },
    Policy: {
      screen: PolicyScreen,
      navigationOptions: () => ({
        headerRight: () => (
          <HeaderRight displayShare={false} displayCountry={false} />
        ),
        headerTitle: () => <HeaderMiddle title={I18n.t('policies')} />,
        headerBackTitle: () => null,
      }),
    },
    BrandIndex: {
      screen: BrandIndexScreen,
      navigationOptions: () => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('brands')} />,
        headerBackTitle: () => null,
      }),
    },
    BrandShow: {
      screen: BrandShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderCustom navigation={navigation} />,
        headerBackTitle: () => null,
      }),
    },
    ProfileIndex: {
      screen: ProfileIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderRight />,
        headerBackTitle: () => null,
      }),
      path: `product/:id`,
    },
    OrderIndex: {
      screen: OrderIndexScreen,
      navigationOptions: () => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('order_history')} />,
        headerRight: () => <HeaderRight />,
        headerBackTitle: () => null,
      }),
      path: `product/:id`,
    },
    HomeKey: {
      screen: HomeKeyHomeScreen,
      navigationOptions: () => ({
        headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight display={true} />,
        headerTitle: () => (
          <HeaderMiddle title={I18n.t('home')} showLogo={false} />
        ),
        headerBackTitle: () => null,
      }),
    },
    ClassifiedIndex: {
      screen: ClassifiedIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: () => <HeaderLeft />,
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderRight display={true} />,
        headerBackTitle: () => null,
      }),
    },
    Classified: {
      screen: ClassifiedShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => (
          <HeaderRight
            navigation={navigation}
            displayShare={true}
            display={true}
          />
        ),
        headerBackTitle: () => null,
        //   headerTransparent: true,
        // headerStyle: {
        // backgroundColor: 'white',
        // borderColor: 'transparent',
        // zIndex: 100
        // }
      }),
      path: `classified/:id`,
    },
    ClassifiedStore: {
      screen: ClassifiedStoreScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('new_classified')} />,
        headerRight: () => (
          <HeaderRight
            navigation={navigation}
            displayShare={false}
            display={false}
          />
        ),
        headerBackTitle: () => null,
      }),
    },
    ChooseCategory: {
      screen: ChooseCategoryScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={I18n.t('choose_your_category')} />
        ),
        headerRight: () => (
          <HeaderRight
            navigation={navigation}
            displayShare={false}
            display={false}
          />
        ),
        headerBackTitle: () => null,
      }),
    },
    ChooseCategoryGroups: {
      screen: CategoryGroupsScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={I18n.t('add_your_properties')} />
        ),
        headerRight: () => (
          <HeaderRight
            navigation={navigation}
            displayShare={false}
            display={false}
          />
        ),
        headerBackTitle: () => null,
      }),
    },
    SettingIndex: {
      screen: MallrSettingsIndexScreen,
      navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-person" type="ionicon" color={tintColor} />
        ),
        headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight display={true} />,
        headerTitle: () => <HeaderMiddle title={I18n.t('me')} />,
        headerBackTitle: () => null,
      }),
    },
  },
  {
    mode: 'card',
    headerMode: 'screen',
    animation: 'spring',
    swipeEnabled: true,
    defaultNavigationOptions: () => ({
      animationEnabled: false,
    }),
  },
);

HomeStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
