import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import {
  disableLoadingBoxedList,
  enableLoadingBoxedList,
  enableWarningMessage,
} from './settingSagas';
import * as actions from '../types';
import * as api from '../api';
import validate from 'validate.js';
import {isLocal} from '../../../env';
import {SET_CATEGORY} from '../types';

export function* getHometypeCategories(action) {
  try {
    console.log('action', action);
    const elements = yield call(api.getHomeCategories, action);
    console.log('elements form outside if', elements);
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
      console.log('elements', elements);
      console.log('type', action.type);
      if (action.type === 'is_user') {
        yield put({type: actions.SET_HOME_USER_CATEGORIES, payload: elements});
      } else if (action.type === 'is_classified') {
        yield put({
          type: actions.SET_HOME_CLASSIFIED_CATEGORIES,
          payload: elements,
        });
      }
      const {category} = yield select();
      if (validate.isEmpty(category)) {
        yield put({type: SET_CATEGORY, payload: first(elements)});
      }
    } else {
      yield put({type: actions.SET_HOME_CATEGORIES, payload: []});
    }
  } catch (e) {
    if (isLocal) {
      console.log('e', e);
    }
  } finally {
  }
}
