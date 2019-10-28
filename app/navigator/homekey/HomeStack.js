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
import NormalProductShow from '../../screens/NormalProductShowScreen';
import ProductIndexScreen from '../../screens/ProductIndexScreen';
import ServiceIndexScreen from '../../screens/ServiceIndexScreen';
import CollectionIndexScreen from '../../screens/CollectionIndexScreen';
import ServiceShowScreen from '../../screens/ServiceShowScreen';
import FavoriteProductIndexScreen from '../../screens/FavoriteProductIndexScreen';
import FavoriteClassifiedIndexScreen from '../../screens/FavoriteClassifiedIndexScreen';
import ImageZoomWidget from '../../components/widgets/ImageZoomWidget';
import ContactusScreen from '../../screens/ContactusScreen';
import TermAndConditionScreen from '../../screens/TermAndConditionScreen';
import BrandIndexScreen from '../../screens/BrandIndexScreen';
import BrandShowScreen from '../../screens/BrandShowScreen';
import ProfileIndexScreen from '../../screens/ProfileIndexScreen';
import OrderIndexScreen from '../../screens/OrderIndexScreen';
import HomeKeyScreen from '../../screens/HomeKeyScreen';
import ClassifiedIndexScreen from '../../screens/ClassifiedIndexScreen';
import ClassifiedShowScreen from '../../screens/ClassifiedShowScreen';
import ClassifiedStoreScreen from '../../screens/ClassifiedStoreScreen';
import ChooseCategoryScreen from '../../screens/ChooseCategoryScreen';
import CategoryGroupsScreen from '../../screens/CategoryGroupsScreen';
import React from 'react';
import ClassifiedFilterScreen from '../../screens/search/ClassifiedFilterScreen';
import CategoryIndexScreen from '../../screens/CategoryIndexScreen';
import validate from 'validate.js';

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
      screen: HomeKeyScreen,
      navigationOptions: () => ({
        headerLeft: <HeaderLeft />,
        headerRight: <HeaderRight displayShare={false} showCountry={true} />,
        headerTitle: <HeaderMiddle title={I18n.t('home')} showLogo={true} />,
        headerBackTitle: null,
      }),
    },
    CartIndex: {
      screen: CartIndexScreen,
      navigationOptions: () => ({
        // headerLeft: <HeaderLeft  />,
        // HeaderRight: <HeaderRight  />,
        headerTitle: <HeaderMiddle title={I18n.t('cart')} />,
        headerBackTitle: null,
      }),
    },
    CartConfirmation: {
      screen: CartConfirmationScreen,
      navigationOptions: () => ({
        headerTitle: <HeaderMiddle title={I18n.t('cart_confirmation')} />,
        headerBackTitle: null,
      }),
    },
    PaymentIndex: {
      screen: PaymentIndexScreen,
      navigationOptions: () => ({
        HeaderRight: <HeaderLeft />,
        headerTitle: <HeaderMiddle title={I18n.t('payment_index_page')} />,
        headerBackTitle: null,
      }),
    },
    CategoryIndex: {
      screen: CategoryIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft  />,
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
        headerTransparent: true,
      }),
      path: 'category/:id',
    },
    SubCategoryIndex: {
      screen: SubCategoryIndexScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
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
        headerRight: <HeaderCustom />,
        headerBackTitle: null,
      }),
      path: `user/:id`,
    },
    DesignerShow: {
      screen: DesignerShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderCustom />,
        headerBackTitle: null,
      }),
      path: `user/:id`,
    },
    CelebrityShow: {
      screen: CelebrityShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderCustom />,
        headerBackTitle: null,
      }),
      path: `user/:id`,
    },
    ProductIndex: {
      screen: ProductIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft  />,
        headerRight: <HeaderRight displayShare={false} display={true} />,
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerBackTitle: null,
      }),
    },
    ServiceIndex: {
      screen: ServiceIndexScreen,
      navigationOptions: () => ({
        // headerLeft: <HeaderLeft  />,
        headerRight: <HeaderRight displayShare={false} display={true} />,
        headerTitle: <HeaderMiddle title={I18n.t('services')} />,
        headerBackTitle: null,
      }),
    },
    CollectionIndex: {
      screen: CollectionIndexScreen,
      navigationOptions: () => ({
        // headerLeft: <HeaderLeft  />,
        headerRight: <HeaderRight displayShare={false} display={true} />,
        headerTitle: <HeaderMiddle title={I18n.t('our_collections')} />,
        headerBackTitle: null,
      }),
    },

    Product: {
      screen: NormalProductShow,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight displayShare={true} showCountry={true} />,
        headerBackTitle: null,
      }),
      path: `product/:id`,
    },
    Service: {
      screen: ServiceShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight displayShare={true} display={true} />,
        headerBackTitle: null,
      }),
      path: `product/:id`,
    },
    FavoriteProductIndex: {
      screen: FavoriteProductIndexScreen,
      navigationOptions: () => ({
        // headerLeft: <HeaderLeft  />,
        headerRight: <HeaderRight displayShare={false} display={true} />,
        headerTitle: <HeaderMiddle title={I18n.t('wishlist')} />,
        headerBackTitle: null,
      }),
    },
    FavoriteClassifiedIndex: {
      screen: FavoriteClassifiedIndexScreen,
      navigationOptions: () => ({
        // headerLeft: <HeaderLeft  />,
        headerRight: <HeaderRight displayShare={false} display={true} />,
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
      navigationOptions: () => ({
        headerTitle: <HeaderMiddle title={I18n.t('brands')} />,
        headerBackTitle: null,
      }),
    },
    BrandShow: {
      screen: BrandShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderCustom />,
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
      navigationOptions: () => ({
        headerTitle: <HeaderMiddle title={I18n.t('order_history')} />,
        headerRight: null,
        headerBackTitle: null,
      }),
      path: `product/:id`,
    },
    HomeKey: {
      screen: HomeKeyScreen,
      navigationOptions: () => ({
        headerLeft: <HeaderLeft showCart={false} />,
        headerRight: <HeaderRight showCountry={true} displayShare={false} />,
        headerTitle: (
          <HeaderMiddle title={I18n.t('home_key')} showLogo={false} />
        ),
        headerBackTitle: null,
        headerTransparent: true,
      }),
    },
    ClassifiedIndex: {
      screen: ClassifiedIndexScreen,
      navigationOptions: ({navigation}) => ({
        // headerLeft: <HeaderLeft  />,
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight showFilter={true} />,
        headerBackTitle: null,
      }),
    },
    Classified: {
      screen: ClassifiedShowScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={navigation.state.params.name} />,
        headerRight: <HeaderRight displayShare={true} display={true} />,
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
      navigationOptions: () => ({
        headerTitle: <HeaderMiddle title={I18n.t('new_classified')} />,
        headerRight: <HeaderRight displayShare={false} display={false} />,
        headerBackTitle: null,
      }),
    },
    ChooseCategory: {
      screen: ChooseCategoryScreen,
      navigationOptions: () => ({
        headerTitle: <HeaderMiddle title={I18n.t('choose_your_category')} />,
        headerRight: <HeaderRight displayShare={false} display={false} />,
        headerBackTitle: null,
      }),
    },
    ChooseCategoryGroups: {
      screen: CategoryGroupsScreen,
      navigationOptions: () => ({
        headerTitle: <HeaderMiddle title={I18n.t('add_your_properties')} />,
        headerRight: <HeaderRight displayShare={false} display={false} />,
        headerBackTitle: null,
      }),
    },
    ClassifiedFilter: {
      screen: ClassifiedFilterScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('login')} />,
        headerRight: <HeaderRight display={false} />,
      }),
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: ({navigation}) => ({
        headerTitle: <HeaderMiddle title={I18n.t('register')} />,
        headerRight: <HeaderRight display={false} />,
        // headerBackTitle: null
      }),
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
