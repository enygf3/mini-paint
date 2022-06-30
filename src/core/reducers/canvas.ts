import { AnyAction } from 'redux';
import { createReducer } from 'typesafe-actions';
import { deleteImg, getImage } from '../actions/canvas';
import { CanvasState } from '../interfaces/canvas';
import { CanvasType } from '../actions/canvas';

const initialState: CanvasState = {
  canvas: null,
};

const canvas = createReducer<CanvasState, CanvasType>(initialState)
  .handleAction(getImage.request, (state: CanvasState, action: AnyAction) => ({
    ...state,
    canvas: action.payload.canvas,
  }))
  .handleAction(deleteImg, (state: CanvasState) => ({
    ...state,
    canvas: null,
  }))
  .handleAction(getImage.success, (state: CanvasState, action: AnyAction) => ({
    ...state,
    canvas: action.payload.canvas,
  }))
  .handleAction(getImage.failure, (state: CanvasState) => ({
    ...state,
    canvas: null,
  }));

export default canvas;
