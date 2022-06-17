import {
  saveImageSuccess,
  saveImageFailed,
  getDBImagesSuccess,
  getDBImagesFailed,
  getUserImagesSuccess,
  getUserImagesFailed,
  getRecentImagesFailed,
  getRecentImagesSuccess,
} from "./actionCreators";

export const saveImgSucceed = (img: string) => {
  return saveImageSuccess(img);
};

export const saveImgFailed = () => {
  return saveImageFailed();
};

export const getDBImagesSucceed = (images: Array<object>) => {
  return getDBImagesSuccess(images);
};

export const getDBImagesFail = () => {
  return getDBImagesFailed();
};

export const getRecentImgsSucceed = (images: Array<object>) => {
  return getRecentImagesSuccess(images);
};

export const getRecentImgsFailed = () => {
  return getRecentImagesFailed();
};

export const getUserImgsSucceed = (images: Array<object>) => {
  return getUserImagesSuccess(images);
};

export const getUserImgsFailed = () => {
  return getUserImagesFailed();
};
