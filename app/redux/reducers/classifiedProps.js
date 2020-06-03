import {
  SET_PROPERTIES,
  CLEAR_PROPERTIES,
  ADD_TO_PROPERTIES,
} from '../actions/types';
import {uniqBy} from 'lodash';

export default function (classifiedProps = [], action) {
  switch (action.type) {
    case ADD_TO_PROPERTIES:
      return uniqBy(
        classifiedProps.concat(action.payload),
        'category_group_property',
      );
    case SET_PROPERTIES:
      return action.payload;
    case CLEAR_PROPERTIES:
      return [];
    default:
      return classifiedProps;
  }
}
