import { ActionType, createAsyncAction } from 'typesafe-actions';

export enum AuthTemplates {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  SIGN_IN_FAILED = 'SIGN_IN_FAILED',
  SIGN_OUT_FAILED = 'SIGN_OUT_FAILED',
  SET_STATE_SIGNED_IN = 'SET_STATE_SIGNED_IN',
  SET_STATE_SIGNED_OUT = 'SET_STATE_SIGNED_OUT',
}

export const doAuth = createAsyncAction(
  AuthTemplates.SIGN_IN,
  AuthTemplates.SET_STATE_SIGNED_IN,
  AuthTemplates.SIGN_IN_FAILED
)();

export const doSignOut = createAsyncAction(
  AuthTemplates.SIGN_OUT,
  AuthTemplates.SET_STATE_SIGNED_OUT,
  AuthTemplates.SIGN_OUT_FAILED
)();

export type AuthType = ActionType<typeof doAuth | typeof doSignOut>;
