import {createSelector} from 'reselect';

const designers = state => state.designers;
const cart = state => state.cart;
const commercials = state => state.commercials;
const slides = state => state.slides;
const products = state => state.products;
const services = state => state.services;
const homeProducts = state => state.homeProducts;
const productFavorites = state => state.productFavorites;
const videos = state => state.videos;
const users = state => state.users;
const categories = state => state.categories;
const brands = state => state.brands;
const companies = state => state.companies;
const splashes = state => state.splashes;
const galleries = state => state.galleries;
const searchParams = state => state.searchParams;

export const brandsSelector = createSelector(
  brands,
  brands => brands
);
export const commercialsSelector = createSelector(
  commercials,
  commercials => commercials
);
export const slidesSelector = createSelector(
  slides,
  slides => slides
);
export const productsSelector = createSelector(
  products,
  products => products
);
export const servicesSelector = createSelector(
  services,
  services => services
);
export const homeProductsSelector = createSelector(
  homeProducts,
  homeProducts => homeProducts
);
export const productFavoritesSelector = createSelector(
  productFavorites,
  productFavorites => productFavorites
);
export const videosSelector = createSelector(
  videos,
  videos => videos
);
export const usersSelector = createSelector(
  users,
  users => users
);
export const categoriesSelector = createSelector(
  categories,
  categories => categories
);
export const companiesSelector = createSelector(
  companies,
  companies => companies
);
export const splashesSelector = createSelector(
  splashes,
  splashes => splashes
);
export const galleriesSelector = createSelector(
  galleries,
  galleries => galleries
);
export const cartSelector = createSelector(
  cart,
  cart => cart
);
export const designersSelector = createSelector(
  designers,
  designers => designers
);

export const searchParamsSelector = createSelector(
  searchParams,
  searchParams => searchParams
);
