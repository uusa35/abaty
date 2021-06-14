import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import {
  disableLoading,
  disableLoadingBoxedList,
  disableLoadingProfile,
  enableErrorMessage,
  enableLoading,
  enableLoadingBoxedList,
  enableLoadingProfile,
  enableSuccessMessage,
  enableWarningMessage,
  startGoogleAnalyticsScenario,
} from './settingSagas';
import * as api from '../api';
import {setClassifiedFavorites} from './classifiedSagas';
import {setProductFavorites} from './productSagas';
import * as actions from '../types';
import * as RootNavigation from './../../../RootNavigation.js';
import I18n from '../../../I18n';
import validate from 'validate.js';
import {HOMEKEY, ABATI, MALLR, ESCRAP} from './../../../../app';
import {CHANGE_ADDRESS, SET_ADDRESS, SET_ROLES} from '../types';
import {first, filter, isNull} from 'lodash';
import {reAuthenticate} from '../user';

export function* startGetDesignerScenario(action) {
  try {
    const {id, searchParams, redirect} = action.payload;
    if (!validate.isEmpty(redirect) && redirect) {
      yield call(enableLoadingProfile);
    }
    const element = yield call(api.getUser, id);
    if (
      !validate.isEmpty(element) &&
      validate.isObject(element) &&
      element.id
    ) {
      yield all([
        put({type: actions.SET_DESIGNER, payload: element}),
        put({type: actions.SET_SEARCH_PARAMS, payload: searchParams}),
      ]);
      if (!validate.isEmpty(element.comments)) {
        yield put({type: actions.SET_COMMENTS, payload: element.comments});
      } else {
        yield put({type: actions.SET_COMMENTS, payload: []});
      }
      if (!validate.isEmpty(redirect) && redirect) {
        yield call(startGoogleAnalyticsScenario, {
          payload: {type: 'User', element},
        });
        RootNavigation.navigate('DesignerShow', {
          name: element.slug,
          id: element.id,
          model: 'user',
          type: 'designer',
        });
      }
    } else {
      yield put({type: actions.SET_DESIGNER, payload: {}});
      yield put({type: actions.SET_SEARCH_PARAMS, payload: {}});
      throw I18n.t('no_designer');
    }
  } catch (e) {
    if (__DEV__) {
      console.log('ee', e);
    }
  } finally {
    yield call(disableLoadingProfile);
  }
}

export function* startGetShopperScenario(action) {
  try {
    yield call(enableLoadingProfile);
    const {id, searchParams, redirect} = action.payload;
    const element = yield call(api.getUser, id);
    if (
      !validate.isEmpty(element) &&
      validate.isObject(element) &&
      element.id
    ) {
      yield all([
        put({type: actions.SET_DESIGNER, payload: element}),
        put({type: actions.SET_SEARCH_PARAMS, payload: searchParams}),
      ]);
      if (!validate.isEmpty(element.comments)) {
        yield put({type: actions.SET_COMMENTS, payload: element.comments});
      } else {
        yield put({type: actions.SET_COMMENTS, payload: []});
      }
      if (!validate.isEmpty(redirect) && redirect) {
        yield call(startGoogleAnalyticsScenario, {
          payload: {type: 'User', element},
        });
        RootNavigation.navigate('ShopperShow', {
          name: element.slug,
          id: element.id,
          model: 'user',
          type: 'shopper',
        });
      }
      yield call(disableLoadingProfile);
    } else {
      yield put({type: actions.SET_DESIGNER, payload: {}});
      yield put({type: actions.SET_SEARCH_PARAMS, payload: {}});
      throw I18n.t('no_designer');
    }
  } catch (e) {
    // if (__DEV__) {
    //   console.log('ee', e);
    // }
  } finally {
    yield call(disableLoadingProfile);
  }
}

export function* startGetCompanyScenario(action) {
  try {
    const {id, searchParams, redirect} = action.payload;
    if (!validate.isEmpty(redirect) && redirect) {
      yield call(enableLoadingProfile);
    }
    const element = yield call(api.getUser, id);
    if (
      !validate.isEmpty(element) &&
      validate.isObject(element) &&
      element.id
    ) {
      yield all([
        put({type: actions.SET_COMPANY, payload: element}),
        put({type: actions.SET_SEARCH_PARAMS, payload: searchParams}),
      ]);
      if (!validate.isEmpty(element.comments)) {
        yield put({type: actions.SET_COMMENTS, payload: element.comments});
      } else {
        yield put({type: actions.SET_COMMENTS, payload: []});
      }
      if (!validate.isEmpty(redirect) && redirect) {
        yield call(startGoogleAnalyticsScenario, {
          payload: {type: 'User', element},
        });
        RootNavigation.navigate('CompanyShow', {
          name: element.slug,
          id: element.id,
          model: 'user',
          type: 'company',
        });
      }
    } else {
      yield put({type: actions.SET_COMPANY, payload: {}});
      yield put({type: actions.SET_SEARCH_PARAMS, payload: {}});
      throw I18n.t('no_company');
    }
  } catch (e) {
    // if (__DEV__) {
    //   console.log('ee', e);
    // }
  } finally {
    yield call(disableLoadingProfile);
  }
}

export function* startGetCelebrityScenario(action) {
  try {
    yield call(enableLoadingProfile);
    const {id, searchParams, redirect} = action.payload;
    const element = yield call(api.getUser, id);
    if (!validate.isEmpty(element) && validate.isObject(element)) {
      yield all([
        put({type: actions.SET_CELEBRITY, payload: element}),
        put({type: actions.SET_SEARCH_PARAMS, payload: searchParams}),
      ]);
      if (!validate.isEmpty(element.comments)) {
        yield put({type: actions.SET_COMMENTS, payload: element.comments});
      } else {
        yield put({type: actions.SET_COMMENTS, payload: []});
      }
      if (!validate.isEmpty(redirect) && redirect) {
        yield put(
          RootNavigation.navigate('CelebrityShow', {
            name: element.slug,
            id: element.id,
            type: 'celebrity',
            model: 'user',
          }),
        );
      }
      yield call(disableLoadingProfile);
    } else {
      yield put({type: actions.SET_CELEBRITY, payload: {}});
      yield put({type: actions.SET_SEARCH_PARAMS, payload: {}});
      throw I18n.t('no_celebrity');
    }
  } catch (e) {
    // if (__DEV__) {
    //   console.log('ee', e);
    // }
  } finally {
    yield call(disableLoadingProfile);
  }
}

export function* startGetUserScenario(action) {
  try {
    const element = yield call(api.getUser, action.payload);
    if (!validate.isEmpty(element) && validate.isObject(element)) {
      yield put({type: actions.SET_USER, payload: element});
      RootNavigation.navigate('DesignerShow', {
        name: element.slug,
        id: element.id,
        model: 'user',
        type: 'user',
      });
    }
  } catch (e) {
    // if (__DEV__) {
    //   console.log('ee', e);
    // }
  } finally {
    yield call(disableLoading);
  }
}

export function* startGetVideoScenario(action) {
  try {
    const element = yield call(api.getVideo, action.payload);
    if (!validate.isEmpty(element) && validate.isObject(element)) {
      yield put({type: actions.SET_VIDEO, payload: element});
      RootNavigation.navigate('VideoShow', {name: element.name});
    }
  } catch (e) {
    // if (__DEV__) {
    //   console.log('ee', e);
    // }
  } finally {
    yield call(disableLoading);
  }
}

export function* startStorePlayerIdScenario(action) {
  try {
    if (action.payload) {
      const result = yield call(api.storePlayerId, action.payload);
    }
  } catch (e) {
    // if (__DEV__) {
    //   console.log('ee', e);
    // }
  }
}

export function* setHomeBrands() {
  try {
    const elements = yield call(api.getHomeBrands);
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield put({type: actions.SET_BRANDS, payload: elements});
    } else {
      yield put({type: actions.SET_BRANDS, payload: []});
    }
  } catch (e) {
    // if (__DEV__) {
    //   console.log('ee', e);
    // }
  } finally {
    // yield call(disableLoading);
  }
}

export function* startGetHomeCelebrities(action) {
  try {
    const {searchParams, redirect} = action.payload;
    const elements = yield call(api.getUsers, searchParams);
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield put({type: actions.SET_HOME_CELEBRITIES, payload: elements});
    } else {
      yield put({type: actions.SET_HOME_CELEBRITIES, payload: []});
    }
  } catch (e) {
    // if (__DEV__) {
    //   console.log('ee', e);
    // }
  } finally {
    yield call(disableLoading);
  }
}

export function* startGetHomeDesigners(action) {
  try {
    const {searchParams, redirect} = action.payload;
    const elements = yield call(api.getUsers, searchParams);
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield put({type: actions.SET_HOME_DESIGNERS, payload: elements});
    } else {
      yield put({type: actions.SET_HOME_DESIGNERS, payload: []});
    }
  } catch (e) {
    // if (__DEV__) {
    //   console.log('ee', e);
    // }
  } finally {
    if (action.payload.redirect) {
      yield call(disableLoading);
    }
  }
}

export function* startLogoutScenario() {
  try {
    yield all([
      put({type: actions.SET_TOKEN, payload: ''}),
      put({type: actions.TOGGLE_GUEST, payload: true}),
      put({type: actions.SET_ORDERS, payload: []}),
      call(setClassifiedFavorites, []),
      call(setProductFavorites, []),
    ]);
  } catch (e) {
    // if (__DEV__) {
    //   console.log('ee', e);
    // }
    // yield call(enableErrorMessage, I18n.t('logout_error'));
  } finally {
    yield call(disableLoading);
  }
}

export function* startSubmitAuthScenario(action) {
  try {
    const {email, password} = action.payload;
    const {player_id, loginModal} = yield select();
    const element = yield call(api.authenticate, {email, password, player_id});
    if (!validate.isEmpty(element) && validate.isObject(element)) {
      yield all([
        put({type: actions.SET_AUTH, payload: element}),
        put({type: actions.SET_TOKEN, payload: element.api_token}),
        put({type: actions.SET_ORDERS, payload: element.orders}),
        put({type: actions.SET_ADDRESS, payload: first(element.addresses)}),
        put({type: actions.TOGGLE_GUEST, payload: false}),
        call(setProductFavorites, element.product_favorites),
        call(setClassifiedFavorites, element.classified_favorites),
        call(enableSuccessMessage, I18n.t('login_success')),
        call(startGoogleAnalyticsScenario, {
          payload: {type: 'UserLogged', element},
        }),
      ]);
      if (loginModal) {
        yield put({type: actions.HIDE_LOGIN_MODAL, payload: false});
      } else if (action.payload.redirect) {
        const {settings} = yield select();
        if (!element.mobile_verified && settings.mobileVerification) {
          yield call(startNavigateScenario, 'MobileConfirmation');
        } else {
          yield call(startNavigateScenario, action.payload.destination);
        }
      }
    } else {
      yield call(startLogoutScenario);
      throw element;
    }
  } catch (e) {
    if (__DEV__) {
      console.log('eee', e);
    }
    yield call(enableErrorMessage, e);
  } finally {
    yield all([
      call(disableLoading),
      put({type: actions.HIDE_LOGIN_MODAL, payload: false}),
    ]);
  }
}

export function* startReAuthenticateScenario() {
  try {
    const {token} = yield select();
    const element = yield call(api.reAuthenticate, token);
    if (
      !validate.isEmpty(element) &&
      validate.isObject(element) &&
      !validate.isEmpty(element.api_token)
    ) {
      yield all([
        put({type: actions.SET_TOKEN, payload: element.api_token}),
        put({type: actions.SET_AUTH, payload: element}),
        put({type: actions.SET_ORDERS, payload: element.orders}),
        put({type: actions.TOGGLE_GUEST, payload: false}),
        call(setProductFavorites, element.product_favorites),
        call(setClassifiedFavorites, element.classified_favorites),
        put({type: actions.SET_SHIPMENT_COUNTRY, payload: element.country}),
      ]);
    } else {
      throw element;
    }
  } catch (e) {
    yield call(enableErrorMessage, e);
  } finally {
    yield call(disableLoading);
  }
}

export function* startUpdateUserScenario(action) {
  try {
    yield call(enableLoading);
    const element = yield call(api.updateUser, action.payload);
    if (!validate.isEmpty(element) && validate.isObject(element)) {
      yield all([
        put({type: actions.SET_AUTH, payload: element}),
        call(disableLoading),
        call(enableSuccessMessage, I18n.t('update_information_success')),
        call(startReAuthenticateScenario),
      ]);
      RootNavigation.back();
    } else {
      throw element;
    }
  } catch (e) {
    yield call(disableLoading);
    yield call(enableErrorMessage, e);
  } finally {
    yield call(disableLoading);
  }
}

export function* startGetSearchCompaniesScenario(action) {
  try {
    const {searchParams, redirect} = action.payload;
    if (!validate.isEmpty(redirect) && redirect) {
      yield call(enableLoadingBoxedList);
    }
    const elements = yield call(api.getUsers, searchParams);
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield all([
        put({type: actions.SET_COMPANIES, payload: elements}),
        put({type: actions.SET_SEARCH_PARAMS, payload: searchParams}),
      ]);
      if (!validate.isEmpty(redirect) && redirect) {
        RootNavigation.navigate('CompanyIndex', {
          name: action.payload.name,
        });
      }
    } else {
      yield put({type: actions.SET_COMPANIES, payload: []});
      yield put({type: actions.SET_SEARCH_PARAMS, payload: {}});
      throw elements;
    }
  } catch (e) {
    // yield call(enableWarningMessage, e);
  } finally {
    yield call(disableLoadingBoxedList);
  }
}

export function* startGetCelebritiesScenario(action) {
  try {
    const {searchParams, redirect} = action.payload;
    if (!validate.isEmpty(redirect) && redirect) {
      yield call(enableLoadingBoxedList);
    }
    const elements = yield call(api.getUsers, searchParams);
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield all([
        put({type: actions.SET_CELEBRITIES, payload: elements}),
        put({type: actions.SET_SEARCH_PARAMS, payload: searchParams}),
      ]);
      if (!validate.isEmpty(redirect) && redirect) {
        yield call(startNavigateScenario, 'CelebrityIndex');
      }
    } else {
      yield put({type: actions.SET_CELEBRITIES, payload: []});
      yield put({type: actions.SET_SEARCH_PARAMS, payload: {}});
      throw I18n.t(elements);
    }
  } catch (e) {
    yield call(enableWarningMessage, e);
  } finally {
    yield call(disableLoadingBoxedList);
  }
}

export function* startGetDesignersScenario(action) {
  try {
    const {searchParams, redirect} = action.payload;
    if (!validate.isEmpty(redirect) && redirect) {
      yield call(enableLoadingBoxedList);
    }
    const elements = yield call(api.getUsers, searchParams);
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield all([
        put({type: actions.SET_DESIGNERS, payload: elements}),
        put({type: actions.SET_SEARCH_PARAMS, payload: searchParams}),
      ]);
      if (!validate.isEmpty(redirect) && redirect) {
        RootNavigation.navigate('DesignerIndex', {
          name: action.payload.name,
        });
      }
    } else {
      yield put({type: actions.SET_DESIGNERS, payload: []});
      yield put({type: actions.SET_SEARCH_PARAMS, payload: {}});
      throw elements;
    }
  } catch (e) {
    yield call(enableWarningMessage, e);
  } finally {
    yield call(disableLoadingBoxedList);
  }
}

export function* startGetHomeCompaniesScenario(action) {
  try {
    const {searchParams, redirect} = action.payload;
    const elements = yield call(api.getUsers, searchParams);
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield put({type: actions.SET_HOME_COMPANIES, payload: elements});
      if (!validate.isEmpty(redirect) && redirect) {
        RootNavigation.navigate('CompanyIndex', {
          name: I18n.t('companies'),
        });
      }
    } else {
      yield put({type: actions.SET_HOME_COMPANIES, payload: []});
      // throw elements;
    }
  } catch (e) {
    yield call(enableWarningMessage, e);
  } finally {
    yield call(disableLoading);
  }
}

export function* startAuthenticatedScenario() {
  try {
    const {token} = yield select();
    if (!validate.isEmpty(token)) {
      const element = yield call(api.reAuthenticate, token); // get the auth user according to auth stored in storage
      if (!validate.isEmpty(element) && !validate.isEmpty(element.token)) {
        yield all([
          put({type: actions.SET_AUTH, payload: element}),
          put({type: actions.SET_TOKEN, payload: element.api_token}),
          put({type: actions.TOGGLE_GUEST, payload: false}),
        ]);
      }
    }
  } catch (e) {
    yield call(enableErrorMessage, I18n.t('authenticated_error'));
  } finally {
    yield call(disableLoading);
  }
}

export function* startRegisterScenario(action) {
  try {
    const {settings} = yield select();
    const element = yield call(api.register, action.payload);
    if (validate.isObject(element) && !validate.isEmpty(element)) {
      yield call(enableLoading);
      const {email, password} = action.payload;
      yield put({type: actions.SUBMIT_AUTH, payload: {email, password}});
      yield all([
        call(startGoogleAnalyticsScenario, {
          payload: {type: 'UserRegister', element},
        }),
        call(enableSuccessMessage, I18n.t('register_success')),
      ]);
      if (element.mobile_verified && !settings.mobileVerification) {
        yield call(startNavigateScenario, 'Home');
      } else {
        yield call(startNavigateScenario, 'MobileConfirmation');
      }
    } else {
      throw element;
    }
  } catch (e) {
    yield call(enableErrorMessage, e);
  } finally {
    yield call(disableLoading);
  }
}

export function* startNavigateScenario(destination = null) {
  if (!isNull(destination)) {
    RootNavigation.navigate(destination);
  } else {
    RootNavigation.back();
  }
}

export function* startRegisterAsClientScenario(action) {
  try {
    const {isClient} = action.payload;
    const {roles} = yield select();
    const role = first(filter(roles, r => r.isClient));
    if (!validate.isEmpty(role) && isClient) {
      yield put({type: actions.SET_ROLE, payload: role});
      yield call(startNavigateScenario, 'Register');
    } else {
      yield call(startNavigateScenario, 'RoleIndex');
    }
  } catch (e) {
    yield call(enableErrorMessage, e);
  } finally {
    yield call(disableLoading);
  }
}

export function* startCompanyRegisterScenario(action) {
  try {
    yield call(enableLoading);
    const {settings} = yield select();
    const element = yield call(api.companyRegister, action.payload);
    if (validate.isObject(element) && !validate.isEmpty(element)) {
      const {email, password} = action.payload;
      yield put({type: actions.SUBMIT_AUTH, payload: {email, password}});
      yield all([
        call(startGoogleAnalyticsScenario, {
          payload: {type: 'UserRegister', element},
        }),
        call(enableSuccessMessage, I18n.t('register_success')),
      ]);
      if (element.mobile_verified && !settings.mobileVerification) {
        yield call(startNavigateScenario, 'Home');
      } else {
        yield call(startNavigateScenario, 'MobileConfirmation');
      }
    } else {
      throw element;
    }
  } catch (e) {
    yield call(disableLoading);
    yield call(enableErrorMessage, e);
  } finally {
    yield call(disableLoading);
  }
}

export function* startRateElementScenario(action) {
  try {
    const element = yield call(api.rateElement, action.payload);
    if (!validate.isEmpty(element) && validate.isObject(element)) {
      yield call(enableSuccessMessage, I18n.t('rate_success'));
    }
  } catch (e) {
    yield call(enableErrorMessage, e);
  } finally {
    yield call(disableLoading);
  }
}

export function* startGetRolesScenario() {
  try {
    const elements = yield call(api.getRoles);
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield put({type: SET_ROLES, payload: elements});
    }
  } catch (e) {
  } finally {
  }
}

export function* startCreateAddressScenario(action) {
  try {
    const element = yield call(api.createAddress, action.payload);
    if (!validate.isEmpty(element) && validate.isObject(element)) {
      yield all([
        call(enableSuccessMessage, I18n.t('address_created')),
        put({type: SET_ADDRESS, payload: element}),
        call(startReAuthenticateScenario),
      ]);
      RootNavigation.navigate('UserAddressIndex');
    } else {
      throw element;
    }
  } catch (e) {
    yield call(enableErrorMessage, e);
  } finally {
  }
}

export function* startUpdateAddressScenario(action) {
  try {
    const element = yield call(api.updateAddress, action.payload);
    if (!validate.isEmpty(element) && validate.isObject(element)) {
      yield all([
        call(enableSuccessMessage, I18n.t('address_updated')),
        put({type: SET_ADDRESS, payload: element}),
        call(startReAuthenticateScenario),
      ]);
      RootNavigation.navigate('UserAddressIndex');
    } else {
      throw element;
    }
  } catch (e) {
    yield call(enableErrorMessage, e);
  } finally {
  }
}

export function* startDeleteAddressScenario(action) {
  try {
    const element = yield call(api.deleteAddress, action.payload);
    if (!validate.isEmpty(element) && validate.isObject(element)) {
      yield call(startReAuthenticateScenario);
    } else {
      throw element;
    }
  } catch (e) {
    yield call(enableErrorMessage, e);
  } finally {
  }
}

export function* startChangeAddressScenario(action) {
  try {
    yield all([
      put({type: SET_ADDRESS, payload: action.payload}),
      call(enableSuccessMessage, I18n.t('address_changed')),
    ]);
    RootNavigation.back();
  } catch (e) {
    yield call(enableErrorMessage, e);
  } finally {
  }
}

export function* startSubmitMobileConfirmationCode(action) {
  try {
    const element = yield call(
      api.submitMobileConfirmationCode,
      action.payload,
    );
    if (!validate.isEmpty(element) && validate.isObject(element)) {
      yield all([
        put({type: actions.SET_AUTH, payload: element}),
        put({type: actions.SET_TOKEN, payload: element.api_token}),
        put({type: actions.SET_ORDERS, payload: element.orders}),
        put({type: actions.SET_ADDRESS, payload: first(element.addresses)}),
        put({type: actions.TOGGLE_GUEST, payload: false}),
        call(setProductFavorites, element.product_favorites),
        call(setClassifiedFavorites, element.classified_favorites),
        call(enableSuccessMessage, I18n.t('login_success')),
        call(startGoogleAnalyticsScenario, {
          payload: {type: 'UserLogged', element},
        }),
      ]);
      yield put({type: actions.HIDE_LOGIN_MODAL, payload: false});
      RootNavigation.navigate('Home');
    } else {
      throw element;
    }
  } catch (e) {
    yield call(enableErrorMessage, e);
  } finally {
  }
}

export function* startResendMobileConfirmationCode() {
  try {
    const {token} = yield select();
    const element = yield call(api.resendMobileConfirmationCode, token);
    if (!validate.isEmpty(element) && validate.isObject(element)) {
      yield call(
        enableSuccessMessage,
        I18n.t('verification_code_sent_successfully'),
      );
    } else {
      throw element;
    }
  } catch (e) {
    yield call(enableErrorMessage, e);
  } finally {
  }
}
