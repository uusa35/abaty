import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
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
import CategoryIndexScreen from '../../screens/category/CategoryIndexScreen';
import validate from 'validate.js';
import ChooseAddressScreen from '../../screens/classified/ChooseAddressScreen';
import NormalClassifiedShowScreen from '../../screens/classified/NormalClassifiedShowScreen';
import CompanyClassifiedShowScreen from '../../screens/company/CompanyClassifiedShowScreen';
import {APP_CASE} from '../../../app';
import ChildrenCategoryIndexScreen from '../../screens/category/ChildrenCategoryIndexScreen';
import ParentCategoryIndexScreen from '../../screens/category/ParentCategoryIndexScreen';
import CategoryClassifiedIndexScreen from '../../screens/category/CategoryClassifiedIndexScreen';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import PolicyScreen from '../../screens/PolicyScreen';
import {isIOS} from '../../constants';
import ClassifiedFilterModalScreen from '../../screens/search/ClassifiedFilterModalScreen';

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
      screen: HomeKeyHomeScreen,
      navigationOptions: () => ({
        headerLeft: () => <HeaderLeft showCart={false} showSideMenu={true} />,
        headerRight: () => (
          <HeaderRight showCountry={true} displayShare={false} />
        ),
        headerTitle: () => (
          <HeaderMiddle title={I18n.t(APP_CASE)} showLogo={true} />
        ),
        headerBackTitle: () => null,
        headerTransparent: true,
      }),
    },
    CartIndex: {
      screen: CartIndexScreen,
      navigationOptions: () => ({
        // headerLeft: () => <HeaderLeft  />,
        // headerRight: () => <HeaderRight showCountry={true} displayShare={false} />,
        headerTitle: () => <HeaderMiddle title={I18n.t('cart')} />,
        headerBackTitle: () => null,
      }),
    },
    CartConfirmation: {
      screen: CartConfirmationScreen,
      navigationOptions: () => ({
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
    CategoryIndex: {
      screen: CategoryIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: () => <HeaderLeft  />,
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
        headerBackTitle: () => null,
        headerTransparent: false,
      }),
      path: 'category/:id',
    },
    ParentCategoryIndex: {
      screen: ParentCategoryIndexScreen,
      navigationOptions: () => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('categories')} />,
        headerRight: () => <HeaderRight />,
        headerBackTitle: () => null,
      }),
    },
    CategoryClassifiedIndex: {
      screen: CategoryClassifiedIndexScreen,
      navigationOptions: () => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('classifieds')} />,
        headerRight: () => <HeaderRight />,
        headerBackTitle: () => null,
      }),
    },
    SubCategoryIndex: {
      screen: SubCategoryIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderRight />,
        headerBackTitle: () => null,
      }),
    },
    ChildrenCategoryIndex: {
      screen: ChildrenCategoryIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderRight />,
        headerBackTitle: () => null,
      }),
    },
    DesignerIndex: {
      screen: DesignerIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderRight />,
        headerBackTitle: () => null,
      }),
    },
    CompanyIndex: {
      screen: CompanyIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderRight />,
        headerBackTitle: () => null,
      }),
    },
    CelebrityIndex: {
      screen: CelebrityIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderRight />,
        headerBackTitle: () => null,
      }),
    },
    CompanyShow: {
      screen: CompanyShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderCustom />,
        headerBackTitle: () => null,
      }),
      path: `user/:id`,
    },
    CompanyClassifiedShow: {
      screen: CompanyClassifiedShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderCustom />,
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
        headerRight: () => <HeaderCustom />,
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
        headerRight: () => <HeaderCustom />,
        headerBackTitle: () => null,
      }),
      path: `user/:id`,
    },
    ProductIndex: {
      screen: ProductIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: () => <HeaderLeft  />,
        headerRight: () => <HeaderRight showCountry={true} />,
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerBackTitle: () => null,
      }),
    },
    ServiceIndex: {
      screen: ServiceIndexScreen,
      navigationOptions: () => ({
        // headerLeft: () => <HeaderLeft  />,
        headerRight: () => <HeaderRight displayShare={false} display={true} />,
        headerTitle: () => <HeaderMiddle title={I18n.t('services')} />,
        headerBackTitle: () => null,
      }),
    },
    CollectionIndex: {
      screen: CollectionIndexScreen,
      navigationOptions: () => ({
        // headerLeft: () => <HeaderLeft  />,
        headerRight: () => <HeaderRight displayShare={false} display={true} />,
        headerTitle: () => <HeaderMiddle title={I18n.t('our_collections')} />,
        headerBackTitle: () => null,
      }),
    },

    Product: {
      screen: NormalProductShow,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => (
          <HeaderRight displayShare={true} showCountry={true} />
        ),
        headerBackTitle: () => null,
      }),
      path: `product/:id`,
    },
    Service: {
      screen: ServiceShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderRight />,
        headerBackTitle: () => null,
      }),
      path: `product/:id`,
    },
    FavoriteProductIndex: {
      screen: FavoriteProductIndexScreen,
      navigationOptions: () => ({
        // headerLeft: () => <HeaderLeft  />,
        headerRight: () => <HeaderRight displayShare={false} display={true} />,
        headerTitle: () => <HeaderMiddle title={I18n.t('wishlist')} />,
        headerBackTitle: () => null,
      }),
    },
    FavoriteClassifiedIndex: {
      screen: FavoriteClassifiedIndexScreen,
      navigationOptions: () => ({
        // headerLeft: () => <HeaderLeft  />,
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
        headerRight: (
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
        headerRight: (
          <HeaderRight displayShare={false} displayCountry={false} />
        ),
        headerTitle: () => <HeaderMiddle title={I18n.t('policies')} />,
        headerBackTitle: () => null,
      }),
    },
    BrandIndex: {
      screen: BrandIndexScreen,
      navigationOptions: () => ({
        headerRight: () => <HeaderRight />,
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
        headerRight: () => <HeaderCustom />,
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
        headerRight: null,
        headerBackTitle: () => null,
      }),
      path: `product/:id`,
    },
    HomeKey: {
      screen: HomeKeyHomeScreen,
      navigationOptions: () => ({
        headerLeft: () => <HeaderLeft showCart={false} />,
        headerRight: () => (
          <HeaderRight showCountry={true} displayShare={false} />
        ),
        headerTitle: (
          <HeaderMiddle title={I18n.t('home_key')} showLogo={false} />
        ),
        headerBackTitle: () => null,
        headerTransparent: true,
      }),
    },
    Scrap: {
      screen: EscrapHomeScreen,
      navigationOptions: () => ({
        headerLeft: () => <HeaderLeft showCart={false} />,
        headerRight: () => (
          <HeaderRight showCountry={true} displayShare={false} />
        ),
        headerTitle: () => (
          <HeaderMiddle title={I18n.t('scrap')} showLogo={false} />
        ),
        headerBackTitle: () => null,
        headerTransparent: true,
      }),
    },
    ClassifiedIndex: {
      screen: ClassifiedIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: () => <HeaderLeft  />,
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => <HeaderRight showFilter={true} showCountry={true} />,
        headerBackTitle: () => null,
      }),
    },
    Classified: {
      // screen: ClassifiedShowScreen,
      screen: NormalClassifiedShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: () => (
          <HeaderMiddle title={navigation.state.params.name} />
        ),
        headerRight: () => (
          <HeaderRight showCountry={true} displayShare={true} />
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
      navigationOptions: () => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('new_classified')} />,
        headerRight: () => <HeaderRight />,
        headerBackTitle: () => null,
      }),
    },
    ChooseCategory: {
      screen: ChooseCategoryScreen,
      navigationOptions: () => ({
        headerTitle: () => (
          <HeaderMiddle title={I18n.t('choose_your_category')} />
        ),
        headerRight: () => <HeaderRight />,
        headerBackTitle: () => null,
      }),
    },
    ChooseCategoryGroups: {
      screen: CategoryGroupsScreen,
      navigationOptions: () => ({
        headerTitle: () => (
          <HeaderMiddle title={I18n.t('add_your_properties')} />
        ),
        headerRight: () => <HeaderRight />,
        headerBackTitle: () => null,
      }),
    },
    ChooseAddress: {
      screen: ChooseAddressScreen,
      navigationOptions: () => ({
        headerTitle: () => <HeaderMiddle title={I18n.t('add_your_address')} />,
        headerRight: () => <HeaderRight />,
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
    ClassifiedFilterModal: {
      screen: ClassifiedFilterModalScreen,
      navigationOptions: () => ({
        headerTitle: () => (
          <HeaderMiddle title={I18n.t('search_classifieds')} />
        ),
        headerRight: () => <HeaderRight display={false} />,
        headerBackTitle: () => null,
      }),
    },
  },
  {
    mode: 'card',
    headerMode: 'screen',
    swipeEnabled: true,
    animation: 'spring',
    gesturesEnabled: isIOS,
    defaultNavigationOptions: () => ({
      animationEnabled: false,
    }),
    // config: {
    //   stiffness: 1000,
    //   damping: 500,
    //   mass: 3,
    //   overshootClamping: true,
    //   restDisplacementThreshold: 0.01,
    //   restSpeedThreshold: 0.01,
    // },
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
