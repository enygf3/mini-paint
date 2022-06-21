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
import { EditorState } from './types';
import { CanvasType } from '../actions/canvas';

const initialState: EditorState = {
  color: '#000000',
  width: 1,
  background: '#ffffff',
  canvas: null,
  shape: '',
  erase: false,
};

const canvas = createReducer<EditorState, CanvasType>(initialState)
  .handleAction(getImage.request, (state: EditorState, action: AnyAction) => ({
    ...state,
    canvas: action.payload.canvas,
  }))
  .handleAction(deleteImg, (state: EditorState) => ({
    ...state,
    canvas: null,
  }))
  .handleAction(setPenWidth, (state: EditorState, action: AnyAction) => ({
    ...state,
    width: action.payload.width,
  }))
  .handleAction(setPenColor, (state: EditorState, action: AnyAction) => ({
    ...state,
    color: action.payload.color,
  }))
  .handleAction(setShape, (state: EditorState, action: AnyAction) => ({
    ...state,
    shape: action.payload.shape,
  }))
  .handleAction(erase, (state: EditorState, action: AnyAction) => ({
    ...state,
    erase: action.payload.erase,
  }))
  .handleAction(getImage.success, (state: EditorState, action: AnyAction) => ({
    ...state,
    canvas: action.payload.canvas,
  }))
  .handleAction(getImage.failure, (state: EditorState) => ({
    ...state,
    canvas: null,
  }));

export default canvas;
