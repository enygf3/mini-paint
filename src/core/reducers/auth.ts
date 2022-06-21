import { createReducer } from 'typesafe-actions';
import { AuthType, doAuth } from '../actions/auth';
import { AnyAction } from 'redux';
import { AuthState } from './types';

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

const auth = createReducer<AuthState, AuthType>(initialState)
  .handleAction(doAuth.request, () => ({
    ...initialState,
  }))
  .handleAction(doAuth.success, (state: AuthState, action: AnyAction) => ({
    ...state,
    isLoggedIn: true,
    user: action.payload.payload,
  }))
  .handleAction(doAuth.failure, () => ({
    ...initialState,
    isLoggedIn: false,
  }));

export default auth;
