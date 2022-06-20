import { createAsyncAction, createAction, ActionType } from 'typesafe-actions';
import {
  GET_DB_IMAGES,
  GET_DB_IMAGES_FAILED,
  GET_DB_IMAGES_SUCCEED,
  GET_RECENT_IMAGES,
  GET_RECENT_IMAGES_SUCCEED,
  GET_USER_IMGS,
  GET_USER_IMGS_FAILED,
  GET_USER_IMGS_SUCCEED,
  SAVE_IMG,
  SAVE_IMG_FAILED,
  SET_STATE_SIGNED_IN,
  SET_STATE_SIGNED_OUT,
  SIGN_IN,
  SIGN_IN_FAILED,
  SIGN_OUT,
  SIGN_OUT_FAILED,
  GET_RECENT_IMAGES_FAILED,
  GET_IMAGE_DATA,
  CLEAR_STATE,
  DELETE_IMAGE_DATA,
  SET_PEN_WIDTH,
  SET_PEN_COLOR,
  SET_SHAPE,
  ERASE,
} from './actions';

export const getImage = createAsyncAction(
  GET_IMAGE_DATA,
  SAVE_IMG,
  SAVE_IMG_FAILED
)<{ payload: string }>();
export const getDBImages = createAsyncAction(
  GET_DB_IMAGES,
  GET_DB_IMAGES_SUCCEED,
  GET_DB_IMAGES_FAILED
)();
export const getUserImages = createAsyncAction(
  GET_USER_IMGS,
  GET_USER_IMGS_SUCCEED,
  GET_USER_IMGS_FAILED
)();
export const getRecentImages = createAsyncAction(
  GET_RECENT_IMAGES,
  GET_RECENT_IMAGES_SUCCEED,
  GET_RECENT_IMAGES_FAILED
)();
export const doAuth = createAsyncAction(
  SIGN_IN,
  SET_STATE_SIGNED_IN,
  SIGN_IN_FAILED
)();
export const doSignOut = createAsyncAction(
  SIGN_OUT,
  SET_STATE_SIGNED_OUT,
  SIGN_OUT_FAILED
)();

export const clearState = createAction(CLEAR_STATE)();
export const deleteImg = createAction(DELETE_IMAGE_DATA)();
export const setPenWidth = createAction(SET_PEN_WIDTH)<{ width: number }>();
export const setPenColor = createAction(SET_PEN_COLOR)<{ color: string }>();
export const setShape = createAction(SET_SHAPE)<{ shape: string }>();
export const erase = createAction(ERASE)<void>();
export const saveImg = createAction(SAVE_IMG)<void>();
export const saveImgFailed = createAction(SAVE_IMG_FAILED)<void>();

export type CreatorsType = ActionType<
  | typeof clearState
  | typeof deleteImg
  | typeof setPenWidth
  | typeof setPenColor
  | typeof setShape
  | typeof erase
  | typeof saveImg
  | typeof saveImgFailed
  | typeof getImage
  | typeof getDBImages
  | typeof getUserImages
  | typeof getRecentImages
  | typeof doAuth
  | typeof doSignOut
>;
