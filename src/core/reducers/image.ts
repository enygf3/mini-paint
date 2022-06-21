import { AnyAction } from 'redux';
import { createReducer } from 'typesafe-actions';
import {
  clearState,
  CreatorsType,
  getDBImages,
  getRecentImages,
  getUserImages,
} from '../actions/actionCreators';
import { ImageState } from './types';

const initialState: ImageState = {
  images: [],
  recentImages: [],
  start: 0,
  loading: true,
  recentLoading: true,
  userImages: [],
};

const image = createReducer<ImageState, CreatorsType>(initialState)
  .handleAction(getDBImages.request, (state: ImageState) => ({
    ...state,
    loading: true,
    start: state.start + 5,
  }))
  .handleAction(
    getDBImages.success,
    (state: ImageState, action: AnyAction) => ({
      ...state,
      loading: false,
      images: action.payload,
    })
  )
  .handleAction(
    getRecentImages.success,
    (state: ImageState, action: AnyAction) => ({
      ...state,
      recentLoading: false,
      recentImages: action.payload,
    })
  )
  .handleAction(
    getUserImages.success,
    (state: ImageState, action: AnyAction) => ({
      ...state,
      loading: false,
      userImages: action.payload,
    })
  )
  .handleAction(getUserImages.failure, (state: ImageState) => ({
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

export default image;
