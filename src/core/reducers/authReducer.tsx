import {
  SET_STATE_SIGNED_IN,
  SIGN_IN,
  SIGN_IN_FAILED,
} from "../actions/actions";
import { AnyAction } from "redux";

const initialState = {
  isLoggedIn: false,
  user: null,
};

const authReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state };
    case SIGN_IN_FAILED:
      console.log("failed to login");
      return 0;
    case SET_STATE_SIGNED_IN:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default authReducer;
