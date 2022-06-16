import {
  GET_DB_IMAGES_SUCCEED,
  GET_DB_IMAGES_FAILED,
  SAVE_IMG,
  SAVE_IMG_FAILED,
  GET_RECENT_IMAGES_SUCCEED,
  GET_RECENT_IMAGES_FAILED,
  GET_USER_IMGS,
  GET_USER_IMGS_SUCCEED,
  GET_USER_IMGS_FAILED,
} from "../actions";

export const saveImgSucceed = (img: string) => {
  return {
    type: SAVE_IMG,
    payload: img,
  };
};

export const saveImgFailed = () => {
  return {
    type: SAVE_IMG_FAILED,
  };
};

export const getDBImagesSucceed = (images: Array<object>) => {
  return {
    type: GET_DB_IMAGES_SUCCEED,
    payload: images,
  };
};

export const getDBImagesFailed = () => {
  return {
    type: GET_DB_IMAGES_FAILED,
  };
};

export const getRecentImgsSucceed = (images: Array<object>) => {
  return {
    type: GET_RECENT_IMAGES_SUCCEED,
    payload: images,
  };
};

export const getRecentImgsFailed = () => {
  return {
    type: GET_RECENT_IMAGES_FAILED,
  };
};

export const getUserImgsSucceed = (images: Array<object>) => {
  return {
    type: GET_USER_IMGS_SUCCEED,
    payload: images,
  };
};

export const getUserImgsFailed = () => {
  return {
    type: GET_USER_IMGS_FAILED,
  };
};
