import {
  SET_STATE_SIGNED_IN,
  SIGN_IN_FAILED,
  SET_STATE_SIGNED_OUT,
  SIGN_OUT_FAILED,
} from "./actions";

export const signInUserSucceed = (
  user: object
): { payload: object; isLoggedIn: boolean; type: string } => {
  return {
    type: SET_STATE_SIGNED_IN,
    payload: user,
    isLoggedIn: true,
  };
};

export const signInUserFailed = (): { type: string } => {
  return {
    type: SIGN_IN_FAILED,
  };
};

export const signOutUserSucceed = (): {
  type: string;
  payload: null;
  isLoggedIn: boolean;
} => {
  return {
    type: SET_STATE_SIGNED_OUT,
    payload: null,
    isLoggedIn: false,
  };
};

export const signOutUserFailed = (): { type: string } => {
  return {
    type: SIGN_OUT_FAILED,
  };
};
