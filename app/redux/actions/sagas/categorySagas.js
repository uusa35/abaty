import {call, put, all, takeLatest, select, delay} from 'redux-saga/effects';
import * as actions from '../types';
import * as api from '../api';
import validate from 'validate.js';
import {isLocal} from '../../../env';
import {SET_CATEGORY} from '../types';
import {first} from 'lodash';

export function* getHometypeCategories(action) {
  try {
    const elements = yield call(api.getHomeCategories, action);
    if (!validate.isEmpty(elements) && validate.isArray(elements)) {
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
    }
  } catch (e) {
    if (isLocal) {
      console.log('e', e);
    }
  } finally {
  }
}
