import {
  SET_STATE_SIGNED_IN,
  SIGN_IN_FAILED,
  SET_STATE_SIGNED_OUT,
  SIGN_OUT_FAILED,
} from "../actions";

export const signInUserSucceed = (user: any) => {
  return {
    type: SET_STATE_SIGNED_IN,
    payload: user,
    isLoggedIn: true,
  };
};

export const signInUserFailed = () => {
  return {
    type: SIGN_IN_FAILED,
  };
};

export const signOutUserSucceed = () => {
  return {
    type: SET_STATE_SIGNED_OUT,
    payload: null,
    isLoggedIn: false,
  };
};

export const signOutUserFailed = () => {
  return {
    type: SIGN_OUT_FAILED,
  };
};
