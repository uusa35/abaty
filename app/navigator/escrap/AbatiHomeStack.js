import {createStackNavigator} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import HomeScreen from '../../screens/HomeScreen';
import I18n from '../../I18n';
import PageOneScreen from '../../screens/PageOneScreen';
import PageTwoScreen from '../../screens/PageTwoScreen';
import {text} from '../../constants';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import CartIndexScreen from '../../screens/CartIndexScreen';
import CartConfirmationScreen from '../../screens/CartConfirmationScreen';
import PaymentIndexScreen from '../../screens/PaymentIndexScreen';
import SubCategoryIndexScreen from '../../screens/SubCategoryIndexScreen';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import UserEditScreen from '../../screens/UserEditScreen';
import DesignerIndexScreen from '../../screens/DesignerIndexScreen';
import CompanyIndexScreen from '../../screens/CompanyIndexScreen';
import CelebrityIndexScreen from '../../screens/CelebrityIndexScreen';
import CompanyShowScreen from '../../screens/CompanyShowScreen';
import HeaderCustom from '../../components/HeaderCustom';
import DesignerShowScreen from '../../screens/DesignerShowScreen';
import CelebrityShowScreen from '../../screens/CelebrityShowScreen';
import ProductIndexScreen from '../../screens/ProductIndexScreen';
import ServiceIndexScreen from '../../screens/ServiceIndexScreen';
import CollectionIndexScreen from '../../screens/CollectionIndexScreen';
import ProductShowScreen from '../../screens/ProductShowScreen';
import ServiceShowScreen from '../../screens/ServiceShowScreen';
import FavoriteProductIndexScreen from '../../screens/FavoriteProductIndexScreen';
import FavoriteClassifiedIndexScreen from '../../screens/FavoriteClassifiedIndexScreen';
import ImageZoomWidget from '../../components/widgets/ImageZoomWidget';
import ContactusScreen from '../../screens/ContactusScreen';
import TermAndConditionScreen from '../../screens/TermAndConditionScreen';
import BrandIndexScreen from '../../screens/BrandIndexScreen';
import BrandShowScreen from '../../screens/brand/BrandShowScreen';
import ProfileIndexScreen from '../../screens/auth/ProfileIndexScreen';
import OrderIndexScreen from '../../screens/OrderIndexScreen';
import HomeKeyScreen from '../../screens/HomeKeyScreen';
import ClassifiedIndexScreen from '../../screens/classified/ClassifiedIndexScreen';
import ClassifiedShowScreen from '../../screens/classified/ClassifiedShowScreen';
import ClassifiedStoreScreen from '../../screens/classified/ClassifiedStoreScreen';
import ChooseCategoryScreen from '../../screens/classified/ChooseCategoryScreen';
import CategoryGroupsScreen from '../../screens/classified/CategoryGroupsScreen';
import React from 'react';

export const AbatiHomeStack = createStackNavigator(
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
            screen: HomeScreen,
            navigationOptions: {
              headerBackTitle: null,
              title: I18n.t('home'),
            },
          },
          PageOne: {
            screen: PageOneScreen,
            navigationOptions: {
              headerBackTitle: null,
            },
          },
          PageTwo: {
            screen: PageTwoScreen,
            navigationOptions: {
              headerBackTitle: null,
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
            lazy: true,
            showIcon: false,
            scrollEnabled: true,
            allowFontScaling: true,
            activeTintColor: 'black',
            inactiveTintColor: '#b2b2b2',
            activeBackgroundColor: 'white',
            animationEnabled: true,
            labelStyle: {fontFamily: text.font},
            style: {
              backgroundColor: 'transparent',
              maxHeight: 50,
              alignSelf: 'flex-start',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              borderBottomWidth: 0.5,
              borderColor: 'lightgrey',
            },
            tabStyle: {
              backgroundColor: 'transparent',
            },
            indicatorStyle: {
              backgroundColor: 'black',
            },
          },
          navigationOptions: ({navigation}) => ({
            tabBarVisible: true,
            headerLeft: <HeaderLeft {...navigation} />,
            headerRight: <HeaderRight {...navigation} display={true} />,
            headerTitle: (
              <HeaderMiddle showLogo={true} title={I18n.t('home')} />
            ),
            headerBackTitle: null,
          }),
          initialRouteName: 'Main',
          order: ['Main', 'PageOne', 'PageTwo'],
        },
      ),
    },
    CartIndex: {
      screen: CartIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        // HeaderRight: <HeaderRight {...navigation} />,
        headerTitle: <HeaderMiddle title={I18n.t('cart')} />,
        headerBackTitle: null,
      }),
    },
    CartConfirmation: {
      screen: CartConfirmationScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('cart_confirmation')} />,
        headerBackTitle: null,
      }),
    },
    PaymentIndex: {
      screen: PaymentIndexScreen,
      navigationOptions: ({navigation}) => ({
        HeaderRight: <HeaderLeft {...navigation} />,
        headerTitle: <HeaderMiddle title={I18n.t('payment_index_page')} />,
        headerBackTitle: null,
      }),
    },
    SubCategoryIndex: {
      screen: SubCategoryIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null,
      }),
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('login')} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null,
      }),
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('register')} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null,
      }),
    },
    UserEdit: {
      screen: UserEditScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('edit_information')} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null,
      }),
    },
    DesignerIndex: {
      screen: DesignerIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null,
      }),
    },
    CompanyIndex: {
      screen: CompanyIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null,
      }),
    },
    CelebrityIndex: {
      screen: CelebrityIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null,
      }),
    },
    CompanyShow: {
      screen: CompanyShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderCustom navigation={navigation} />,
        headerBackTitle: null,
      }),
      path: `user/:id`,
    },
    DesignerShow: {
      screen: DesignerShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderCustom navigation={navigation} />,
        headerBackTitle: null,
      }),
      path: `user/:id`,
    },
    CelebrityShow: {
      screen: CelebrityShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderCustom navigation={navigation} />,
        headerBackTitle: null,
      }),
      path: `user/:id`,
    },
    ProductIndex: {
      screen: ProductIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerRight: (
          <HeaderRight {...navigation} displayShare={false} display={true} />
        ),
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerBackTitle: null,
      }),
    },
    ServiceIndex: {
      screen: ServiceIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerRight: (
          <HeaderRight {...navigation} displayShare={false} display={true} />
        ),
        headerTitle: <HeaderMiddle title={I18n.t('services')} />,
        headerBackTitle: null,
      }),
    },
    CollectionIndex: {
      screen: CollectionIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerRight: (
          <HeaderRight {...navigation} displayShare={false} display={true} />
        ),
        headerTitle: <HeaderMiddle title={I18n.t('our_collections')} />,
        headerBackTitle: null,
      }),
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
        headerBackTitle: null,
      }),
      path: `product/:id`,
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
      }),
      path: `product/:id`,
    },
    FavoriteProductIndex: {
      screen: FavoriteProductIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerRight: (
          <HeaderRight {...navigation} displayShare={false} display={true} />
        ),
        headerTitle: <HeaderMiddle title={I18n.t('wishlist')} />,
        headerBackTitle: null,
      }),
    },
    FavoriteClassifiedIndex: {
      screen: FavoriteClassifiedIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerRight: (
          <HeaderRight {...navigation} displayShare={false} display={true} />
        ),
        headerTitle: <HeaderMiddle title={I18n.t('wishlist')} />,
        headerBackTitle: null,
      }),
    },
    ImageZoom: {
      screen: ImageZoomWidget,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerBackTitle: null,
      }),
    },
    Contactus: {
      screen: ContactusScreen,
      navigationOptions: () => ({
        headerTitle: <HeaderMiddle title={I18n.t('contactus')} />,
      }),
      path: 'contactus',
    },
    TermAndCondition: {
      screen: TermAndConditionScreen,
      navigationOptions: () => ({
        headerTitle: <HeaderMiddle title={I18n.t('terms_and_conditions')} />,
      }),
    },
    BrandIndex: {
      screen: BrandIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('brands')} />,
        headerBackTitle: null,
      }),
    },
    BrandShow: {
      screen: BrandShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderCustom navigation={navigation} />,
        headerBackTitle: null,
      }),
    },
    ProfileIndex: {
      screen: ProfileIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: null,
        headerBackTitle: null,
      }),
      path: `product/:id`,
    },
    OrderIndex: {
      screen: OrderIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('order_history')} />,
        headerRight: null,
        headerBackTitle: null,
      }),
      path: `product/:id`,
    },
    HomeKey: {
      screen: HomeKeyScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: <HeaderLeft {...navigation} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        headerTitle: <HeaderMiddle title={I18n.t('home')} showLogo={false} />,
        headerBackTitle: null,
      }),
    },
    ClassifiedIndex: {
      screen: ClassifiedIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft {...navigation} />,
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight {...navigation} display={true} />,
        headerBackTitle: null,
      }),
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
        headerTitle: <HeaderMiddle title={I18n.t('new_classified')} />,
        headerRight: (
          <HeaderRight
            navigation={navigation}
            displayShare={false}
            display={false}
          />
        ),
        headerBackTitle: null,
      }),
    },
    ChooseCategory: {
      screen: ChooseCategoryScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('choose_your_category')} />,
        headerRight: (
          <HeaderRight
            navigation={navigation}
            displayShare={false}
            display={false}
          />
        ),
        headerBackTitle: null,
      }),
    },
    ChooseCategoryGroups: {
      screen: CategoryGroupsScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('add_your_properties')} />,
        headerRight: (
          <HeaderRight
            navigation={navigation}
            displayShare={false}
            display={false}
          />
        ),
        headerBackTitle: null,
      }),
    },
  },
  {
    mode: 'card',
    headerMode: 'screen',
    swipeEnabled: false,
  },
);

AbatiHomeStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
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
