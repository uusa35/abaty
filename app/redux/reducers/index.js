import {combineReducers} from 'redux';
import navReducer from './navReducer';
import isLoading from './isLoading';
import isLoadingContent from './isLoadingContent';
import isLoadingProfile from './isLoadingProfile';
import bootStrapped from './bootStrapped';
import settings from './settings';
import lang from './lang';
import message from './message';
import users from './users';
import user from './user';
import categories from './categories';
import category from './category';
import brands from './brands';
import brand from './brand';
import designers from './designers';
import designer from './designer';
import celebrities from './celebrities';
import celebrity from './celebrity';
import companies from './companies';
import company from './company';
import countries from './countries';
import country from './country';
import currency from './currency';
import galleries from './galleries';
import deviceId from './deviceId';
import commercials from './commercials';
import slides from './slides';
import splashes from './splashes';
import product from './product';
import homeProducts from './homeProducts';
import homeCollections from './homeCollections';
import productFavorites from './productFavorites';
import products from './products';
import collection from './collection';
import collections from './collections';
import services from './services';
import homeServices from './homeServices';
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
import {reducer as network} from 'react-native-offline';
import searchParams from './searchParams';
import commentModal from './commentModal';
import comments from './comments';
import orders from './orders';

let reducers = combineReducers({
  nav: navReducer,
  isLoading,
  isLoadingContent,
  isLoadingProfile,
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
  productFavorites,
  videos,
  cart,
  total,
  grossTotal,
  users,
  user,
  categories,
  category,
  brand,
  brands,
  company,
  companies,
  designer,
  designers,
  celebrity,
  celebrities,
  countries,
  splashes,
  country,
  currency,
  galleries,
  deviceId,
  playerId,
  guest,
  auth,
  token,
  countryModal,
  linking,
  coupon,
  network,
  searchParams,
  loginModal,
  showIntroduction,
  commentModal,
  comments,
  orders
});

export default reducers;
