import {
  GET_DB_IMAGES_SUCCEED,
  GET_DB_IMAGES_FAILED,
  SAVE_IMG,
  SAVE_IMG_FAILED,
} from "../actions";

export const saveImgSucceed = (img: any) => {
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

export const getDBImagesSucceed = (images: any) => {
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
