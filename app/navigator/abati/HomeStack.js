import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import I18n from '../../I18n';
import {HeaderLeft} from '../../components/HeaderLeft';
import {HeaderRight} from '../../components/HeaderRight';
import {HeaderMiddle} from '../../components/HeaderMiddle';
import CartIndexScreen from '../../screens/cart/CartIndexScreen';
import CartConfirmationScreen from '../../screens/cart/CartConfirmationScreen';
import PaymentIndexScreen from '../../screens/PaymentIndexScreen';
import SubCategoryIndexScreen from '../../screens/category/SubCategoryIndexScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import RegisterScreen from '../../screens/auth/RegisterScreen';
import DesignerIndexScreen from '../../screens/designer/DesignerIndexScreen';
import CompanyIndexScreen from '../../screens/company/CompanyIndexScreen';
import CelebrityIndexScreen from '../../screens/celebrity/CelebrityIndexScreen';
import CompanyShowScreen from '../../screens/company/CompanyShowScreen';
import HeaderCustom from '../../components/HeaderCustom';
import DesignerShowScreen from '../../screens/designer/DesignerShowScreen';
import CelebrityShowScreen from '../../screens/celebrity/CelebrityShowScreen';
import NormalProductShow from '../../screens/product/NormalProductShowScreen';
import ProductIndexScreen from '../../screens/product/ProductIndexScreen';
import ServiceIndexScreen from '../../screens/service/ServiceIndexScreen';
import CollectionIndexScreen from '../../screens/collection/CollectionIndexScreen';
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
import HomeKeyHomeScreen from '../../screens/home/HomeKeyHomeScreen';
import EscrapHomeScreen from '../../screens/home/EscrapHomeScreen';
import ClassifiedIndexScreen from '../../screens/classified/ClassifiedIndexScreen';
import ClassifiedShowScreen from '../../screens/classified/ClassifiedShowScreen';
import ClassifiedStoreScreen from '../../screens/classified/ClassifiedStoreScreen';
import ChooseCategoryScreen from '../../screens/classified/ChooseCategoryScreen';
import CategoryGroupsScreen from '../../screens/classified/CategoryGroupsScreen';
import ClassifiedFilterScreen from '../../screens/search/ClassifiedFilterScreen';
import CategoryIndexScreen from '../../screens/category/CategoryIndexScreen';
import validate from 'validate.js';
import AbatiHomeScreen from '../../screens/home/AbatiHomeScreen';
import ChooseAddressScreen from '../../screens/classified/ChooseAddressScreen';
import NormalClassifiedShowScreen from '../../screens/classified/NormalClassifiedShowScreen';
import CompanyClassifiedShowScreen from '../../screens/company/CompanyClassifiedShowScreen';
import ChildrenCategoryIndexScreen from '../../screens/category/ChildrenCategoryIndexScreen';
import MallrHomeScreen from '../../screens/home/MallrHomeScreen';
import ProductIndexAllScreen from '../../screens/product/ProductIndexAllScreen';
import SearchProductIndexScreen from '../../screens/product/SearchProductIndexScreen';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

export const HomeStack = createStackNavigator(
  {
    // Introduction: {
    //   screen: IntroductionScreen,
    //   navigationOptions: ) => ({
    //     header: null,
    //     showLabel: false,
    //     showIcon: false,
    //     tabBarVisible: false
    //   })
    // },
    Home: {
      screen: gestureHandlerRootHOC(AbatiHomeScreen),
      navigationOptions: () => ({
        headerLeft: <HeaderLeft />,
        headerRight: <HeaderRight displayShare={false} showCountry={true} />,
        headerTitle: <HeaderMiddle title={I18n.t('home')} showLogo={true} />,
        headerBackTitle: null,
        headerStyle: {
          borderBottomColor: 'lightgrey',
          borderBottomWidth: 0.5,
        },
      }),
    },
    Mallr: {
      screen: gestureHandlerRootHOC(MallrHomeScreen),
      navigationOptions: () => ({
        headerLeft: <HeaderLeft />,
        headerRight: <HeaderRight displayShare={false} showCountry={true} />,
        headerTitle: <HeaderMiddle title={'mallr'} showLogo={true} />,
        headerBackTitle: null,
      }),
    },
    Escrap: {
      screen: gestureHandlerRootHOC(EscrapHomeScreen),
      navigationOptions: () => ({
        headerLeft: <HeaderLeft />,
        headerRight: <HeaderRight displayShare={false} showCountry={true} />,
        headerTitle: <HeaderMiddle title={'escrap'} showLogo={true} />,
        headerBackTitle: null,
      }),
    },
    Homekey: {
      screen: gestureHandlerRootHOC(HomeKeyHomeScreen),
      navigationOptions: () => ({
        headerLeft: <HeaderLeft />,
        headerRight: <HeaderRight displayShare={false} showCountry={true} />,
        headerTitle: <HeaderMiddle title={'homekey'} showLogo={true} />,
        headerBackTitle: null,
      }),
    },
    CartIndex: {
      screen: gestureHandlerRootHOC(CartIndexScreen),
      navigationOptions: () => ({
        // headerLeft: <HeaderLeft  />,
        headerRight: <HeaderRight showCountry={true} displayShare={false} />,
        headerTitle: <HeaderMiddle title={I18n.t('cart')} />,
        headerBackTitle: null,
      }),
    },
    CartConfirmation: {
      screen: gestureHandlerRootHOC(CartConfirmationScreen),
      navigationOptions: () => ({
        headerRight: <HeaderRight showCountry={false} displayShare={false} />,
        headerTitle: <HeaderMiddle title={I18n.t('cart_confirmation')} />,
        headerBackTitle: null,
      }),
    },
    PaymentIndex: {
      screen: gestureHandlerRootHOC(PaymentIndexScreen),
      navigationOptions: () => ({
        headerRight: <HeaderRight showCountry={false} displayShare={false} />,
        headerTitle: <HeaderMiddle title={I18n.t('payment_index_page')} />,
        headerBackTitle: null,
      }),
    },
    CategoryIndex: {
      screen: gestureHandlerRootHOC(CategoryIndexScreen),
      navigationOptions: ({navigation}) => ({
        headerRight: <HeaderRight showCountry={false} displayShare={false} />,
        headerTitle: (
          <HeaderMiddle
            title={
              navigation.state.params &&
              !validate.isEmpty(navigation.state.params.name)
                ? navigation.state.params.name
                : I18n.t('categories')
            }
          />
        ),
        headerBackTitle: null,
        headerTransparent: false,
      }),
      path: 'category/:id',
    },
    SubCategoryIndex: {
      screen: gestureHandlerRootHOC(SubCategoryIndexScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight />,
        headerBackTitle: null,
      }),
    },
    ChildrenCategoryIndex: {
      screen: gestureHandlerRootHOC(ChildrenCategoryIndexScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight />,
        headerBackTitle: null,
      }),
    },
    DesignerIndex: {
      screen: gestureHandlerRootHOC(DesignerIndexScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight />,
        headerBackTitle: null,
      }),
    },
    CompanyIndex: {
      screen: gestureHandlerRootHOC(CompanyIndexScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight />,
        headerBackTitle: null,
      }),
    },
    CelebrityIndex: {
      screen: gestureHandlerRootHOC(CelebrityIndexScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight />,
        headerBackTitle: null,
      }),
    },
    CompanyShow: {
      screen: gestureHandlerRootHOC(CompanyShowScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderCustom />,
        headerBackTitle: null,
      }),
      path: `user/:id`,
    },
    CompanyClassifiedShow: {
      screen: gestureHandlerRootHOC(CompanyClassifiedShowScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderCustom />,
        headerBackTitle: null,
      }),
      path: `user/:id`,
    },
    DesignerShow: {
      screen: gestureHandlerRootHOC(DesignerShowScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderCustom />,
        headerBackTitle: null,
      }),
      path: `user/:id`,
    },
    CelebrityShow: {
      screen: gestureHandlerRootHOC(CelebrityShowScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderCustom />,
        headerBackTitle: null,
      }),
      path: `user/:id`,
    },
    ProductIndex: {
      screen: gestureHandlerRootHOC(ProductIndexAllScreen),
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft  />,
        headerRight: <HeaderRight showCountry={true} />,
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerBackTitle: null,
      }),
    },
    ServiceIndex: {
      screen: gestureHandlerRootHOC(ServiceIndexScreen),
      navigationOptions: () => ({
        // headerLeft: <HeaderLeft  />,
        headerRight: <HeaderRight displayShare={false} />,
        headerTitle: <HeaderMiddle title={I18n.t('services')} />,
        headerBackTitle: null,
      }),
    },
    CollectionIndex: {
      screen: gestureHandlerRootHOC(CollectionIndexScreen),
      navigationOptions: () => ({
        // headerLeft: <HeaderLeft  />,
        headerRight: <HeaderRight displayShare={false} />,
        headerTitle: <HeaderMiddle title={I18n.t('our_collections')} />,
        headerBackTitle: null,
      }),
    },

    Product: {
      screen: gestureHandlerRootHOC(NormalProductShow),
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight displayShare={true} showCountry={true} />,
        headerBackTitle: null,
      }),
      path: `product/:id`,
    },
    SearchProductIndex: {
      screen: gestureHandlerRootHOC(SearchProductIndexScreen),
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft  />,
        headerRight: <HeaderRight showCountry={true} />,
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerBackTitle: null,
      }),
    },
    Service: {
      screen: gestureHandlerRootHOC(ServiceShowScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight />,
        headerBackTitle: null,
      }),
      path: `product/:id`,
    },
    FavoriteProductIndex: {
      screen: gestureHandlerRootHOC(FavoriteProductIndexScreen),
      navigationOptions: () => ({
        // headerLeft: <HeaderLeft  />,
        headerRight: <HeaderRight displayShare={false} />,
        headerTitle: <HeaderMiddle title={I18n.t('wishlist')} />,
        headerBackTitle: null,
      }),
    },
    FavoriteClassifiedIndex: {
      screen: gestureHandlerRootHOC(FavoriteClassifiedIndexScreen),
      navigationOptions: () => ({
        // headerLeft: <HeaderLeft  />,
        headerRight: <HeaderRight displayShare={false} />,
        headerTitle: <HeaderMiddle title={I18n.t('wishlist')} />,
        headerBackTitle: null,
      }),
    },
    ImageZoom: {
      screen: gestureHandlerRootHOC(ImageZoomWidget),
      navigationOptions: ({navigation}) => ({
        headerRight: <HeaderRight />,
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerBackTitle: null,
      }),
    },
    Contactus: {
      screen: gestureHandlerRootHOC(ContactusScreen),
      navigationOptions: () => ({
        headerRight: <HeaderRight />,
        headerTitle: <HeaderMiddle title={I18n.t('contactus')} />,
        headerBackTitle: null,
      }),
      path: 'contactus',
    },
    TermAndCondition: {
      screen: gestureHandlerRootHOC(TermAndConditionScreen),
      navigationOptions: () => ({
        headerRight: (
          <HeaderRight displayShare={false} displayCountry={false} />
        ),
        headerTitle: <HeaderMiddle title={I18n.t('terms_and_conditions')} />,
        headerBackTitle: null,
      }),
    },
    BrandIndex: {
      screen: gestureHandlerRootHOC(BrandIndexScreen),
      navigationOptions: () => ({
        headerTitle: <HeaderMiddle title={I18n.t('brands')} />,
        headerBackTitle: null,
      }),
    },
    BrandShow: {
      screen: gestureHandlerRootHOC(BrandShowScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderCustom />,
        headerBackTitle: null,
      }),
    },
    ProfileIndex: {
      screen: gestureHandlerRootHOC(ProfileIndexScreen),
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight />,
        headerBackTitle: null,
      }),
      path: `product/:id`,
    },
    OrderIndex: {
      screen: gestureHandlerRootHOC(OrderIndexScreen),
      navigationOptions: () => ({
        headerTitle: <HeaderMiddle title={I18n.t('order_history')} />,
        headerRight: <HeaderRight />,
        headerBackTitle: null,
      }),
      path: `product/:id`,
    },
    HomeKey: {
      screen: gestureHandlerRootHOC(HomeKeyHomeScreen),
      navigationOptions: () => ({
        headerLeft: <HeaderLeft showCart={false} />,
        headerRight: <HeaderRight showCountry={true} displayShare={false} />,
        headerTitle: (
          <HeaderMiddle title={I18n.t('homekey')} showLogo={false} />
        ),
        headerBackTitle: null,
        headerTransparent: true,
      }),
    },
    Scrap: {
      screen: gestureHandlerRootHOC(EscrapHomeScreen),
      navigationOptions: () => ({
        headerLeft: <HeaderLeft showCart={false} />,
        headerRight: <HeaderRight showCountry={true} displayShare={false} />,
        headerTitle: <HeaderMiddle title={I18n.t('scrap')} showLogo={false} />,
        headerBackTitle: null,
        headerTransparent: true,
      }),
    },
    ClassifiedIndex: {
      screen: gestureHandlerRootHOC(ClassifiedIndexScreen),
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft  />,
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight showFilter={true} showCountry={true} />,
        headerBackTitle: null,
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
    ClassifiedStore: {
      screen: gestureHandlerRootHOC(ClassifiedStoreScreen),
      navigationOptions: {
        headerTitle: <HeaderMiddle title={I18n.t('new_classified')} />,
        headerRight: <HeaderRight />,
        headerBackTitle: null,
      },
    },
    ChooseCategory: {
      screen: gestureHandlerRootHOC(ChooseCategoryScreen),
      navigationOptions: {
        headerTitle: <HeaderMiddle title={I18n.t('choose_your_category')} />,
        headerRight: <HeaderRight />,
        headerBackTitle: null,
      },
    },
    ChooseCategoryGroups: {
      screen: gestureHandlerRootHOC(CategoryGroupsScreen),
      navigationOptions: {
        headerTitle: <HeaderMiddle title={I18n.t('add_your_properties')} />,
        headerRight: <HeaderRight />,
        headerBackTitle: null,
      },
    },
    ChooseAddress: {
      screen: gestureHandlerRootHOC(ChooseAddressScreen),
      navigationOptions: {
        headerTitle: <HeaderMiddle title={I18n.t('add_your_address')} />,
        headerRight: <HeaderRight />,
        headerBackTitle: null,
      },
    },
    ClassifiedFilter: {
      screen: gestureHandlerRootHOC(ClassifiedFilterScreen),
      navigationOptions: {
        headerTitle: <HeaderMiddle title={I18n.t('search_classifieds')} />,
        headerRight: <HeaderRight showCountry={true} />,
        headerBackTitle: null,
      },
    },
    Login: {
      screen: gestureHandlerRootHOC(LoginScreen),
      navigationOptions: {
        headerTitle: <HeaderMiddle title={I18n.t('login')} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null,
      },
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        headerTitle: <HeaderMiddle title={I18n.t('register')} />,
        headerRight: <HeaderRight display={false} />,
        headerBackTitle: null,
      },
    },
  },
  {
    mode: 'card',
    headerMode: 'screen',
    swipeEnabled: false,
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
