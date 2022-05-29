import {
  GET_IMAGE_DATA,
  SET_PEN_WIDTH,
  SET_PEN_COLOR,
  SET_SHAPE,
} from "../actions";

export const getImageData = (img: any) => {
  return {
    type: GET_IMAGE_DATA,
    payload: img,
  };
};

export const setPenWidth = (width: number) => {
  return {
    type: SET_PEN_WIDTH,
    payload: width,
  };
};

export const setPenColor = (color: number) => {
  return {
    type: SET_PEN_COLOR,
    payload: color,
  };
};

export const setShape = (shape: string) => {
  return {
    type: SET_SHAPE,
    payload: shape,
  };
};
