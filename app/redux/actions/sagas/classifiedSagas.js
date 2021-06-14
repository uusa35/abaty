import {call, put, all, takeLatest, select} from 'redux-saga/effects';
import * as api from '../api';
import * as actions from '../types';
import * as RootNavigation from './../../../RootNavigation.js';
import I18n from '../../../I18n';
import {
  disableLoading,
  disableLoadingBoxedList,
  disableLoadingContent,
  enableErrorMessage,
  enableLoading,
  enableLoadingBoxedList,
  enableLoadingContent,
  enableSuccessMessage,
  enableWarningMessage,
} from './settingSagas';
import {
  editClassifiedConstrains,
  storeClassifiedConstrains,
} from '../../../constants/validations';
import validate from 'validate.js';
import {
  HIDE_CLASSIFIED_FILTER_MODAL,
  SHOW_SEARCH_MODAL,
  SET_CATEGORY,
} from '../types';
import {first, values} from 'lodash';
import {SET_CLASSIFIED} from '../types';
import {startReAuthenticateScenario} from './userSagas';

export function* startGetClassifiedsScenario(action) {
  try {
    const {searchParams, redirect, name} = action.payload;
    yield put({type: HIDE_CLASSIFIED_FILTER_MODAL});
    if (!validate.isEmpty(redirect) && redirect) {
      yield call(enableLoadingBoxedList);
    }
    const classifieds = yield call(api.getSearchClassifieds, searchParams);
    if (!validate.isEmpty(classifieds) && validate.isArray(classifieds)) {
      yield all([
        put({type: actions.SET_SEARCH_PARAMS, payload: searchParams}),
        put({type: actions.SET_SEARCH_CLASSIFIEDS, payload: classifieds}),
      ]);
      if (!validate.isEmpty(redirect) && redirect) {
        yield put(
          RootNavigation.navigate({
            routeName: 'ClassifiedIndex',
            params: {
              name: name ? name : I18n.t('classifieds'),
            },
          }),
        );
      }
    } else {
      yield all([
        put({type: actions.SET_SEARCH_PARAMS, payload: {}}),
        put({type: actions.SET_SEARCH_CLASSIFIEDS, payload: []}),
      ]);
      throw classifieds;
    }
  } catch (e) {
    yield call(enableWarningMessage, I18n.t('no_classifieds'));
  } finally {
    yield call(disableLoadingBoxedList);
  }
}

export function* startGetHomeClassifiedsScenario(action) {
  try {
    const {searchParams, redirect, name} = action.payload;
    const elements = yield call(api.getSearchClassifieds, searchParams);
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield all([put({type: actions.SET_HOME_CLASSIFIEDS, payload: elements})]);
      if (!validate.isEmpty(redirect) && redirect) {
        yield put(
          RootNavigation.navigate({
            routeName: 'ClassifiedIndex',
            params: {
              name: name ? name : I18n.t('classifieds'),
            },
          }),
        );
      }
    } else {
      yield all([
        put({type: actions.SET_SEARCH_PARAMS, payload: {}}),
        put({type: actions.SET_HOME_CLASSIFIEDS, payload: []}),
      ]);
      throw 'no_classifieds';
    }
  } catch (e) {
    // if (__DEV__) {
    //   console.log('e', e);
    // }
    // yield call(enableWarningMessage, I18n.t('no_classifieds'));
  } finally {
    yield call(disableLoading);
  }
}

export function* startGetClassifiedScenario(action) {
  try {
    yield call(enableLoadingContent);
    const {id, api_token, redirect} = action.payload;
    const element = yield call(api.getClassified, {id, api_token});
    if (
      !validate.isEmpty(element) &&
      validate.isObject(element) &&
      element.id
    ) {
      yield put({type: actions.SET_CLASSIFIED, payload: element});
      if (!validate.isEmpty(redirect) && redirect) {
        yield put(
          RootNavigation.navigate({
            routeName: 'Classified',
            params: {
              name: element.name,
              id: element.id,
              model: 'classified',
              type: 'classified',
            },
          }),
        );
      }
    } else {
      throw 'error';
    }
  } catch (e) {
    if (__DEV__) {
      // console.log('the e', e);
    }
    // yield call(enableErrorMessage, I18n.t('no_classifieds'));
  } finally {
    yield call(disableLoadingContent);
  }
}

export function* startDeleteClassifiedScenario(action) {
  try {
    const {token} = yield select();
    const element = yield call(api.deleteClassified, {
      id: action.payload,
      api_token: token,
      _method: 'DELETE',
    });
    if (!validate.isEmpty(element) && element.done) {
      yield all([
        yield call(enableWarningMessage, element.message),
        yield call(startReAuthenticateScenario),
      ]);
      yield put(RootNavigation.back());
    } else {
      throw element.message;
    }
  } catch (e) {
    if (__DEV__) {
      // console.log('the e', e);
    }
    yield call(enableErrorMessage, I18n.t('classified_not_removed'));
  } finally {
  }
}

export function* setClassifiedFavorites(classifiedFavorites) {
  if (
    !validate.isEmpty(classifiedFavorites) &&
    validate.isArray(classifiedFavorites)
  ) {
    yield put({
      type: actions.SET_CLASSIFIED_FAVORITES,
      payload: classifiedFavorites,
    });
  } else {
    yield put({type: actions.SET_CLASSIFIED_FAVORITES, payload: []});
  }
}

export function* startStoreClassifiedScenario(action) {
  try {
    yield call(enableLoading);
    const element = yield call(api.storeClassified, action.payload);
    if (
      !validate.isEmpty(element) &&
      validate.isObject(element) &&
      element.id
    ) {
      yield all([
        call(disableLoading),
        call(enableSuccessMessage, I18n.t('update_information_success')),
        put(RootNavigation.navigate({routeName: 'Home'})),
      ]);
    } else {
      throw element;
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableErrorMessage, e)]);
  }
}

export function* startEditClassifiedScenario(action) {
  try {
    yield call(enableLoadingContent);
    const {name, mobile, description, images, image, price} = action.payload;
    const {classified} = yield select();
    const result = validate(
      {name, mobile, images, image, description, price},
      editClassifiedConstrains,
    );
    if (validate.isEmpty(result)) {
      const element = yield call(api.updateClassified, {
        elements: action.payload,
        id: classified.id,
      });
      if (
        !validate.isEmpty(element) &&
        validate.isObject(element) &&
        element.id
      ) {
        yield all([
          call(enableSuccessMessage, I18n.t('update_information_success')),
          put({type: SET_CLASSIFIED, payload: element}),
          put(RootNavigation.back()),
        ]);
      } else {
        throw element;
      }
    } else {
      throw first(values(result))[0];
    }
  } catch (e) {
    yield call(enableErrorMessage, e);
  } finally {
    yield call(disableLoadingContent);
  }
}

export function* startNewClassifiedScenario(action) {
  const category = action.payload;
  yield put({type: actions.CLEAR_PROPERTIES});
  yield put({type: actions.SHOW_PROPERTIES_MODAL});
  yield put({type: actions.SET_CATEGORY, payload: category});
  if (category.is_real_estate) {
    if (category.has_categoryGroups) {
      yield put(
        RootNavigation.navigate({
          routeName: 'ChooseCategoryGroups',
        }),
      );
    } else {
      yield put(
        RootNavigation.navigate({
          routeName: 'ChooseCategoryGroups',
        }),
      );
    }
  } else {
    yield put({type: actions.HIDE_PROPERTIES_MODAL});
    yield put(
      RootNavigation.navigate({
        routeName: 'ClassifiedStore',
        params: {reset: false},
      }),
    );
  }
}

export function* startClassifiedSearchingScenario(action) {
  const element = action.payload;
  yield all([
    put({type: SET_CATEGORY, payload: element}),
    put({type: SHOW_SEARCH_MODAL}),
    put(RootNavigation.navigate({routeName: 'ClassifiedFilter'})),
  ]);
}

export function* startGetMyClassifiedsScenario(action) {
  try {
    const {redirect} = action.payload;
    yield call(enableLoadingBoxedList);
    if (!validate.isEmpty(redirect) && redirect) {
      const {auth} = yield select();
      yield put(
        RootNavigation.navigate({
          routeName: 'ProfileClassifiedIndex',
          params: {
            name: auth.slug ? auth.slug : I18n.t('classifieds'),
          },
        }),
      );
    }
    // }
  } catch (e) {
    yield call(enableErrorMessage, 'No classifieds for profile');
  } finally {
    yield call(disableLoadingBoxedList);
  }
}

export function* getClassifiedIndex() {
  try {
    const elements = yield call(api.getSearchClassifieds);
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      yield all([put({type: actions.SET_CLASSIFIEDS, payload: elements})]);
    }
  } catch (e) {
    yield all([
      disableLoading,
      // enableErrorMessage(I18n.t('no_classifieds'))
    ]);
  }
}

export function* startGetAllClassifiedsSceanrio(action) {
  try {
    const classifieds = yield call(api.getSearchClassifieds, {});
    if (!validate.isEmpty(classifieds) && validate.isArray(classifieds)) {
      yield all([
        put({type: HIDE_CLASSIFIED_FILTER_MODAL}),
        put({type: actions.SET_CLASSIFIEDS, payload: classifieds}),
      ]);
    } else {
      yield all([put({type: actions.SET_CLASSIFIEDS, payload: []})]);
      throw classifieds;
    }
  } catch (e) {
  } finally {
  }
}
