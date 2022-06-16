import {
  GET_DB_IMAGES,
  GET_DB_IMAGES_SUCCEED,
  GET_RECENT_IMAGES_SUCCEED,
  GET_USER_IMGS_FAILED,
  GET_USER_IMGS_SUCCEED,
  CLEAR_STATE,
} from "../../actions/actions";

const initialState = {
  images: [],
  recentImages: [],
  start: 0,
  loading: true,
  recentLoading: true,
  userImages: [],
};

const imgReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_DB_IMAGES_SUCCEED:
      return {
        ...state,
        images: action.payload,
        loading: false,
      };
    case GET_RECENT_IMAGES_SUCCEED:
      return {
        ...state,
        recentImages: action.payload,
        recentLoading: false,
      };
    case GET_DB_IMAGES:
      return {
        ...state,
        start: state.start + 5,
        loading: true,
      };
    case GET_USER_IMGS_SUCCEED:
      return {
        ...state,
        userImages: action.payload,
        loading: false,
      };
    case GET_USER_IMGS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case CLEAR_STATE:
      return {
        images: [],
        recentImages: [],
        start: 0,
        loading: true,
        recentLoading: true,
        userImages: [],
      };
    default:
      return state;
  }
};

export default imgReducer;
