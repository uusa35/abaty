import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import * as actions from '../types';
import * as api from '../api';
import validate from 'validate.js';
import {isLocal} from '../../../env';
import {SET_CATEGORY} from '../types';
import {first} from 'lodash';

export function* getHomeUserCategories(action) {
  try {
    const elements = yield call(api.getHomeCategories, action.payload);
    if (!validate.isEmpty(elements)) {
      yield put({type: actions.SET_HOME_USER_CATEGORIES, payload: elements});
    } else {
      yield put({type: actions.SET_HOME_USER_CATEGORIES, payload: []});
    }
    const {category} = yield select();
    if (validate.isEmpty(category)) {
      yield put({type: SET_CATEGORY, payload: first(elements)});
    }
  } catch (e) {
    if (isLocal) {
      // console.log('e', e);
    }
  } finally {
  }
}

export function* getHomeClassifiedCategories(action) {
  try {
    const elements = yield call(api.getHomeCategories, action.payload);
    if (!validate.isEmpty(elements)) {
      yield put({
        type: actions.SET_HOME_CLASSIFIED_CATEGORIES,
        payload: elements,
      });
    } else {
      yield put({
        type: actions.SET_HOME_CLASSIFIED_CATEGORIES,
        payload: [],
      });
    }
  } catch (e) {
    if (isLocal) {
      // console.log('e', e);
    }
  } finally {
  }
}
