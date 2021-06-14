import * as actions from '../types';
import {call, put, all, select, delay} from 'redux-saga/effects';
import validate from 'validate.js';
import * as api from '../api';
import I18n from '../../../I18n';
import * as RootNavigation from './../../../RootNavigation.js';
import {
  disableLoading,
  enableErrorMessage,
  enableLoading,
  enableSuccessMessage,
  enableWarningMessage,
  startGoogleAnalyticsScenario,
} from './settingSagas';
import {
  isNull,
  uniqBy,
  remove,
  map,
  sumBy,
  first,
  filter,
  last,
  pickBy,
} from 'lodash';
import {enableResetApp} from './settingSagas';
import {
  commentStoreConstrains,
  registerConstrains,
} from '../../../constants/validations';
import {GoogleSignin} from '@react-native-community/google-signin';
import {
  startGetCelebrityScenario,
  startGetCompanyScenario,
  startGetDesignerScenario,
  startGetSearchCompaniesScenario,
  startGetShopperScenario,
  startReAuthenticateScenario,
} from './userSagas';
import {startGetProductScenario} from './productSagas';
import {startGetClassifiedScenario} from './classifiedSagas';
import {SET_CATEGORY} from '../types';
import {startResetStoreScenario} from './appSagas';
import {
  ABATI,
  ESCRAP,
  EXPO,
  HOMEKEY,
  MALLR,
  DAILY,
  DESIGNERAT,
  ISTORES,
  IHOUSES,
} from '../../../../app';
import {expoBootStrap} from './expo/appSagas';
import {dailyBootStrap} from './daily/appSagas';
import {startGetServiceScenario} from './serviceSagas';
import shipmentFees from '../../reducers/shipmentFees';
import {designeratBootStrap} from './designerat/appSagas';
import {istoresBootStrap} from './istores/appSagas';
import {isLocal} from '../../../env';
import {abatiBootStrap} from './abati/appSagas';
import DeviceInfo from 'react-native-device-info';

export function* startGetHomeCategoriesScenario(action) {
  try {
    const elements = yield call(api.getHomeCategories, {on_home: true});
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield put({type: actions.SET_HOME_CATEGORIES, payload: elements});
      const {category} = yield select();
      if (validate.isEmpty(category)) {
        yield put({type: SET_CATEGORY, payload: first(elements)});
      }
    } else {
      yield put({type: actions.SET_HOME_CATEGORIES, payload: []});
    }
  } catch (e) {
    if (__DEV__) {
      // // console.log('the e', e);
    }
    // yield all([disableLoading, enableWarningMessage(I18n.t('no_categories'))]);
  }
}

export function* startRefetchHomeCategories() {
  yield put({type: actions.GET_HOME_CATEGORIES});
}

export function* startGetParentCategoriesScenario() {
  try {
    const elements = yield call(api.getHomeCategories, {is_parent: true});
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield put({type: actions.SET_CATEGORIES, payload: elements});
    } else {
      yield put({type: actions.SET_CATEGORIES, payload: []});
    }
  } catch (e) {
    if (__DEV__) {
      // console.log('the e', e);
    }
    // console.log('eee', e);
    // yield all([call(disableLoading), call(enableErrorMessage, e)]);
  }
}

export function* setSettings() {
  try {
    const settings = yield call(api.getSettings);
    if (!validate.isEmpty(settings) && validate.isObject(settings)) {
      yield put({type: actions.SET_SETTINGS, payload: settings});
      yield put({type: actions.SET_VERSION, payload: DeviceInfo.getVersion()});
    }
  } catch (e) {
    if (__DEV__) {
      console.log('the e', e);
    }
    // yield all([disableLoading, enableWarningMessage(I18n.t('no_settings'))]);
  }
}

export function* setFaqs() {
  const elements = yield call(api.getFaqs);
  try {
    if (!validate.isEmpty(elements) && validate.isObject(elements)) {
      yield put({type: actions.SET_FAQS, payload: elements});
    }
  } catch (e) {
    if (__DEV__) {
      // console.log('the e', e);
    }
    // yield all([disableLoading, enableWarningMessage(I18n.t('no_settings'))]);
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
    if (__DEV__) {
      // console.log('the e', e);
    }
    // yield all([disableLoading, enableWarningMessage(I18n.t('no_commercials'))]);
  }
}

export function* setSlides() {
  try {
    const slides = yield call(api.getSlides, {on_home: true});
    if (!validate.isEmpty(slides) && validate.isArray(slides)) {
      yield put({type: actions.SET_HOME_SLIDERS, payload: slides});
    } else {
      yield put({type: actions.SET_HOME_SLIDERS, payload: []});
    }
  } catch (e) {
    if (__DEV__) {
      // console.log('the e', e);
    }
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
    if (__DEV__) {
      // console.log('the e', e);
    }
    // yield all([disableLoading, enableErrorMessage(I18n.t('no_splashes'))]);
  }
}

export function* setCountries() {
  try {
    const countries = yield call(api.getCountries);
    if (!validate.isEmpty(countries) && validate.isArray(countries)) {
      yield put({type: actions.SET_COUNTRIES, payload: countries});
      const localCountry = first(filter(countries, c => c.is_local));
      if (!validate.isEmpty(localCountry)) {
        yield put({type: actions.SET_SHIPMENT_COUNTRY, payload: localCountry});
      }
    } else {
      throw I18n.t('no_countries');
    }
  } catch (e) {
    if (__DEV__) {
      // console.log('the e', e);
    }
    // yield all([disableLoading, enableErrorMessage(I18n.t('no_countries'))]);
  } finally {
  }
}

export function* setCurrencies() {
  try {
    const elements = yield call(api.getCurrencies);
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield put({type: actions.SET_CURRENCIES, payload: elements});
      const element = first(filter(elements, c => c.country.is_local));
      if (!validate.isEmpty(element)) {
        yield put({type: actions.SET_CURRENCY, payload: element});
      }
    } else {
      throw I18n.t('no_currencies');
    }
  } catch (e) {
    if (__DEV__) {
      // console.log('the e', e);
    }
    // yield all([disableLoading, enableErrorMessage(I18n.t('no_countries'))]);
  } finally {
  }
}

// get the country if it' snot set
export function* getCountry(country_id = null) {
  try {
    const fetchedCountry = isNull(country_id)
      ? yield call(api.getCountry)
      : yield call(api.getCountry, country_id);
    if (
      !validate.isEmpty(fetchedCountry) &&
      validate.isObject(fetchedCountry) &&
      fetchedCountry.currency
    ) {
      yield call(startChooseCountryScenario, {
        payload: {country: fetchedCountry},
      });
    }
  } catch (e) {
    if (__DEV__) {
      // console.log('the e', e);
    }
    // yield all([disableLoading, enableErrorMessage(I18n.t('no_country'))]);
  } finally {
  }
}

export function* startChooseCountryScenario(action) {
  try {
    const {country, redirect} = action.payload;
    if (!validate.isEmpty(country) && validate.isObject(country)) {
      const {total, coupon, cart} = yield select();
      yield all([
        put({type: actions.SET_COUNTRY, payload: country}),
        put({type: actions.SET_CURRENCY, payload: country.currency}),
      ]);
      if (country.is_local && !validate.isEmpty(country.governates)) {
        yield all([
          put({type: actions.SET_GOVERNATES, payload: country.governates}),
          put({type: actions.SET_AREAS, payload: country.governates}),
          put({
            type: actions.SET_AREA,
            payload: !validate.isEmpty(country.areas)
              ? first(country.areas)
              : {id: 1, name: 'none'},
          }),
        ]);
      }
      yield put({type: actions.HIDE_COUNTRY_MODAL});
      if (!validate.isEmpty(cart)) {
        yield call([
          put({
            type: actions.SET_SHIPMENT_FEES,
            payload: country.fixed_shipment_charge,
          }),
          call(setGrossTotalCartValue, {
            total,
            coupon,
            cart,
          }),
        ]);
      }
      if (!validate.isEmpty(redirect) && redirect) {
        yield call(startClearCartScenario);
        yield call(startResetStoreScenario);
      }
    }
  } catch (e) {
    if (__DEV__) {
      // console.log('the e', e);
    }
    // yield all([disableLoading, enableErrorMessage(I18n.t('no_country'))]);
  } finally {
  }
}

export function* startDeepLinkingScenario(action) {
  try {
    const {bootStrapped, linking} = yield select();
    const {type, id} = !validate.isEmpty(linking) ? linking : action.payload;
    if (!isNull(type) && bootStrapped) {
      switch (type) {
        case 'designer':
          return yield call(startGetDesignerScenario, {
            payload: {id, redirect: true, searchParams: {user_id: id}},
          });
        case 'celebrity':
          return yield call(startGetCelebrityScenario, {
            payload: {id, redirect: true, searchParams: {user_id: id}},
          });
        case 'company':
          return yield call(startGetCompanyScenario, {
            payload: {id, redirect: true, searchParams: {user_id: id}},
          });
        case 'classified':
          return yield call(startGetClassifiedScenario, {
            payload: {id, redirect: true},
          });
        case 'product':
          return yield call(startGetProductScenario, {
            payload: {id, redirect: true},
          });
        case 'service':
          return yield call(startGetServiceScenario, {
            payload: {id, redirect: true},
          });
      }
    }
  } catch (e) {
    if (__DEV__) {
      // console.log('the e', e);
    }
    // call(enableErrorMessage, I18n.t('no_deep_product'));
  } finally {
    yield call(disableLoading);
  }
}

export function* startRefetchHomeElementsScenario() {
  try {
    const {guest} = yield select();
    if (EXPO) {
      yield call(expoBootStrap);
    } else if (DESIGNERAT) {
      yield call(designeratBootStrap);
    } else if (ISTORES) {
      yield call(istoresBootStrap);
    } else if (IHOUSES) {
      yield call(istoresBootStrap);
    } else if (ABATI) {
      yield call(abatiBootStrap);
    }
    if (!guest) {
      yield call(startReAuthenticateScenario);
    }
  } catch (e) {
    if (__DEV__) {
      console.log('the e', e);
    }
    yield call(enableErrorMessage, I18n.t('refetch_home_error'));
  } finally {
    yield call(disableLoading);
    yield call(enableResetApp);
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
    if (__DEV__) {
      // console.log('the e', e);
    }
    // yield call(enableErrorMessage, I18n.t('no_splashes'));
  } finally {
    // yield call(disableLoading);
  }
}

export function* startAddToCartScenario(action) {
  try {
    const {cart, shipmentCountry, settings} = yield select();
    if (!shipmentCountry.is_local && action.payload.type === 'service') {
      throw I18n.t(
        'orders_that_include_services_are_not_accepted_out_side_kuwait',
      );
    } else {
      const filteredCart = yield call(filterCartAndItems, [cart, action]);
      let multiMerchantEnabled = filter(
        map(
          filteredCart,
          e => e.element.user_id === first(cart).element.user_id,
        ),
        e => e === false,
      );
      if (
        !settings.multiCartMerchant &&
        filteredCart.length >= 1 &&
        multiMerchantEnabled.length >= 1
      ) {
        yield put({
          type: actions.REMOVE_FROM_CART,
          payload: action.payload.cart_id,
        });
        throw I18n.t('you_can_only_add_to_cart_from_only_single_merchant');
      } else {
        if (!validate.isEmpty(filteredCart)) {
          yield all([
            // call(startGoogleAnalyticsScenario, {
            //   payload: {type: 'AddToCart', element: product},
            // }),
            call(
              enableSuccessMessage,
              !action.payload.directPurchase
                ? I18n.t(`${action.payload.type}_added_to_cart_successfully`)
                : I18n.t('you_can_add_more_than_one_product_to_cart'),
            ),
            put({type: actions.FILTER_CART, payload: filteredCart}),
            put({type: actions.SET_COUPON, payload: {}}),
            call(setTotalCartValue, filteredCart),
          ]);
        }
      }
    }
  } catch (e) {
    // if (__DEV__) {
    // console.log('the e', e);
    // }
    yield call(enableErrorMessage, e);
  } finally {
    yield call(disableLoading);
  }
}

export function* setTotalCartValue(cart) {
  try {
    if (!validate.isEmpty(cart) && cart.length > 0) {
      const {settings, shipmentCountry, auth, coupon} = yield select();
      const total = sumBy(
        cart,
        i =>
          (i.element.finalPrice + (i.wrapGift ? settings.gift_fee : 0)) * i.qty,
      );
      const preparePickups = map(cart, c =>
        c.element.user.localArea ? c.element.user.localArea.code : null,
      );
      preparePickups.push(auth ? auth.localArea?.code : null);
      const pickups = filter(
        preparePickups,
        a => !validate.isEmpty(a) || a !== undefined,
      );
      const calculateShipmentFees = yield call(api.getDeliveryFees, {
        receive_on_branch: 0,
        country_id: shipmentCountry.id,
        pickups: pickups.length >= 1 && settings.mirsalEnabled ? pickups : null, // pickups for Mirsal Implementation Area codes
        cart_items_no: cart.length,
        merchant_id: first(cart).element.user.id, // in case of single Vendor Cart
      });
      yield call(setShipmentFees, calculateShipmentFees);
      yield all([
        put({type: actions.SET_TOTAL_CART, payload: total}),
        call(setGrossTotalCartValue, {total, coupon, cart}),
      ]);
    }
  } catch (e) {
    if (__DEV__) {
      console.log('the e', e);
    }
    yield call(enableErrorMessage, I18n.t('cart_is_empty'));
  } finally {
    yield call(disableLoading);
  }
}

export function* setShipmentFees(apiFees) {
  try {
    const {cart} = yield select();
    const countPieces = sumBy(cart, i => i.qty);
    const finalShipment =
      cart.length === 1 && first(cart).type === 'service' ? 0 : apiFees;
    yield put({
      type: actions.SET_SHIPMENT_FEES,
      payload: finalShipment,
    });
  } catch (e) {
    if (__DEV__) {
      console.log('ee', e);
    }
  } finally {
  }
}
export function* setGrossTotalCartValue(values) {
  try {
    const {total, coupon, cart} = values;
    const {shipmentFees} = yield select();
    const countPieces = sumBy(cart, i => i.qty);
    const couponValue = parseFloat(
      !validate.isEmpty(coupon) ? coupon.value : 0,
    );
    const grossTotal =
      parseFloat(total) + parseFloat(shipmentFees) - parseFloat(couponValue);
    yield put({
      type: actions.SET_GROSS_TOTAL_CART,
      payload: parseFloat(grossTotal),
    });
  } catch (e) {
    if (__DEV__) {
      console.log('eee', e);
    }
    yield call(enableErrorMessage, I18n.t('cart_is_empty_gross_total'));
  } finally {
    yield call(disableLoading);
  }
}

export function* startRemoveFromCartScenario(action) {
  try {
    const {cart} = yield select();
    const filteredCart = remove(cart, item =>
      item.type === 'product'
        ? item.cart_id !== action.payload
        : item.service_id !== action.payload,
    );
    if (!validate.isEmpty(filteredCart) && cart.length > 0) {
      yield all([
        call(setTotalCartValue, filteredCart),
        call(
          enableSuccessMessage,
          I18n.t('product_removed_to_cart_successfully'),
        ),
        put({type: actions.FILTER_CART, payload: filteredCart}),
      ]);
    } else {
      yield all([
        call(startClearCartScenario),
        call(enableWarningMessage, I18n.t('cart_cleared')),
      ]);
      // RootNavigation.navigate('CartTab');
    }
  } catch (e) {
    if (__DEV__) {
      console.log('the e', e);
    }
    yield call(enableErrorMessage, I18n.t('error_removing_product_from_cart'));
  } finally {
    yield call(disableLoading);
  }
}

export function* filterCartAndItems([cart, action]) {
  try {
    let directPurchaseCart = filter(cart, e => e.directPurchase);
    if (directPurchaseCart.length === 0) {
      let cleanCart = map(cart, e => {
        // check if cart_id is available (means this product has_attributes true)
        // if same product but different qty update the cart
        if (e.type == 'product') {
          if (
            e.cart_id === action.payload.cart_id &&
            e.qty !== action.payload.qty
          ) {
            return action.payload;
          } else {
            return e;
          }
        } else if (e.type == 'service') {
          if (e.service_id === action.payload.service_id) {
            return action.payload;
          }
          return e;
        }
      });
      const filteredCart =
        cart.length > 0 ? uniqBy(cleanCart, 'cart_id') : [action.payload];
      return filteredCart;
    } else {
      if (action.payload.directPurchase) {
        const filteredCart = [last(filter(cart, e => e.directPurchase))];
        return filteredCart;
      } else {
        const filteredCart = filter(cart, e => !e.directPurchase);
        return filteredCart;
      }
    }
  } finally {
    if (action.payload.directPurchase) {
      yield call(
        enableErrorMessage,
        I18n.t('you_can_add_more_than_one_product_to_cart'),
      );
    } else {
    }
  }
}

export function* startClearCartScenario() {
  try {
    yield all([
      put({type: actions.CLEAR_CART, payload: []}),
      put({type: actions.REMOVE_COUPON}),
      put({type: actions.SET_TOTAL_CART, payload: 0}),
      put({type: actions.SET_GROSS_TOTAL_CART, payload: 0}),
      put({type: actions.SET_SHIPMENT_FEES, payload: 0}),
    ]);
    RootNavigation.navigate('CartTab');
  } catch (e) {
    if (__DEV__) {
      // console.log('the e', e);
    }
    yield call(enableErrorMessage, I18n.t('authenticated_error'));
  } finally {
    yield call(disableLoading);
  }
}

export function* startSubmitCartScenario(action) {
  try {
    const {
      name,
      mobile,
      email,
      address,
      country_id,
      notes,
      area,
      block,
      street,
      building,
      area_id,
    } = action.payload;
    const result = validate({name, mobile, email, address}, registerConstrains);
    if (validate.isEmpty(result)) {
      RootNavigation.navigate('CartConfirmation', {
        cName: name,
        cEmail: email,
        cMobile: mobile,
        cArea: area,
        cBlock: block,
        cStreet: street,
        cBuilding: building,
        cAddress: address,
        country_id,
        area_id,
        cNotes: notes,
      });
    } else {
      throw result.name
        ? result.name.toString()
        : null || result.email
        ? result.email.toString()
        : null || result.mobile
        ? result.mobile.toString()
        : null || result.address
        ? result.address.toString()
        : null;
    }
  } catch (e) {
    if (__DEV__) {
      // console.log('the e', e);
    }
    yield all([call(disableLoading), call(enableErrorMessage, e)]);
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
      yield all([
        put({type: actions.SET_COUPON, payload: coupon}),
        call(setGrossTotalCartValue, {total, coupon}),
        call(enableSuccessMessage, I18n.t('coupon_is_added_and_applied')),
      ]);
    } else {
      yield put({type: actions.SET_COUPON, payload: {}});
      throw I18n.t('coupon_is_not_correct');
    }
  } catch (e) {
    if (__DEV__) {
      // console.log('the e', e);
    }
    yield call(enableErrorMessage, e);
  }
}

export function* startCreateMyFatorrahPaymentUrlScenario(action) {
  try {
    yield call(enableLoading);
    // const {name, mobile, email, address} = action.payload;
    // const result = validate({name, mobile, email, address}, registerConstrains);
    // if (validate.isEmpty(result)) {
    yield call(enableLoading, I18n.t('create_payment_url'));
    const url = yield call(api.makeMyFatoorahPayment, action.payload);
    if (validate.isObject(url) && url.paymentUrl.includes('https')) {
      RootNavigation.navigate('PaymentIndex', {
        paymentUrl: url.paymentUrl,
      });
    } else {
      throw url;
    }
    // } else {
    //   throw I18n.t('information_you_entered_not_correct');
    // }
  } catch (e) {
    if (__DEV__) {
      // console.log('the e', e);
    }
    yield call(enableErrorMessage, e);
    RootNavigation.back();
  } finally {
    yield call(disableLoading);
  }
}

export function* startCreateTapPaymentUrlScenario(action) {
  try {
    yield call(enableLoading);
    const url = yield call(api.makeTapPayment, action.payload);
    if (validate.isObject(url) && url.paymentUrl.includes('http')) {
      RootNavigation.navigate('PaymentIndex', {
        paymentUrl: url.paymentUrl,
      });
    } else {
      throw url;
    }
  } catch (e) {
    if (__DEV__) {
      console.log('the e', e);
    }
    yield call(enableErrorMessage, e);
    RootNavigation.back();
  } finally {
    yield call(disableLoading);
  }
}

export function* startCreateIbookeyPaymentUrlScenario(action) {
  try {
    yield call(enableLoading);
    const url = yield call(api.makeIbookeyPayment, action.payload);
    if (validate.isObject(url) && url.paymentUrl.includes('http')) {
      RootNavigation.navigate('PaymentIndex', {
        paymentUrl: url.paymentUrl,
      });
    } else {
      throw url;
    }
  } catch (e) {
    if (__DEV__) {
      console.log('the e', e);
    }
    yield call(enableErrorMessage, e);
    RootNavigation.back();
  } finally {
    yield call(disableLoading);
  }
}

export function* startCreateCashOnDeliveryPayment(action) {
  try {
    yield call(enableLoading);
    const element = yield call(api.makeCashOnDeliveryPayment, action.payload);
    if (validate.isObject(element) && element.url) {
      yield call(enableSuccessMessage, I18n.t('order_is_complete'));
      RootNavigation.navigate('PaymentIndex', {
        paymentUrl: element.url,
      });
      yield call(disableLoading);
    } else {
      throw element;
    }
  } catch (e) {
    if (__DEV__) {
      // console.log('the e', e);
    }
    yield all([call(disableLoading), call(enableErrorMessage, e)]);
  }
}

export function* startBecomeFanScenario(action) {
  try {
    const {id, fanMe} = action.payload;
    const element = yield call(api.becomeFan, id);
    if (!validate.isEmpty(element) && validate.isObject(element)) {
      if (fanMe) {
        yield call(enableSuccessMessage, I18n.t('company_favorite_success'));
      } else {
        yield call(enableWarningMessage, I18n.t('company_favorite_failure'));
      }
      yield call(startReAuthenticateScenario);
    }
  } catch (e) {
    if (__DEV__) {
      // console.log('the e', e);
    }
    if (__DEV__) {
      // console.log('the e', e);
    }
    yield all([call(enableErrorMessage, I18n.t('fan_error'))]);
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
      throw result.title
        ? result.title.toString()
        : null || result.content
        ? result.content.toString()
        : null;
    }
  } catch (e) {
    if (__DEV__) {
      // console.log('the e', e);
    }
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
              RootNavigation.navigate({
                routeName: 'Home',
              }),
            ),
          ]);
        } else {
          throw user;
        }
      }
    }
  } catch (e) {
    if (__DEV__) {
      // console.log('the e', e);
    }
    yield call(enableErrorMessage, e);
  } finally {
    yield call(disableLoading);
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
    if (__DEV__) {
      // console.log('the e', e);
    }
    // yield call(enableErrorMessage, I18n.t('no_pages'));
  } finally {
    // yield call(disableLoading);
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
    if (__DEV__) {
      // console.log('the e', e);
    }
    // yield call(enableErrorMessage, I18n.t('no_tags'));
  } finally {
    // yield call(disableLoading);
  }
}

export function* startGetCategoryAndGoToNavChildren(action) {
  try {
    const element = action.payload;
    if (element.children && !validate.isEmpty(element.children)) {
      if (element.isParent) {
        yield put({type: actions.SET_CATEGORY, payload: element});
        yield put(
          RootNavigation.navigate({
            routeName: 'SubCategoryIndex',
            params: {name: element.name},
          }),
        );
      } else {
        yield put({type: actions.SET_SUB_CATEGORY, payload: element});
        yield put(
          RootNavigation.navigate({
            routeName: 'ChildrenCategoryIndex',
            params: {name: element.name},
          }),
        );
      }
    } else {
      yield call(startGetSearchCompaniesScenario, {
        payload: {
          searchParams: {is_company: 1, user_category_id: element.id},
          name: element.name,
          redirect: true,
        },
      });
    }
  } catch (e) {
    if (__DEV__) {
      // console.log('the e', e);
    }
    yield call(enableErrorMessage, I18n.t('no_items'));
  } finally {
    // yield call(disableLoading);
  }
}
