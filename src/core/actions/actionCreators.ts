import { createAction } from "typesafe-actions";
import {
  GET_DB_IMAGES_FAILED,
  GET_DB_IMAGES_SUCCEED,
  GET_RECENT_IMAGES_SUCCEED,
  GET_USER_IMGS_FAILED,
  GET_USER_IMGS_SUCCEED,
  SAVE_IMG,
  SAVE_IMG_FAILED,
  SET_STATE_SIGNED_IN,
  SET_STATE_SIGNED_OUT,
  SIGN_IN_FAILED,
  SIGN_OUT_FAILED,
  GET_RECENT_IMAGES_FAILED,
} from "./actions";

export const getDBImagesSuccess = createAction(GET_DB_IMAGES_SUCCEED)<
  Array<object>
>();
export const getDBImagesFailed = createAction(GET_DB_IMAGES_FAILED)();
export const getUserImagesSuccess = createAction(GET_USER_IMGS_SUCCEED)<
  Array<object>
>();
export const getRecentImagesSuccess = createAction(GET_RECENT_IMAGES_SUCCEED)<
  Array<object>
>();
export const getRecentImagesFailed = createAction(GET_RECENT_IMAGES_FAILED)();
export const getUserImagesFailed = createAction(GET_USER_IMGS_FAILED)();
export const saveImageSuccess = createAction(SAVE_IMG)<string>();
export const saveImageFailed = createAction(SAVE_IMG_FAILED)();
export const signInSuccess = createAction(SET_STATE_SIGNED_IN)<{
  payload: object;
  isLoggedIn: boolean;
}>();
export const signInFailed = createAction(SIGN_IN_FAILED)();
export const signOutSuccess = createAction(SET_STATE_SIGNED_OUT)<{
  payload: null;
  isLoggedIn: boolean;
}>();
export const signOutFailed = createAction(SIGN_OUT_FAILED)();
