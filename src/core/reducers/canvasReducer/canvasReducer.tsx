import { GET_IMAGE_DATA, DELETE_IMAGE_DATA } from "../../actions/actions";

const initialState = {
  img: null,
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
    default:
      return state;
  }
};

export default authReducer;
