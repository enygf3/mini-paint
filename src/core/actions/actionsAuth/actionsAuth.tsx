import { SIGN_IN, SIGN_OUT, SIGN_IN_FAILED } from "../actions";

export const signInUserSucceed = (user: any) => {
  return {
    type: SIGN_IN,
    payload: user
  };
};

export const signInUserFailed = () => {
    return {
        type: SIGN_IN_FAILED
    };
};