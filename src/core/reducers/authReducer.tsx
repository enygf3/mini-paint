import { ActionCreator, createReducer } from 'typesafe-actions';
import { doAuth } from '../actions/actionCreators';
import { AnyAction } from 'redux';

interface State {
  isLoggedIn: boolean;
  user: object | null;
}

const initialState: State = {
  isLoggedIn: false,
  user: null,
};

const authReducer: ActionCreator = createReducer<State>(initialState)
  .handleAction(doAuth.request, () => ({
    ...initialState,
  }))
  .handleAction(doAuth.success, (state: State, action: AnyAction) => ({
    ...state,
    isLoggedIn: true,
    user: action.payload.payload,
  }))
  .handleAction(doAuth.failure, () => ({
    ...initialState,
    isLoggedIn: false,
  }));

export default authReducer;
