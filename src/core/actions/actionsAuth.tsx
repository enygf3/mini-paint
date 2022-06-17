import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
} from "./actionCreators";

export const signInUserSucceed = (user: object) => {
  return signInSuccess({ payload: user, isLoggedIn: true });
};

export const signInUserFailed = (): { type: string } => {
  return signInFailed();
};

export const signOutUserSucceed = () => {
  return signOutSuccess({ payload: null, isLoggedIn: false });
};

export const signOutUserFailed = (): { type: string } => {
  return signOutFailed();
};
