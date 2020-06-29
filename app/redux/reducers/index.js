import {combineReducers} from 'redux';
import navReducer from './navReducer';
import isLoading from './isLoading';
import isLoadingContent from './isLoadingContent';
import isLoadingProfile from './isLoadingProfile';
import isLoadingBoxedList from './isLoadingBoxedList';
import bootStrapped from './bootStrapped';
import settings from './settings';
import lang from './lang';
import message from './message';
import users from './users';
import user from './user';
import categories from './categories';
import homeCategories from './homeCategories';
import homeUserCategories from './homeUserCategories';
import homeClassifiedCategories from './homeClassifiedCategories';
import category from './category';
import subCategory from './subCategory';
import brands from './brands';
import brand from './brand';
import designers from './designers';
import homeDesigners from './homeDesigners';
import designer from './designer';
import celebrities from './celebrities';
import homeCelebrities from './homeCelebrities';
import celebrity from './celebrity';
import companies from './companies';
import homeCompanies from './homeCompanies';
import company from './company';
import countries from './countries';
import country from './country';
import area from './area';
import areas from './areas';
import color from './color';
import productColors from './productColors';
import size from './size';
import sizes from './sizes';
import currency from './currency';
import galleries from './galleries';
import deviceId from './deviceId';
import commercials from './commercials';
import slides from './slides';
import splashes from './splashes';
import product from './product';
import homeProducts from './homeProducts';
import searchProducts from './searchProducts';
import searchServices from './searchServices';
import searchClassifieds from './searchClassifieds';
import homeCollections from './homeCollections';
import productFavorites from './productFavorites';
import products from './products';
import collection from './collection';
import collections from './collections';
import services from './services';
import homeServices from './homeServices';
import classifieds from './classifieds';
import homeClassifieds from './homeClassifieds';
import classified from './classified';
import classifiedFavorites from './classifiedFavorites';
import service from './service';
import videos from './videos';
import cart from './cart';
import total from './total';
import grossTotal from './grossTotal';
import token from './token';
import guest from './guest';
import countryModal from './countryModal';
import loginModal from './loginModal';
import showIntroduction from './showIntroduction';
import linking from './linking';
import playerId from './playerId';
import auth from './auth';
import coupon from './coupon';
import searchParams from './searchParams';
import commentModal from './commentModal';
import productFilterModal from './productFilterModal';
import classifiedFilterModal from './classifiedFilterModal';
import companySearchTextInputModal from './companySearchTextInputModal';
import comments from './comments';
import orders from './orders';
import newClassified from './newClassified';
import areaModal from './areaModal';
import classifiedProps from './classifiedProps';
import shipmentFees from './shipmentFees';
import version from './version';
import propertiesModal from './propertiesModal';
import tags from './tags';
import pages from './pages';
import latestProducts from './latestProducts';
import onSaleProducts from './onSaleProducts';
import hotDealsProducts from './hotDealsProducts';
import bestSaleProducts from './bestSaleProducts';
import searchModal from './searchModal';
import video from './video';
import roles from './roles';
import role from './role';
import resetApp from './resetApp';
import elementType from './elementType';
// import {reducer as network} from 'react-native-offline';
import isConnected from './isConnected';

let reducers = combineReducers({
  nav: navReducer,
  isLoading,
  isLoadingContent,
  isLoadingProfile,
  isLoadingBoxedList,
  message,
  lang,
  bootStrapped,
  settings,
  commercials,
  slides,
  product,
  products,
  service,
  services,
  homeServices,
  collection,
  collections,
  homeCollections,
  homeProducts,
  searchServices,
  searchProducts,
  searchClassifieds,
  productFavorites,
  videos,
  cart,
  total,
  grossTotal,
  users,
  user,
  categories,
  homeCategories,
  homeUserCategories,
  homeClassifiedCategories,
  category,
  subCategory,
  brand,
  brands,
  company,
  companies,
  homeCompanies,
  designer,
  designers,
  homeDesigners,
  celebrity,
  celebrities,
  homeCelebrities,
  countries,
  splashes,
  country,
  currency,
  area,
  areas,
  color,
  productColors,
  size,
  sizes,
  galleries,
  deviceId,
  playerId,
  guest,
  auth,
  token,
  countryModal,
  areaModal,
  coupon,
  // network,
  isConnected,
  searchParams,
  loginModal,
  showIntroduction,
  commentModal,
  productFilterModal,
  classifiedFilterModal,
  companySearchTextInputModal,
  comments,
  orders,
  classifieds,
  homeClassifieds,
  classified,
  classifiedFavorites,
  newClassified,
  classifiedProps,
  shipmentFees,
  version,
  linking,
  propertiesModal,
  tags,
  pages,
  latestProducts,
  onSaleProducts,
  hotDealsProducts,
  bestSaleProducts,
  video,
  roles,
  role,
  resetApp,
  searchModal,
  elementType,
});

export default reducers;
