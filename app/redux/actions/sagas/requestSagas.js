import * as actions from '../types';
import {call, put, all, select} from 'redux-saga/effects';
import validate from 'validate.js';
import * as api from '../api';
import I18n from '../../../I18n';
import {NavigationActions} from 'react-navigation';
import {
  disableLoading,
  enableErrorMessage,
  enableLoading,
  enableSuccessMessage,
  enableWarningMessage
} from './settingSagas';
import {isNull, uniqBy, remove, map, sumBy, first} from 'lodash';
import {setCurrency} from '../../../helpers';
import axios from 'axios';
import {startAppBootStrap} from './appSagas';
import {registerConstrains, submitLogin} from '../../../constants';

export function* setHomeCategories() {
  try {
    const categories = yield call(api.getHomeCategories);
    console.log('categories', categories);
    if (!validate.isEmpty(categories) && validate.isArray(categories)) {
      yield put({type: actions.SET_CATEGORIES, payload: categories});
    } else {
      yield put({type: actions.SET_CATEGORIES, payload: []});
    }
  } catch (e) {
    yield all([disableLoading, enableWarningMessage(I18n.t('no_categories'))]);
  }
}

export function* startRefetchHomeCategories() {
  yield call(setHomeCategories);
}

export function* setSettings() {
  const settings = yield call(api.getSettings);
  try {
    if (!validate.isEmpty(settings) && validate.isObject(settings)) {
      yield put({type: actions.SET_SETTINGS, payload: settings});
    }
  } catch (e) {
    // console.log('the e from settings', e);
    yield all([disableLoading, enableWarningMessage(I18n.t('no_settings'))]);
  }
}

export function* setUsers(action) {
  try {
    const searchElements = action.payload;
    const users = yield call(api.getUsers, searchElements);
    if (!validate.isEmpty(users) && validate.isArray(users)) {
      yield put({type: actions.SET_USERS, payload: users});
      yield put(
        NavigationActions.navigate({
          routeName: 'UserIndex',
          params: {
            name: action.payload.name,
            searchElements
          }
        })
      );
    } else {
      yield put({type: actions.SET_USERS, payload: []});
      throw I18n.t(users);
    }
  } catch (e) {
    // console.log('the e from setusers', e);
    yield all([disableLoading, enableWarningMessage(e)]);
  }
}

export function* startRefetchUserScenario(action) {
  yield call(setUsers, action);
}

export function* setCommercials() {
  try {
    const commercials = yield call(api.getCommercials);
    if (!validate.isEmpty(commercials) && validate.isArray(commercials)) {
      yield put({type: actions.SET_COMMERCIALS, payload: commercials});
    } else {
      yield put({type: actions.SET_COMMERCIALS, payload: []});
    }
  } catch (e) {
    // console.log('the e from set Commercials', e)
    yield all([disableLoading, enableWarningMessage(I18n.t('no_commercials'))]);
  }
}

export function* setSlides() {
  try {
    const slides = yield call(api.getSlides, {on_home: true});
    if (!validate.isEmpty(slides) && validate.isArray(slides)) {
      yield all([put({type: actions.SET_HOME_SLIDERS, payload: slides})]);
    }
  } catch (e) {
    yield all([disableLoading, enableWarningMessage(I18n.t('no_slides'))]);
  }
}

export function* setProducts() {
  try {
    const products = yield call(api.getProducts);
    if (!validate.isEmpty(products) && validate.isArray(products)) {
      yield all([put({type: actions.SET_PRODUCTS, payload: products})]);
    }
  } catch (e) {
    // console.log('the e from set setProducts', e)
    yield all([disableLoading, enableErrorMessage(I18n.t('no_products'))]);
  }
}

export function* setHomeProducts() {
  try {
    const products = yield call(api.getHomeProducts);
    if (!validate.isEmpty(products) && validate.isArray(products)) {
      yield all([put({type: actions.SET_HOME_PRODUCTS, payload: products})]);
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('no_home_products'))]);
  }
}

export function* getProductIndex() {
  try {
    const products = yield call(api.getProducts);
    if (!validate.isEmpty(products) && validate.isArray(products)) {
      yield all([put({type: actions.SET_PRODUCTS, payload: products})]);
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('no_products'))]);
  }
}

export function* setCountries() {
  try {
    const countries = yield call(api.getCountries);
    if (!validate.isEmpty(countries) && validate.isArray(countries)) {
      yield put({type: actions.SET_COUNTRIES, payload: countries});
    } else {
      throw I18n.t('no_countries');
    }
  } catch (e) {
    // console.log('the e from set setcountries', e)
    yield all([disableLoading, enableErrorMessage(I18n.t('no_countries'))]);
  }
}

// get the country if it' snot set
export function* getCountry(country_id = null) {
  try {
    const {country} = yield select();
    if (validate.isEmpty(country)) {
      console.log('now inside the empty case');
      const country = isNull(country_id)
        ? yield call(api.getCountry)
        : yield call(api.getCountry, country_id);
      if (!validate.isEmpty(country)) {
        yield call(startSetCountryScenario, {payload: country});
      }
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('no_country'))]);
  }
}

export function* startSetCountryScenario(action) {
  try {
    const country = action.payload;
    if (!validate.isEmpty(country)) {
      const {total, coupon} = yield select();
      yield all([
        put({type: actions.SET_CURRENCY, payload: country.currency.symbol}),
        call(setGrossTotalCartValue, {total, coupon, country})
      ]);
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('no_country'))]);
  }
}

export function* startGetUserScenario(action) {
  try {
    const user = yield call(api.getUser, action.payload);
    if (!validate.isEmpty(user) && validate.isObject(user)) {
      yield put({type: actions.SET_USER, payload: user});
      yield put(
        NavigationActions.navigate({
          routeName: 'DesignerShow',
          params: {name: user.slug, id: user.id, product: false}
        })
      );
    } else {
      throw I18n.t('no_user');
    }
  } catch (e) {
    // console.log('the e from set get user scnario', e)
    yield all([disableLoading, enableErrorMessage(I18n.t('no_users'))]);
  }
}

export function* startGetUsersScenario(action) {
  yield call(setUsers, action);
}

export function* startGetDesignerScenario(action) {
  console.log('start');
  try {
    const {element, searchElements} = action.payload;
    const user = yield call(api.getUser, element.id);
    if (!validate.isEmpty(user) && validate.isObject(user)) {
      console.log('the designer', user);
      yield put({type: actions.SET_DESIGNER, payload: user});
      yield put({type: actions.SET_PRODUCTS, payload: user.productGroup});
      yield put({type: actions.SET_SEARCH_PARAMS, payload: searchElements});
      yield put(
        NavigationActions.navigate({
          routeName: 'DesignerShow',
          params: {name: user.slug, id: user.id, product: false}
        })
      );
    } else {
      yield put({type: actions.SET_DESIGNER, payload: {}});
      throw I18n.t('no_designers');
    }
  } catch (e) {
    yield all([disableLoading, enableWarningMessage(I18n.t('no_designers'))]);
  }
}

export function* startGetProductScenario(action) {
  try {
    const product = yield call(api.getProduct, action.payload);
    if (!validate.isEmpty(product) && validate.isObject(product)) {
      yield all([
        put({type: actions.SET_PRODUCT, payload: product}),
        put(
          NavigationActions.navigate({
            routeName: 'Product',
            params: {name: product.name_ar, id: product.id, product: true}
          })
        )
      ]);
    } else {
      throw I18n.t('error_while_loading_product');
    }
  } catch (e) {
    // console.log('the e from set Commercials', e)
    yield all([
      disableLoading,
      enableWarningMessage(I18n.t('error_while_loading_product'))
    ]);
  }
}

export function* startGetSearchProductsScenario(action) {
  try {
    const {element, searchElements} = action.payload;
    const products = yield call(api.getSearchProducts, searchElements);
    if (!validate.isEmpty(products) && validate.isArray(products)) {
      yield all([
        put({type: actions.SET_PRODUCTS, payload: products}),
        put({type: actions.SET_SEARCH_PARAMS, payload: searchElements}),
        put({type: actions.SET_SEARCH_PARAMS, payload: searchElements}),
        put(
          NavigationActions.navigate({
            routeName: 'ProductIndex',
            params: {name: element ? element.name : I18n.t('products')}
          })
        )
      ]);
    } else {
      throw I18n.t('no_products');
    }
  } catch (e) {
    yield all([disableLoading, enableWarningMessage(I18n.t('no_products'))]);
  }
}

export function* startGetAllProductsScenario(action) {
  try {
    const products = yield call(api.getSearchProducts, action.payload);
    if (!validate.isEmpty(products) && validate.isArray(products)) {
      yield all([
        put({type: actions.SET_PRODUCTS, payload: products}),
        put({type: actions.SET_SEARCH_PARAMS, payload: {}}),
        put(
          NavigationActions.navigate({
            routeName: 'ProductIndexAll',
            params: {name: I18n.t('all_products')}
          })
        )
      ]);
    } else {
      throw I18n.t('no_products');
    }
  } catch (e) {
    yield all([disableLoading, enableWarningMessage(I18n.t('no_products'))]);
  }
}

export function* startDeepLinkingScenario(action) {
  try {
    const {routeName, id} = action.payload;
    if (!isNull(routeName)) {
      if (routeName === 'user') {
        console.log('routeName is', routeName);
        yield put({type: actions.GET_USER, payload: id});
      } else {
        yield put({type: actions.GET_PRODUCT, payload: id});
        // yield put(
        //   NavigationActions.navigate({
        //     routeName: upperFirst(routeName),
        //     params: {id}
        //   })
        // );
      }
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('no_deep_product'))]);
  }
}

export function* startStorePlayerIdScenario(action) {
  try {
    yield call(api.storePlayerId, action.payload);
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('no_player_id'))]);
  }
}

export function* setHomeBrands() {
  try {
    const brands = yield call(api.getHomeBrands);
    if (!validate.isEmpty(brands) && validate.isArray(brands)) {
      yield put({type: actions.SET_BRANDS, payload: brands});
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('no_brands'))]);
  }
}

export function* setHomeDesigners() {
  try {
    const designers = yield call(api.getHomeDesigners);
    if (!validate.isEmpty(designers) && validate.isArray(designers)) {
      yield put({type: actions.SET_DESIGNERS, payload: designers});
    } else {
      yield put({type: actions.SET_DESIGNERS, payload: []});
      throw designers;
    }
  } catch (e) {
    yield all([
      disableLoading,
      enableWarningMessage(I18n.t('no_home_designers'))
    ]);
  }
}

export function* setHomeCelebrities() {
  try {
    const celebrities = yield call(api.getHomeCelebrities);
    if (!validate.isEmpty(celebrities) && validate.isArray(celebrities)) {
      yield put({type: actions.SET_CELEBRITIES, payload: celebrities});
    } else {
      yield put({type: actions.SET_DESIGNERS, payload: []});
      throw celebrities;
    }
  } catch (e) {
    yield all([disableLoading, enableWarningMessage(I18n.t('no_celebrities'))]);
  }
}

export function* startRefetchHomeElementsScenario() {
  try {
    yield all([
      call(setSettings),
      call(setHomeCategories),
      call(setCountries),
      call(setSlides),
      call(setCommercials),
      call(setHomeBrands),
      call(setHomeProducts),
      call(getProductIndex),
      call(setHomeDesigners),
      call(setHomeCelebrities),
      call(setHomeSplashes),
      call(startAuthenticatedScenario)
    ]);
  } catch (e) {
    yield all([
      disableLoading,
      enableErrorMessage(I18n.t('refetch_home_error'))
    ]);
  }
}

export function* setHomeSplashes() {
  try {
    const splashes = yield call(api.getSplashes);
    if (!validate.isEmpty(splashes) && validate.isObject(splashes)) {
      yield put({type: actions.SET_HOME_SPLASHES, payload: splashes});
    } else {
      throw I18n.t('no_splashes');
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('no_splashes'))]);
  }
}

export function* startAddToCartScenario(action) {
  try {
    const {cart} = yield select();
    const filteredCart = yield call(filterCartAnItems, [cart, action]);
    yield all([
      call(enableSuccessMessage, I18n.t('product_added_to_cart_successfully')),
      put({type: actions.FILTER_CART, payload: filteredCart}),
      call(setTotalCartValue, filteredCart)
    ]);
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(e)]);
  }
}

export function* setTotalCartValue(cart) {
  try {
    if (!validate.isEmpty(cart) && cart.length > 0) {
      const total = sumBy(cart, i => i.element.finalPrice * i.qty);
      const {coupon, country} = yield select();
      yield all([
        put({type: actions.SET_TOTAL_CART, payload: total}),
        call(setGrossTotalCartValue, {total, coupon, country})
      ]);
    } else {
      throw 'Cart is Empty';
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('cart_is_empty'))]);
  }
}

export function* setGrossTotalCartValue(values) {
  try {
    const {total, coupon, country} = values;
    console.log('vals', values);
    if (!validate.isEmpty(total) && total > 0) {
      const grossTotal = parseFloat(
        total +
          country.fixed_shipment_charge -
          (!validate.isEmpty(coupon) ? coupon.value : 0)
      );
      yield put({type: actions.SET_GROSS_TOTAL_CART, payload: grossTotal});
    } else {
      throw 'Cart is Empty';
    }
  } catch (e) {
    yield all([
      disableLoading,
      enableErrorMessage(I18n.t('cart_is_empty_gross_total'))
    ]);
  }
}

export function* startRemoveFromCartScenario(action) {
  try {
    console.log('the action payload from remove Cart', action.payload);
    const {cart} = yield select();
    console.log('the action', action.payload);
    const filteredCart = remove(
      cart,
      item => item.product_id !== action.payload
    );
    if (!validate.isEmpty(filteredCart) && cart.length > 0) {
      yield all([
        call(setTotalCartValue, filteredCart),
        call(
          enableSuccessMessage,
          I18n.t('product_removed_to_cart_successfully')
        ),
        put({type: actions.FILTER_CART, payload: filteredCart})
      ]);
    } else {
      yield all([
        call(startClearCartScenario),
        call(enableWarningMessage, I18n.t('cart_cleared')),
        put(
          NavigationActions.navigate({
            routeName: 'Home'
          })
        )
      ]);
    }
  } catch (e) {
    yield all([
      disableLoading,
      enableErrorMessage(I18n.t('error_removing_product_from_cart'))
    ]);
  }
}

export function* filterCartAnItems([cart, action]) {
  let cleanCart = map(cart, e => {
    // check if cart_id is available (means this product has_attributes true)
    if (e.product_id === action.payload.product_id) {
      return action.payload;
    }
    return e;
  });
  const filteredCart =
    cart.length > 0
      ? uniqBy(
          cleanCart,
          isNull(action.payload.cart_id) ? 'product_id' : 'cart_id'
        )
      : [action.payload];
  return filteredCart;
}

export function* startClearCartScenario() {
  try {
    yield all([
      put({type: actions.CLEAR_CART, payload: []}),
      put({type: actions.REMOVE_COUPON}),
      put({type: actions.SET_TOTAL_CART, payload: 0}),
      put({type: actions.SET_GROSS_TOTAL_CART, payload: 0})
    ]);
  } catch (e) {
    yield all([
      disableLoading,
      enableErrorMessage(I18n.t('authenticated_error'))
    ]);
  }
}

export function* startAuthenticatedScenario() {
  try {
    const {token} = yield select();
    if (!validate.isEmpty(token)) {
      const user = yield call(api.authenticated, token); // get the auth user according to auth stored in storage
      console.log('the user', user);
      if (!validate.isEmpty(user) && !validate.isEmpty(token)) {
        yield all([
          put({type: actions.SET_AUTH, payload: user}),
          put({type: actions.SET_TOKEN, payload: user.token}),
          put({type: actions.TOGGLE_GUEST, payload: false})
        ]);
      }
    }
  } catch (e) {
    console.log('the eeeeeeee from startAuth');
    yield all([
      disableLoading,
      enableErrorMessage(I18n.t('authenticated_error'))
    ]);
  }
}

export function* startLogoutScenario() {
  try {
    yield all([
      put({type: actions.REMOVE_TOKEN, payload: ''}),
      put({type: actions.TOGGLE_GUEST, payload: true})
    ]);
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('logout_error'))]);
  }
}

export function* startAuthenticateScenario(action) {
  console.log('action', action);
}

export function* startSubmitAuthScenario(action) {
  try {
    const {email, password} = action.payload;
    const {player_id} = yield select();
    const result = validate(
      {
        email,
        password
      },
      submitLogin
    );
    if (!validate.isEmpty(result)) {
      throw I18n.t('invalid_email_or_password');
    }
    const user = yield call(api.authenticate, {email, password, player_id});
    if (!validate.isEmpty(user) && validate.isObject(user)) {
      console.log('the user', user);
      const favorites = yield call(api.getFavorites, {
        params: {api_token: user.api_token}
      });
      console.log('the favorites', favorites);
      yield all([
        put({type: actions.SET_TOKEN, payload: user.api_token}),
        put({type: actions.SET_AUTH, payload: user}),
        put({type: actions.TOGGLE_GUEST, payload: false}),
        put({
          type: actions.SET_PRODUCT_FAVORITES,
          payload: validate.isArray(favorites) ? favorites : []
        }),
        call(enableSuccessMessage, I18n.t('login_success')),
        put(
          NavigationActions.navigate({
            routeName: 'Home'
          })
        )
      ]);
    } else {
      throw user;
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(e)]);
  }
}

export function* startUpdateUserScenario(action) {
  try {
    console.log('the payload', action.payload);
    const user = yield call(api.updateUser, action.payload);
    if (!validate.isEmpty(user) && validate.isObject(user)) {
      yield all([
        put({type: actions.SET_AUTH, payload: user}),
        call(enableSuccessMessage, I18n.t('update_information_success'))
      ]);
    } else {
      throw user;
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(e)]);
  }
}

export function* startGetCouponScenario(action) {
  try {
    const {total} = yield select();
    if (validate.isEmpty(action.payload)) {
      throw I18n.t('coupon_is_empty');
    }
    const coupon = yield call(api.getCoupon, {code: action.payload, total});
    if (!validate.isEmpty(coupon) && validate.isObject(coupon)) {
      const {total, country} = yield select;
      yield all([
        put({type: actions.SET_COUPON, payload: coupon}),
        call(setGrossTotalCartValue, {total, coupon, country}),
        call(enableSuccessMessage, I18n.t('coupon_is_added_and_applied'))
      ]);
    } else {
      yield put({type: actions.SET_COUPON, payload: {}});
      throw I18n.t('coupon_is_not_correct');
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(e)]);
  }
}

export function* startCreateMyFatorrahPaymentUrlScenario(action) {
  console.log('the action payload', action.payload);
  try {
    const {name, mobile, email, address} = action.payload;
    const result = validate({name, mobile, email, address}, registerConstrains);
    if (validate.isEmpty(result)) {
      yield call(enableLoading, I18n.t('create_payment_url'));
      const url = yield call(api.makeMyFatoorahPayment, action.payload);
      if (validate.isObject(url) && url.paymentUrl.includes('https')) {
        yield all([
          call(disableLoading),
          put(
            NavigationActions.navigate({
              routeName: 'PaymentIndex',
              params: {
                paymentUrl: url.paymentUrl
              }
            })
          )
        ]);
      } else {
        throw url;
      }
    } else {
      throw I18n.t('information_you_entered_not_correct');
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(e)]);
  }
}

export function* startCreateTapPaymentUrlScenario(action) {
  console.log('the action payload', action.payload);
  try {
    const url = yield call(api.makeTapPayment, action.payload);
    console.log('the payment url', url.paymentUrl);
    if (validate.isObject(url) && url.paymentUrl.includes('http')) {
      yield all([
        put(
          NavigationActions.navigate({
            routeName: 'PaymentIndex',
            params: {
              paymentUrl: url.paymentUrl
            }
          })
        )
      ]);
    } else {
      throw url;
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(e)]);
  }
}

export function* startRegisterScenario(action) {
  console.log('the action payload', action.payload);
  try {
    const {name, mobile, email, address} = action.payload;
    const result = validate({name, mobile, email, address}, registerConstrains);
    if (validate.isEmpty(result)) {
      const user = yield call(api.register, action.payload);
      if (validate.isObject(user) && !validate.isEmpty(user)) {
        const {email, password} = action.payload;
        yield put({type: actions.SUBMIT_AUTH, payload: {email, password}});
        yield all([
          call(enableSuccessMessage, I18n.t('register_success')),
          put(
            NavigationActions.navigate({
              routeName: 'Home'
            })
          )
        ]);
      } else {
        throw user;
      }
    } else {
      throw I18n.t('information_you_entered_not_correct');
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(e)]);
  }
}

export function* toggleFavoriteScenario(action) {
  try {
    const products = yield call(api.toggleFavorite, action.payload);
    console.log('products', products);
    if (!validate.isEmpty(products) && validate.isArray(products)) {
      yield all([
        put({type: actions.SET_PRODUCT_FAVORITES, payload: products}),
        call(enableWarningMessage, I18n.t('favorite_success'))
      ]);
    } else {
      yield put({type: actions.SET_PRODUCT_FAVORITES, payload: []});
      throw products;
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(e)]);
  }
}
