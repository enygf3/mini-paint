import { useAuthState } from "react-firebase-hooks/auth";

const defaultState = {
  user: null,
};

const authReducer = (state = defaultState, action: any): any => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, user: action.payload };
    case "SIGN_OUT":
    case "SAVE_IMG":
    case "DELETE_IMG":
    case "SET_STATE_SIGNED_OUT":
    case "SET_STATE_SIGNED_IN":
      return { ...state, isAuthenticated: true };
    default:
      return state;
  }
};

export default authReducer;
