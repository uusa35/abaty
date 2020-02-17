import {call, put, all, takeLatest, select} from 'redux-saga/effects';
import * as api from '../api';
import * as actions from '../types';
import {NavigationActions} from 'react-navigation';
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
} from '../../../constants';
import validate from 'validate.js';
import {HIDE_SEARCH_MODAL, SHOW_SEARCH_MODAL, SET_CATEGORY} from '../types';
import {first, values} from 'lodash';
import {SET_CLASSIFIED} from '../types';
import {isLocal} from '../../../env';

export function* startGetClassifiedsScenario(action) {
  const {searchParams, redirect, name} = action.payload;
  try {
    const classifieds = yield call(api.getSearchClassifieds, searchParams);
    if (!validate.isEmpty(classifieds) && validate.isArray(classifieds)) {
      yield all([
        put({type: HIDE_SEARCH_MODAL}),
        put({type: actions.SET_SEARCH_PARAMS, payload: searchParams}),
        put({type: actions.SET_CLASSIFIEDS, payload: classifieds}),
      ]);
      if (!validate.isEmpty(redirect) && redirect) {
        yield put(
          NavigationActions.navigate({
            routeName: 'ClassifiedIndex',
            params: {
              name: name ? name : I18n.t('classifieds'),
            },
          }),
        );
      }
    } else {
      throw classifieds;
    }
  } catch (e) {
    yield all([
      call(disableLoading),
      call(enableWarningMessage, I18n.t('no_classifieds')),
    ]);
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
          NavigationActions.navigate({
            routeName: 'ClassifiedIndex',
            params: {
              name: name ? name : I18n.t('classifieds'),
            },
          }),
        );
      }
    } else {
      yield put({type: actions.SET_HOME_CLASSIFIEDS, payload: []});
    }
  } catch (e) {
    yield call(enableWarningMessage, I18n.t('no_classifieds'));
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
          NavigationActions.navigate({
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
    }
  } catch (e) {
    yield call(enableErrorMessage, I18n.t('no_classifieds'));
  } finally {
    yield call(disableLoadingContent);
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
    const {name, mobile, description, images, image, price} = action.payload;
    const result = validate(
      {name, mobile, images, image, description, price},
      storeClassifiedConstrains,
    );
    if (validate.isEmpty(result)) {
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
          put(NavigationActions.navigate({routeName: 'Home'})),
        ]);
        // }
      } else {
        throw element;
      }
    } else {
      throw first(values(result))[0];
    }
  } catch (e) {
    console.log('the error', e);
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
          put(NavigationActions.back()),
        ]);
      } else {
        throw element;
      }
    } else {
      throw first(values(result))[0];
    }
  } catch (e) {
    console.log('the error', e);
    yield call(enableErrorMessage, e);
  } finally {
    yield call(disableLoadingContent);
  }
}

export function* getClassified() {
  yield takeLatest(actions.GET_CLASSIFIED, startGetClassifiedScenario);
}

export function* storeClassified() {
  yield takeLatest(actions.STORE_CLASSIFIED, startStoreClassifiedScenario);
}

export function* editClassified() {
  yield takeLatest(actions.EDIT_CLASSIFIED, startEditClassifiedScenario);
}

export function* startNewClassified() {
  yield takeLatest(actions.START_NEW_CLASSIFIED, startNewClassifiedScenario);
}

export function* startNewClassifiedScenario(action) {
  const category = action.payload;
  yield put({type: actions.CLEAR_PROPERTIES});
  yield put({type: actions.SHOW_PROPERTIES_MODAL});
  yield put({type: actions.SET_CATEGORY, payload: category});
  if (category.is_real_estate) {
    if (category.has_categoryGroups) {
      yield put(
        NavigationActions.navigate({
          routeName: 'ChooseCategoryGroups',
        }),
      );
    } else {
      yield put(
        NavigationActions.navigate({
          routeName: 'ChooseCategoryGroups',
        }),
      );
    }
  } else {
    yield put({type: actions.HIDE_PROPERTIES_MODAL});
    yield put(
      NavigationActions.navigate({
        routeName: 'ClassifiedStore',
      }),
    );
  }
}

export function* getSearchClassifieds() {
  yield takeLatest(actions.GET_CLASSIFIEDS, startGetClassifiedsScenario);
}

export function* triggerStartClassifiedSearching() {
  yield takeLatest(
    actions.START_CLASSIFIED_SEARCHING,
    startClassifiedSearchingScenario,
  );
}

export function* triggerGetMyClassifieds() {
  yield takeLatest(actions.GET_MY_CLASSIFIEDS, startGetMyClassifiedsScenario);
}

export function* getHomeClassifieds() {
  yield takeLatest(
    actions.GET_HOME_CLASSIFIEDS,
    startGetHomeClassifiedsScenario,
  );
}

export function* startClassifiedSearchingScenario(action) {
  const element = action.payload;
  yield all([
    put({type: SET_CATEGORY, payload: element}),
    put({type: SHOW_SEARCH_MODAL}),
    put(NavigationActions.navigate({routeName: 'ClassifiedFilter'})),
  ]);
}

export function* startGetMyClassifiedsScenario(action) {
  try {
    const {auth} = yield select();
    const {redirect} = action.payload;
    yield call(enableLoadingBoxedList);
    if (!validate.isEmpty(redirect) && redirect) {
      const {auth} = yield select();
      yield put(
        NavigationActions.navigate({
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
