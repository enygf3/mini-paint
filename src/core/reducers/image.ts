import { AnyAction } from 'redux';
import { createReducer } from 'typesafe-actions';
import {
  clearStateAction,
  getDBImagesAction,
  getProfileImagesAction,
  getRecentImagesAction,
  getUserImagesAction,
  ImagesType,
} from '../actions/images';
import { ImageState } from '../interfaces/image';

const initialState: ImageState = {
  images: [],
  recentImages: [],
  start: 0,
  loading: true,
  recentLoading: true,
  userImages: [],
};

export const image = createReducer<ImageState, ImagesType>(initialState)
  .handleAction(getDBImagesAction.request, (state: ImageState) => ({
    ...state,
    loading: true,
    start: state.start + 5,
  }))
  .handleAction(getProfileImagesAction.request, (state: ImageState) => ({
    ...state,
    loading: true,
    start: state.start + 5,
  }))
  .handleAction(
    getDBImagesAction.success,
    (state: ImageState, action: AnyAction) => ({
      ...state,
      loading: false,
      images: action.payload,
    })
  )
  .handleAction(
    getRecentImagesAction.success,
    (state: ImageState, action: AnyAction) => ({
      ...state,
      recentLoading: false,
      recentImages: action.payload,
    })
  )
  .handleAction(
    getUserImagesAction.success,
    (state: ImageState, action: AnyAction) => ({
      ...state,
      loading: false,
      userImages: action.payload,
    })
  )
  .handleAction(
    getProfileImagesAction.success,
    (state: ImageState, action: AnyAction) => ({
      ...state,
      loading: false,
      userImages: action.payload,
    })
  )
  .handleAction(getUserImagesAction.failure, (state: ImageState) => ({
    ...state,
    loading: false,
  }))
  .handleAction(getProfileImagesAction.failure, (state: ImageState) => ({
    ...state,
    loading: false,
  }))
  .handleAction(clearStateAction, () => ({
    images: [],
    recentImages: [],
    start: 0,
    loading: true,
    recentLoading: true,
    userImages: [],
  }));

export default image;
