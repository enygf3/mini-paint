import {
  GET_IMAGE_DATA,
  DELETE_IMAGE_DATA,
  SET_CANVAS,
} from "../../actions/actions";

const initialState = {
  img: null,
  canvas: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_IMAGE_DATA:
      return {
        ...state,
        img: action.payload,
      };
    case DELETE_IMAGE_DATA:
      return {
        ...state,
        img: null,
      };
    case SET_CANVAS:
      return {
        ...state,
        canvas: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
