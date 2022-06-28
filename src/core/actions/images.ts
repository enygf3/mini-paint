import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';

export enum ImagesTemplates {
  GetDBImages = 'GET_DB_IMAGES',
  GetDBImagesFailed = 'GET_DB_IMAGES_FAILED',
  GetDBImagesSucceed = 'GET_DB_IMAGES_SUCCEED',
  GetRecentImages = 'GET_RECENT_IMAGES',
  GetRecentImagesFailed = 'GET_RECENT_IMAGES_FAILED',
  GetRecentImagesSucceed = 'GET_RECENT_IMAGES_SUCCEED',
  GetUserImages = 'GET_USER_IMAGES',
  GetUserImagesFailed = 'GET_USER_IMAGES_FAILED',
  GetUserImagesSucceed = 'GET_USER_IMAGES_SUCCEED',
  ClearState = 'CLEAR_STATE',
  GetProfileImages = 'GET_PROFILE_IMAGES',
  GetProfileImagesSucceed = 'GET_PROFILE_IMAGES_SUCCEED',
  GetProfileImagesFailed = 'GET_PROFILE_IMAGES_FAILED',
}

export const getDBImages = createAsyncAction(
  ImagesTemplates.GetDBImages,
  ImagesTemplates.GetDBImagesSucceed,
  ImagesTemplates.GetDBImagesFailed
)();
export const getUserImages = createAsyncAction(
  ImagesTemplates.GetUserImages,
  ImagesTemplates.GetUserImagesSucceed,
  ImagesTemplates.GetUserImagesFailed
)();
export const getRecentImages = createAsyncAction(
  ImagesTemplates.GetRecentImages,
  ImagesTemplates.GetRecentImagesSucceed,
  ImagesTemplates.GetRecentImagesFailed
)();
export const getProfileImages = createAsyncAction(
  ImagesTemplates.GetProfileImages,
  ImagesTemplates.GetProfileImagesSucceed,
  ImagesTemplates.GetProfileImagesFailed
)();

export const clearState = createAction(ImagesTemplates.ClearState)<void>();

export type ImagesType = ActionType<
  | typeof getDBImages
  | typeof getUserImages
  | typeof getRecentImages
  | typeof getProfileImages
  | typeof clearState
>;
