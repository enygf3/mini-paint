import { AnyAction } from 'redux';
import { createReducer } from 'typesafe-actions';
import { deleteImgAction, getImageAction } from '../actions/canvas';
import { CanvasState } from '../interfaces/canvas';
import { CanvasType } from '../actions/canvas';

const initialState: CanvasState = {
  canvas: null,
};

const canvas = createReducer<CanvasState, CanvasType>(initialState)
  .handleAction(
    getImageAction.request,
    (state: CanvasState, action: AnyAction) => ({
      ...state,
      canvas: action.payload.canvas,
    })
  )
  .handleAction(deleteImgAction, (state: CanvasState) => ({
    ...state,
    canvas: null,
  }))
  .handleAction(
    getImageAction.success,
    (state: CanvasState, action: AnyAction) => ({
      ...state,
      canvas: action.payload.canvas,
    })
  )
  .handleAction(getImageAction.failure, (state: CanvasState) => ({
    ...state,
    canvas: null,
  }));

export default canvas;
