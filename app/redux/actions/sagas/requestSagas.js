import * as actions from '../types';
import {call, put, all, select, delay} from 'redux-saga/effects';
import validate from 'validate.js';
import * as api from '../api';
import I18n from '../../../I18n';
import {NavigationActions} from 'react-navigation';
import {
  disableLoading,
  disableLoadingContent,
  disableLoadingProfile,
  enableErrorMessage,
  enableLoading,
  enableLoadingContent,
  enableLoadingProfile,
  enableSuccessMessage,
  enableWarningMessage,
  getCategories
} from './settingSagas';
import {isNull, uniqBy, remove, map, sumBy, first} from 'lodash';
import {startAppBootStrap} from './appSagas';
import {commentStoreConstrains, registerConstrains} from '../../../constants';
import {GoogleSignin} from 'react-native-google-signin';
import {
  getHomeCompanies,
  getSearchCompanies,
  setHomeBrands,
  startAuthenticatedScenario,
  startReAuthenticateScenario
} from './userSagas';
import {
  getBestSaleProducts,
  getHotDealsProducts,
  getLatestProducts,
  getOnSaleProducts,
  getProductIndex,
  setHomeProducts
} from './productSagas';
import {getHomeServicesScenario, getServiceIndex} from './serviceSagas';
import {startGetHomeClassifiedsScenario} from './classifiedSagas';
import {isArray} from 'lodash';
import {getHomeCategories} from '../api';

export function* startGetHomeCategoriesScenario(action) {
  try {
    const elements = yield call(api.getHomeCategories);
    if (!validate.isEmpty(elements) && isArray(elements)) {
      yield put({type: actions.SET_HOME_CATEGORIES, payload: elements});
    } else {
      yield put({type: actions.SET_HOME_CATEGORIES, payload: []});
    }
  } catch (e) {
    yield all([disableLoading, enableWarningMessage(I18n.t('no_categories'))]);
  }
}

export function* startRefetchHomeCategories() {
  yield put({type: actions.GET_HOME_CATEGORIES});
}

export function* startGetParentCategoriesScenario() {
  try {
    const elements = yield call(api.getParentCategories);
    if (!validate.isEmpty(elements) && isArray(elements)) {
      yield put({type: actions.SET_CATEGORIES, payload: elements});
    } else {
      yield put({type: actions.SET_CATEGORIES, payload: []});
    }
  } catch (e) {
    console.log('eee', e);
    yield all([call(disableLoading), call(enableErrorMessage, e)]);
  }
}

export function* setSettings() {
  const settings = yield call(api.getSettings);
  try {
    if (!validate.isEmpty(settings) && validate.isObject(settings)) {
      yield put({type: actions.SET_SETTINGS, payload: settings});
    }
  } catch (e) {
    yield all([disableLoading, enableWarningMessage(I18n.t('no_settings'))]);
  }
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

export function* getVideos() {
  try {
    const videos = yield call(api.getIndexVideo);
    if (!validate.isEmpty(videos) && validate.isArray(videos)) {
      yield put({type: actions.SET_VIDEOS, payload: videos});
    } else {
      yield put({type: actions.SET_VIDEOS, payload: []});
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('no_splashes'))]);
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
    yield all([disableLoading, enableErrorMessage(I18n.t('no_countries'))]);
  }
}

// get the country if it' snot set
export function* getCountry(country_id = null) {
  try {
    const country = isNull(country_id)
      ? yield call(api.getCountry)
      : yield call(api.getCountry, country_id);
    if (!validate.isEmpty(country)) {
      yield put({type: actions.SET_COUNTRY, payload: country});
      // yield put({type: actions.SET_CURRENCY, payload: country.currency_symbol});
      yield call(startSetCountryScenario, {payload: country});
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('no_country'))]);
  }
}

export function* startSetCountryScenario(action) {
  try {
    const country = action.payload;
    if (!validate.isEmpty(country) && validate.isObject(country)) {
      const {total, coupon} = yield select();
      yield all([
        put({type: actions.SET_CURRENCY, payload: country.currency.symbol}),
        put({type: actions.SET_AREAS, payload: country.areas}),
        put({type: actions.HIDE_COUNTRY_MODAL}),
        call(setGrossTotalCartValue, {total, coupon, country})
      ]);
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('no_country'))]);
  }
}

export function* startDeepLinkingScenario(action) {
  try {
    const {type, id} = action.payload;
    if (!isNull(type)) {
      if (type === 'user') {
        yield call(startGetUserScenario, {payload: id});
      } else if (type === 'product') {
        yield call(startGetProductScenario, {payload: {id}});
      }
    }
  } catch (e) {
    yield all([
      call(disableLoading),
      call(enableErrorMessage, I18n.t('no_deep_product'))
    ]);
  }
}

export function* startRefetchHomeElementsScenario() {
  try {
    yield all([
      call(setSettings),
      call(setCountries),
      call(setSlides),
      call(setCommercials),
      call(setHomeBrands),
      call(setHomeProducts),
      call(getOnSaleProducts),
      call(getBestSaleProducts),
      call(getHotDealsProducts),
      call(getLatestProducts),
      call(getServiceIndex),
      call(getHomeServicesScenario),
      call(getProductIndex),
      call(setHomeSplashes),
      call(getVideos),
      call(getPages),
      call(startReAuthenticateScenario),
      call(startGetHomeCategoriesScenario),
      put({type: actions.GET_CATEGORIES}),
      put({
        type: actions.GET_HOME_COMPANIES,
        payload: {searchParams: {on_home: 1, is_company: 1}}
      }),
      put({
        type: actions.GET_HOME_DESIGNERS,
        payload: {searchParams: {on_home: 1, is_designer: 1}}
      }),
      put({
        type: actions.GET_HOME_CELEBRITIES,
        payload: {searchParams: {on_home: 1, is_celebrity: 1}}
      }),
      put({
        type: actions.GET_HOME_CLASSIFIEDS,
        payload: {searchParams: {on_home: 1}}
      })
    ]);
  } catch (e) {
    console.log('the ee', e);
    yield all([
      call(disableLoading),
      call(enableErrorMessage, I18n.t('refetch_home_error'))
    ]);
  }
}

export function* setHomeSplashes() {
  try {
    const splashes = yield call(api.getSplashes);
    if (!validate.isEmpty(splashes) && validate.isObject(splashes)) {
      yield put({type: actions.SET_HOME_SPLASHES, payload: splashes});
    } else {
      yield put({type: actions.SET_HOME_SPLASHES, payload: []});
    }
  } catch (e) {
    yield all([
      call(disableLoading),
      call(enableErrorMessage, I18n.t('no_splashes'))
    ]);
  }
}

export function* startAddToCartScenario(action) {
  try {
    const {cart, country} = yield select();
    if (!country.is_local && action.payload.type === 'service') {
      throw I18n.t(
        'orders_that_include_services_are_not_accepted_out_side_kuwait'
      );
    } else {
      const filteredCart = yield call(filterCartAnItems, [cart, action]);
      yield all([
        call(
          enableSuccessMessage,
          I18n.t(`${action.payload.type}_added_to_cart_successfully`)
        ),
        put({type: actions.FILTER_CART, payload: filteredCart}),
        put({type: actions.SET_COUPON, payload: {}}),
        call(setTotalCartValue, filteredCart)
      ]);
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableErrorMessage, e)]);
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
    yield all([
      call(disableLoading),
      call(enableErrorMessage, I18n.t('cart_is_empty'))
    ]);
  }
}

export function* setGrossTotalCartValue(values) {
  try {
    const {total, coupon, country} = values;
    const {cart} = yield select();
    const countPieces = sumBy(cart, i => i.qty);
    __DEV__ ? console.log('the total', total) : null;
    if (!validate.isEmpty(total) && total > 0) {
      __DEV__ ? console.log('the coupon from calculating', coupon) : null;
      const finalShipment = country.is_local
        ? country.fixed_shipment_charge
        : country.fixed_shipment_charge * countPieces;
      const grossTotal = parseFloat(
        total + finalShipment - (!validate.isEmpty(coupon) ? coupon.value : 0)
      );
      yield put({type: actions.SET_GROSS_TOTAL_CART, payload: grossTotal});
      yield put({type: actions.SET_SHIPMENT_FEES, payload: finalShipment});
      __DEV__ ? console.log('the grossTotal Now is ::::', grossTotal) : null;
    }
  } catch (e) {
    yield all([
      call(disableLoading),
      call(enableErrorMessage, I18n.t('cart_is_empty_gross_total'))
    ]);
  }
}

export function* startRemoveFromCartScenario(action) {
  try {
    const {cart} = yield select();
    const filteredCart = remove(cart, item =>
      item.type === 'product'
        ? item.product_id !== action.payload
        : item.service_id !== action.payload
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
      call(disableLoading),
      call(enableErrorMessage, I18n.t('error_removing_product_from_cart'))
    ]);
  }
}

export function* filterCartAnItems([cart, action]) {
  let cleanCart = map(cart, e => {
    // check if cart_id is available (means this product has_attributes true)
    if (e.type == 'product') {
      if (e.product_id === action.payload.product_id) {
        return action.payload;
      }
      return e;
    } else if (e.type == 'service') {
      if (e.service_id === action.payload.service_id) {
        return action.payload;
      }
      return e;
    }
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
      call(disableLoading),
      call(enableErrorMessage, I18n.t('authenticated_error'))
    ]);
  }
}

export function* startSubmitCartScenario(action) {
  try {
    const {name, mobile, email, address, country_id, notes} = action.payload;
    const result = validate({name, mobile, email, address}, registerConstrains);
    if (validate.isEmpty(result)) {
      yield put(
        NavigationActions.navigate({
          routeName: 'CartConfirmation',
          params: {
            cName: name,
            cEmail: email,
            cMobile: mobile,
            cAddress: address,
            country_id,
            cNotes: notes
          }
        })
      );
    } else {
      throw result['name']
        ? result['name'].toString()
        : null || result['email']
        ? result['email'].toString()
        : null || result['mobile']
        ? result['mobile'].toString()
        : null || result['address']
        ? result['address'].toString()
        : null;
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableErrorMessage, e)]);
  }
}

export function* startGetCouponScenario(action) {
  try {
    const {total, country} = yield select();
    if (validate.isEmpty(action.payload)) {
      throw I18n.t('coupon_is_empty');
    }
    const coupon = yield call(api.getCoupon, {code: action.payload, total});
    if (!validate.isEmpty(coupon) && validate.isObject(coupon)) {
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
    yield all([call(disableLoading), call(enableErrorMessage, e)]);
  }
}

export function* startCreateMyFatorrahPaymentUrlScenario(action) {
  try {
    yield call(enableLoading);
    const {name, mobile, email, address} = action.payload;
    const result = validate({name, mobile, email, address}, registerConstrains);
    if (validate.isEmpty(result)) {
      yield call(enableLoading, I18n.t('create_payment_url'));
      const url = yield call(api.makeMyFatoorahPayment, action.payload);
      if (validate.isObject(url) && url.paymentUrl.includes('https')) {
        yield call(disableLoading);
        yield put(
          NavigationActions.navigate({
            routeName: 'PaymentIndex',
            params: {
              paymentUrl: url.paymentUrl
            }
          })
        );
      } else {
        throw url;
      }
    } else {
      throw I18n.t('information_you_entered_not_correct');
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableErrorMessage, e)]);
  }
}

export function* startCreateTapPaymentUrlScenario(action) {
  try {
    yield call(enableLoading);
    console.log('the action payload', action);
    const url = yield call(api.makeTapPayment, action.payload);
    if (validate.isObject(url) && url.paymentUrl.includes('http')) {
      yield call(disableLoading);
      yield put(
        NavigationActions.navigate({
          routeName: 'PaymentIndex',
          params: {
            paymentUrl: url.paymentUrl
          }
        })
      );
    } else {
      throw url;
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableErrorMessage, e)]);
  }
}

export function* startBecomeFanScenario(action) {
  try {
    const {id, fanMe} = action.payload;
    const user = yield call(api.becomeFan, id);
    if (!validate.isEmpty(user) && validate.isObject(user)) {
      fanMe
        ? yield call(enableSuccessMessage, I18n.t('fan_success'))
        : yield call(enableWarningMessage, I18n.t('fan_deactivated'));
    }
  } catch (e) {
    yield all([
      call(disableLoading),
      call(enableErrorMessage, I18n.t('fan_error'))
    ]);
  }
}

export function* startAddCommentScenario(action) {
  try {
    yield put({type: actions.HIDE_COMMENT_MODAL});
    const {title, content} = action.payload;
    const result = validate({title, content}, commentStoreConstrains);
    if (validate.isEmpty(result)) {
      const comment = yield call(api.addComment, action.payload);
      if (!validate.isEmpty(comment) && validate.isObject(comment)) {
        yield call(enableSuccessMessage, I18n.t('comment_added_success'));
      }
    } else {
      throw result['title']
        ? result['title'].toString()
        : null || result['content']
        ? result['content'].toString()
        : null;
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableErrorMessage, e)]);
  }
}

export function* startGoogleLoginScenario() {
  try {
    const signIn = yield call(GoogleSignin.hasPlayServices);
    if (signIn) {
      const userInfo = yield call(GoogleSignin.signIn);
      if (!validate.isEmpty(userInfo)) {
        const {email, name} = userInfo.user;
        const user = yield call(api.googleAuthenticate, {email, name});
        if (validate.isObject(user) && !validate.isEmpty(user)) {
          yield all([
            put({type: actions.SET_TOKEN, payload: user.api_token}),
            put({type: actions.SET_AUTH, payload: user}),
            put({type: actions.TOGGLE_GUEST, payload: false}),
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
      }
    }
  } catch (e) {
    console.log('the error', e);
    yield all([call(disableLoading), call(enableErrorMessage, e)]);
  }
}

export function* getPages() {
  try {
    const pages = yield call(api.getPages);
    if (!validate.isEmpty(pages) && validate.isArray(pages)) {
      yield put({type: actions.SET_PAGES, payload: pages});
    } else {
      yield put({type: actions.SET_PAGES, payload: []});
    }
  } catch (e) {
    yield all([
      call(disableLoading),
      call(enableErrorMessage, I18n.t('no_pages'))
    ]);
  }
}

export function* getTags() {
  try {
    const tags = yield call(api.getTags);
    if (!validate.isEmpty(tags) && validate.isArray(tags)) {
      yield put({type: actions.SET_TAGS, payload: tags});
    } else {
      yield put({type: actions.SET_TAGS, payload: []});
    }
  } catch (e) {
    yield all([
      call(disableLoading),
      call(enableErrorMessage, I18n.t('no_tags'))
    ]);
  }
}
