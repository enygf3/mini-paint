import { GET_IMAGE_DATA } from "../actions";

export const getImageData = (img: any) => {
  return {
    type: GET_IMAGE_DATA,
    payload: img,
  };
};
