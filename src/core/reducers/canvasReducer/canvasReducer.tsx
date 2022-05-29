import {
  GET_IMAGE_DATA,
  DELETE_IMAGE_DATA,
  SET_PEN_WIDTH,
  SET_PEN_COLOR,
  SET_SHAPE,
  ERASE,
} from "../../actions/actions";

export interface editorState {
  color: string;
  width: number;
  background: string;
  canvas: any;
  shape: string;
  erase: boolean;
}

const initialState: editorState = {
  color: "#000000",
  width: 1,
  background: "#ffffff",
  canvas: null,
  shape: "",
  erase: false,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_IMAGE_DATA:
      return {
        ...state,
        canvas: action.payload.canvas,
      };
    case DELETE_IMAGE_DATA:
      return {
        ...state,
        canvas: null,
      };
    case SET_PEN_WIDTH:
      return {
        ...state,
        width: action.payload.width,
      };
    case SET_PEN_COLOR:
      return {
        ...state,
        color: action.payload.color,
      };
    case SET_SHAPE:
      return {
        ...state,
        shape: action.payload.shape,
      };
    case ERASE:
      return {
        ...state,
        erase: action.payload.erase,
      };
    default:
      return state;
  }
};

export default authReducer;
