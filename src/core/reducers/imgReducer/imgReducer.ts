import {
  GET_DB_IMAGES,
  GET_DB_IMAGES_SUCCEED,
  GET_RECENT_IMAGES_SUCCEED,
} from "../../actions/actions";

const initialState = {
  images: [],
  recentImages: [],
  start: 0,
  loading: true,
  recentLoading: true,
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
    default:
      return state;
  }
};

export default imgReducer;
