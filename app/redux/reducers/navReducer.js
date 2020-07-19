/**
 * Created by usamaahmed on 10/5/17.
 */
import RootNavigator from './../../navigator/RootNavigator';

const initialState = RootNavigator.router.getStateForAction(
  RootNavigator.router.getActionForPathAndParams('DrawerStack'),
);

export default function (state = initialState, action) {
  const nextState = RootNavigator.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}
