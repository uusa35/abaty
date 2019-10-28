import {call, put, all, takeLatest} from 'redux-saga/effects';
import * as api from '../api';
import * as actions from '../types';
import {NavigationActions} from 'react-navigation';
import I18n from '../../../I18n';
import {
  disableLoading,
  disableLoadingContent,
  enableErrorMessage,
  enableLoading,
  enableLoadingContent,
  enableSuccessMessage,
  enableWarningMessage,
} from './settingSagas';
import {storeClassifiedConstrains} from '../../../constants';
import validate from 'validate.js';
import {HIDE_SEARCH_MODAL, SHOW_SEARCH_MODAL, SET_CATEGORY} from '../types';
import {first, values} from 'lodash';
import {startGetHomeCompaniesScenario} from './userSagas';

export function* startGetClassifiedsScenario(action) {
  const {searchParams, redirect, name} = action.payload;
  try {
    const classifieds = yield call(api.getSearchClassifieds, searchParams);
    yield put({type: HIDE_SEARCH_MODAL});
    if (!validate.isEmpty(classifieds) && validate.isArray(classifieds)) {
      yield all([
        put({type: actions.SET_CLASSIFIEDS, payload: classifieds}),
        put({type: actions.SET_SEARCH_PARAMS, payload: searchParams}),
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
    yield all([
      call(disableLoading),
      call(enableWarningMessage, I18n.t('no_classifieds')),
    ]);
  }
}

export function* startGetClassifiedScenario(action) {
  try {
    yield call(enableLoadingContent);
    const classified = yield call(api.getClassified, action.payload);
    if (!validate.isEmpty(classified) && validate.isObject(classified)) {
      yield put({type: actions.SET_CLASSIFIED, payload: classified});
      yield all([
        put(
          NavigationActions.navigate({
            routeName: 'Classified',
            params: {
              name: classified.name,
              id: classified.id,
              model: 'classified',
            },
          }),
        ),
        call(disableLoadingContent),
      ]);
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(I18n.t('no_classifieds'))]);
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
    console.log('fired');
    const {name, mobile, description, images, image, price} = action.payload;
    const result = validate(
      {name, mobile, images, image, description, price},
      storeClassifiedConstrains,
    );
    if (validate.isEmpty(result)) {
      yield call(enableLoading);
      const classified = yield call(api.storeClassified, action.payload);
      console.log('classifed', classified);
      if (!validate.isEmpty(classified) && validate.isObject(classified)) {
        yield all([
          call(disableLoading),
          call(enableSuccessMessage, I18n.t('update_information_success')),
          put(NavigationActions.navigate({routeName: 'HomeKey'})),
        ]);
      } else {
        throw classified;
      }
    } else {
      throw first(values(result))[0];
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableErrorMessage, e)]);
  }
}

export function* getClassified() {
  yield takeLatest(actions.GET_CLASSIFIED, startGetClassifiedScenario);
}

export function* storeClassified() {
  yield takeLatest(actions.STORE_CLASSIFIED, startStoreClassifiedScenario);
}

export function* startNewClassified() {
  yield takeLatest(actions.START_NEW_CLASSIFIED, startNewClassifiedScenario);
}

export function* startNewClassifiedScenario(action) {
  const category = action.payload;
  yield put({type: actions.CLEAR_PROPERTIES});
  yield put({type: actions.SHOW_PROPERTIES_MODAL});
  yield put({type: actions.SET_CATEGORY, payload: category});
  if (category.has_categoryGroups) {
    yield put(
      NavigationActions.navigate({
        routeName: 'ChooseCategoryGroups',
      }),
    );
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
