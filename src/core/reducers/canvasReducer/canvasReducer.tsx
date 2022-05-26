import { GET_IMAGE_DATA, DELETE_IMAGE_DATA } from "../../actions/actions";

export interface editorState {
  color: string;
  width: number;
  background: string;
  canvas: any;
}

const initialState: editorState = {
  color: "#000000",
  width: 1,
  background: "#ffffff",
  canvas: null,
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
    default:
      return state;
  }
};

export default authReducer;
