import { ActionType, createAsyncAction } from 'typesafe-actions';

export enum AuthTemplates {
  SignIn = 'SIGN_IN',
  SignOut = 'SIGN_OUT',
  SignInFailed = 'SIGN_IN_FAILED',
  SignOutFailed = 'SIGN_OUT_FAILED',
  SetStateSignedIn = 'SET_STATE_SIGNED_IN',
  SetStateSignedOut = 'SET_STATE_SIGNED_OUT',
}

export const doAuthAction = createAsyncAction(
  AuthTemplates.SignIn,
  AuthTemplates.SetStateSignedIn,
  AuthTemplates.SignInFailed
)();

export const doSignOutAction = createAsyncAction(
  AuthTemplates.SignOut,
  AuthTemplates.SetStateSignedOut,
  AuthTemplates.SignOutFailed
)();

export type AuthType = ActionType<typeof doAuthAction | typeof doSignOutAction>;
