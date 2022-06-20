import { AnyAction } from 'redux';
import { createReducer } from 'typesafe-actions';
import {
  clearState,
  CreatorsType,
  getDBImages,
  getRecentImages,
  getUserImages,
} from '../actions/actionCreators';

interface State {
  images: Array<string>;
  userImages: Array<string>;
  recentImages: Array<string>;
  loading: boolean;
  recentLoading: boolean;
  start: number;
}

const initialState = {
  images: [],
  recentImages: [],
  start: 0,
  loading: true,
  recentLoading: true,
  userImages: [],
};

const imgReducer = createReducer<State, CreatorsType>(initialState)
  .handleAction(getDBImages.request, (state: State) => ({
    ...state,
    loading: true,
    start: state.start + 5,
  }))
  .handleAction(getDBImages.success, (state: State, action: AnyAction) => ({
    ...state,
    loading: false,
    images: action.payload,
  }))
  .handleAction(getRecentImages.success, (state: State, action: AnyAction) => ({
    ...state,
    recentLoading: false,
    recentImages: action.payload,
  }))
  .handleAction(getUserImages.success, (state: State, action: AnyAction) => ({
    ...state,
    loading: false,
    userImages: action.payload,
  }))
  .handleAction(getUserImages.failure, (state: State) => ({
    ...state,
    loading: false,
  }))
  .handleAction(clearState, () => ({
    images: [],
    recentImages: [],
    start: 0,
    loading: true,
    recentLoading: true,
    userImages: [],
  }));

export default imgReducer;
