import { SET_STATE_SIGNED_IN, SIGN_IN_FAILED } from "../actions";

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
