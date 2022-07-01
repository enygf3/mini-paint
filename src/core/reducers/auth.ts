import { createReducer } from 'typesafe-actions';
import { AuthType, doAuthAction } from '../actions/auth';
import { AnyAction } from 'redux';
import { AuthState } from '../interfaces/auth';

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const auth = createReducer<AuthState, AuthType>(initialState)
  .handleAction(doAuthAction.request, () => ({
    ...initialState,
  }))
  .handleAction(
    doAuthAction.success,
    (state: AuthState, action: AnyAction) => ({
      ...state,
      isLoggedIn: true,
      user: action.payload.payload,
    })
  )
  .handleAction(doAuthAction.failure, () => ({
    ...initialState,
    isLoggedIn: false,
  }));

export default auth;
