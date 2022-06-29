import { AnyAction } from 'redux';
import { createReducer } from 'typesafe-actions';
import {
  deleteImg,
  erase,
  getImage,
  setPenColor,
  setPenWidth,
  setShape,
} from '../actions/canvas';
import { CanvasState } from '../interfaces/canvas';
import { CanvasType } from '../actions/canvas';

const initialState: CanvasState = {
  color: '#000000',
  width: 1,
  background: '#ffffff',
  shape: '',
  erase: false,
};

const canvas = createReducer<CanvasState, CanvasType>(initialState)
  .handleAction(getImage.request, (state: CanvasState) => ({
    ...state,
  }))
  .handleAction(deleteImg, (state: CanvasState) => ({
    ...state,
  }))
  .handleAction(setPenWidth, (state: CanvasState, action: AnyAction) => ({
    ...state,
    width: action.payload.width,
  }))
  .handleAction(setPenColor, (state: CanvasState, action: AnyAction) => ({
    ...state,
    color: action.payload.color,
  }))
  .handleAction(setShape, (state: CanvasState, action: AnyAction) => ({
    ...state,
    shape: action.payload.shape,
  }))
  .handleAction(erase, (state: CanvasState, action: AnyAction) => ({
    ...state,
    erase: action.payload.erase,
  }))
  .handleAction(getImage.success, (state: CanvasState) => ({
    ...state,
  }))
  .handleAction(getImage.failure, (state: CanvasState) => ({
    ...state,
  }));

export default canvas;
