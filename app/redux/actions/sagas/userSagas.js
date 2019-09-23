import {call, put, all, takeLatest, select} from 'redux-saga/effects';
import {
  disableLoading,
  disableLoadingProfile,
  enableErrorMessage,
  enableLoading,
  enableLoadingProfile,
  enableSuccessMessage,
  enableWarningMessage
} from './settingSagas';
import * as api from '../api';
import {setClassifiedFavorites} from './classifiedSagas';
import {setProductFavorites} from './productSagas';
import * as actions from '../types';
import {NavigationActions} from 'react-navigation';
import I18n from '../../../I18n';
import {registerConstrains, submitLogin} from '../../../constants';
import validate from 'validate.js';
import {startBecomeFanScenario, startGoogleLoginScenario} from './requestSagas';

export function* startGetDesignerScenario(action) {
  try {
    yield call(enableLoadingProfile);
    const {id, searchParams, redirect} = action.payload;
    const user = yield call(api.getUser, id);
    if (!validate.isEmpty(user) && validate.isObject(user)) {
      yield all([
        put({type: actions.SET_DESIGNER, payload: user}),
        put({type: actions.SET_SEARCH_PARAMS, payload: searchParams})
      ]);
      if (!validate.isEmpty(user.comments)) {
        yield put({type: actions.SET_COMMENTS, payload: user.comments});
      } else {
        yield put({type: actions.SET_COMMENTS, payload: []});
      }
      if (!validate.isEmpty(redirect) && redirect) {
        yield put(
          NavigationActions.navigate({
            routeName: 'DesignerShow',
            params: {name: user.slug, id: user.id, product: false}
          })
        );
      }
      yield call(disableLoadingProfile);
    } else {
      yield put({type: actions.SET_DESIGNER, payload: {}});
      yield put({type: actions.SET_SEARCH_PARAMS, payload: {}});
      throw I18n.t('no_designer');
    }
  } catch (e) {
    yield all([
      call(disableLoadingProfile),
      call(enableWarningMessage, I18n.t('no_designer'))
    ]);
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
          params: {name: user.slug, id: user.id, model: 'user'}
        })
      );
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('no_users'))]);
  }
}

export function* startGetUsersScenario(action) {
  yield call(setUsers, action);
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
    yield all([
      call(disableLoading),
      call(enableErrorMessage, I18n.t('no_brands'))
    ]);
  }
}

export function* setHomeDesigners() {
  try {
    const designers = yield call(api.getUsers, {on_home: true, is_designer: 1});
    if (!validate.isEmpty(designers) && validate.isArray(designers)) {
      yield put({type: actions.SET_HOME_DESIGNERS, payload: designers});
    } else {
      yield put({type: actions.SET_HOME_DESIGNERS, payload: []});
    }
  } catch (e) {
    yield all([
      call(disableLoading),
      call(enableWarningMessage, I18n.t('no_home_designers'))
    ]);
  }
}

export function* setHomeCelebrities() {
  try {
    const celebrities = yield call(api.getUsers, {
      on_home: true,
      is_celebrity: 1
    });
    if (!validate.isEmpty(celebrities) && validate.isArray(celebrities)) {
      yield put({type: actions.SET_HOME_CELEBRITIES, payload: celebrities});
    } else {
      yield put({type: actions.SET_HOME_CELEBRITIES, payload: []});
    }
  } catch (e) {
    yield all([
      call(disableLoading),
      call(enableWarningMessage, I18n.t('no_celebrities'))
    ]);
  }
}

export function* startLogoutScenario() {
  try {
    yield all([
      put({type: actions.REMOVE_TOKEN, payload: ''}),
      put({type: actions.TOGGLE_GUEST, payload: true}),
      put({type: actions.SET_ORDERS, payload: []})
    ]);
  } catch (e) {
    yield all([
      call(disableLoading),
      call(enableErrorMessage, I18n.t('logout_error'))
    ]);
  }
}

export function* startSubmitAuthScenario(action) {
  try {
    const {email, password} = action.payload;
    const {player_id, loginModal} = yield select();
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
      yield all([
        put({type: actions.SET_AUTH, payload: user}),
        put({type: actions.SET_TOKEN, payload: user.api_token}),
        put({type: actions.SET_ORDERS, payload: user.orders}),
        put({type: actions.TOGGLE_GUEST, payload: false}),
        call(setProductFavorites, user.product_favorites),
        call(setClassifiedFavorites, user.classified_favorites),
        call(enableSuccessMessage, I18n.t('login_success'))
      ]);
      if (loginModal) {
        yield put({type: actions.HIDE_LOGIN_MODAL, payload: false});
      } else {
        yield put(
          NavigationActions.navigate({
            routeName: 'Home'
          })
        );
      }
      yield put({type: actions.HIDE_LOGIN_MODAL, payload: false});
    } else {
      throw user;
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableErrorMessage, e)]);
  }
}

export function* startReAuthenticateScenario() {
  try {
    const {token, loginModal} = yield select();
    const user = yield call(api.reAuthenticate, token);
    if (!validate.isEmpty(user) && validate.isObject(user)) {
      yield all([
        put({type: actions.SET_TOKEN, payload: user.api_token}),
        put({type: actions.SET_AUTH, payload: user}),
        put({type: actions.SET_ORDERS, payload: user.orders}),
        put({type: actions.TOGGLE_GUEST, payload: false}),
        call(setProductFavorites, user.product_favorites),
        call(setClassifiedFavorites, user.classified_favorites)
      ]);
    } else {
      throw user;
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableErrorMessage, e)]);
  }
}

export function* startUpdateUserScenario(action) {
  try {
    const {name, mobile, email, address} = action.payload;
    const result = validate({name, mobile, email, address}, registerConstrains);
    if (validate.isEmpty(result)) {
      yield call(enableLoading);
      const user = yield call(api.updateUser, action.payload);
      if (!validate.isEmpty(user) && validate.isObject(user)) {
        yield all([
          put({type: actions.SET_AUTH, payload: user}),
          call(disableLoading),
          call(enableSuccessMessage, I18n.t('update_information_success')),
          put(NavigationActions.back())
        ]);
      } else {
        throw user;
      }
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

export function* setUsers(action) {
  try {
    const {searchParams, redirect} = action.payload;
    const users = yield call(api.getUsers, searchParams);
    if (!validate.isEmpty(users) && validate.isArray(users)) {
      yield all([
        put({type: actions.SET_USERS, payload: users}),
        put({type: actions.SET_SEARCH_PARAMS, payload: searchParams})
      ]);
      if (!validate.isEmpty(redirect) && redirect) {
        yield put(
          NavigationActions.navigate({
            routeName: 'UserIndex',
            params: {
              name: action.payload.name
            }
          })
        );
      }
    } else {
      yield put({type: actions.SET_USERS, payload: []});
      yield put({type: actions.SET_SEARCH_PARAMS, payload: {}});
      throw I18n.t(users);
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableWarningMessage, e)]);
  }
}

export function* getSearchCompanies(action) {
  try {
    const {searchParams, redirect} = action.payload;
    const users = yield call(api.getUsers, searchParams);
    if (!validate.isEmpty(users) && validate.isArray(users)) {
      yield put({type: actions.SET_HOME_COMPANIES, payload: users});
      if (!validate.isEmpty(redirect) && redirect) {
        yield put(
          NavigationActions.navigate({
            routeName: 'UserIndex',
            params: {
              name: I18n.t('companies')
            }
          })
        );
      }
    } else {
      yield put({type: actions.SET_HOME_COMPANIES, payload: []});
      throw users;
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableWarningMessage, e)]);
  }
}

export function* getHomeCompanies(action) {
  try {
    const {searchParams, redirect} = action.payload;
    const users = yield call(api.getUsers, searchParams);
    if (!validate.isEmpty(users) && validate.isArray(users)) {
      yield put({type: actions.SET_HOME_COMPANIES, payload: users});
      if (!validate.isEmpty(redirect) && redirect) {
        yield put(
          NavigationActions.navigate({
            routeName: 'UserIndex',
            params: {
              name: I18n.t('companies')
            }
          })
        );
      }
    } else {
      yield put({type: actions.SET_HOME_COMPANIES, payload: []});
      throw users;
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableWarningMessage, e)]);
  }
}

export function* startRefetchUserScenario(action) {
  yield call(setUsers, action);
}

export function* startAuthenticatedScenario() {
  try {
    const {token} = yield select();
    if (!validate.isEmpty(token)) {
      const user = yield call(api.authenticated, token); // get the auth user according to auth stored in storage
      if (!validate.isEmpty(user) && !validate.isEmpty(token)) {
        yield all([
          put({type: actions.SET_AUTH, payload: user}),
          put({type: actions.SET_TOKEN, payload: user.token}),
          put({type: actions.TOGGLE_GUEST, payload: false})
        ]);
      }
    }
  } catch (e) {
    yield all([
      call(disableLoading),
      call(enableErrorMessage, I18n.t('authenticated_error'))
    ]);
  }
}

export function* startRegisterScenario(action) {
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

export function* startRateUserScenario(action) {
  try {
    const user = yield call(api.rateUser, action.payload);
    if (!validate.isEmpty(user) && validate.isObject(user)) {
      yield call(enableSuccessMessage, I18n.t('rate_success'));
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableErrorMessage, e)]);
  }
}

export function* refetchUsers() {
  yield takeLatest(actions.REFETCH_USERS, startRefetchUserScenario);
}

export function* getUsers() {
  yield takeLatest(actions.GET_USERS, startGetUsersScenario);
}

export function* getUser() {
  yield takeLatest(actions.GET_USER, startGetUserScenario);
}

export function* getDesigner() {
  yield takeLatest(actions.GET_DESIGNER, startGetDesignerScenario);
}

export function* submitAuth() {
  yield takeLatest(actions.SUBMIT_AUTH, startSubmitAuthScenario);
}

export function* reAuthenticate() {
  yield takeLatest(actions.REAUTHENTICATE, startReAuthenticateScenario);
}

export function* googleLogin() {
  yield takeLatest(actions.GOOGLE_LOGIN, startGoogleLoginScenario);
}

export function* updateUser() {
  yield takeLatest(actions.UPDATE_USER, startUpdateUserScenario);
}

export function* submitLogout() {
  yield takeLatest(actions.REMOVE_AUTH, startLogoutScenario);
}

export function* register() {
  yield takeLatest(actions.REGISTER, startRegisterScenario);
}

export function* rateUser() {
  yield takeLatest(actions.RATE_USER, startRateUserScenario);
}

export function* becomeFan() {
  yield takeLatest(actions.BECOME_FAN, startBecomeFanScenario);
}
