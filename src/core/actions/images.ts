import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';

export enum ImagesTemplates {
  GET_DB_IMAGES = 'GET_DB_IMAGES',
  GET_DB_IMAGES_FAILED = 'GET_DB_IMAGES_SUCCEED',
  GET_DB_IMAGES_SUCCEED = 'GET_DB_IMAGES_SUCCEED',
  GET_RECENT_IMAGES = 'GET_RECENT_IMAGES',
  GET_RECENT_IMAGES_FAILED = 'GET_RECENT_IMAGES_FAILED',
  GET_RECENT_IMAGES_SUCCEED = 'GET_RECENT_IMAGES_SUCCEED',
  GET_USER_IMGS = 'GET_USER_IMGS',
  GET_USER_IMGS_FAILED = 'GET_USER_IMGS_FAILED',
  GET_USER_IMGS_SUCCEED = 'GET_USER_IMGS_SUCCEED',
  CLEAR_STATE = 'CLEAR_STATE',
  GET_PROFILE_IMGS = 'GET_PROFILE_IMG',
  GET_PROFILE_IMGS_SUCCEED = 'GET_PROFILE_IMGS_SUCCEED',
  GET_PROFILE_IMGS_FAILED = 'GET_PROFILE_IMGS_FAILED',
}

export const getDBImages = createAsyncAction(
  ImagesTemplates.GET_DB_IMAGES,
  ImagesTemplates.GET_DB_IMAGES_SUCCEED,
  ImagesTemplates.GET_DB_IMAGES_FAILED
)();
export const getUserImages = createAsyncAction(
  ImagesTemplates.GET_USER_IMGS,
  ImagesTemplates.GET_USER_IMGS_SUCCEED,
  ImagesTemplates.GET_USER_IMGS_FAILED
)();
export const getRecentImages = createAsyncAction(
  ImagesTemplates.GET_RECENT_IMAGES,
  ImagesTemplates.GET_RECENT_IMAGES_SUCCEED,
  ImagesTemplates.GET_RECENT_IMAGES_FAILED
)();
export const getProfileImages = createAsyncAction(
  ImagesTemplates.GET_PROFILE_IMGS,
  ImagesTemplates.GET_PROFILE_IMGS_SUCCEED,
  ImagesTemplates.GET_PROFILE_IMGS_FAILED
)();

export const clearState = createAction(ImagesTemplates.CLEAR_STATE)<void>();

export type ImagesType = ActionType<
  | typeof getDBImages
  | typeof getUserImages
  | typeof getRecentImages
  | typeof getProfileImages
  | typeof clearState
>;
