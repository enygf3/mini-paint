import { SAVE_IMG, SAVE_IMG_FAILED } from "../actions";

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
