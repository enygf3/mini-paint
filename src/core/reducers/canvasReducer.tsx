import { AnyAction } from "redux";
import { createReducer } from "typesafe-actions";
import {
  CreatorsType,
  deleteImg,
  erase,
  getImage,
  saveImg,
  saveImgFailed,
  setPenColor,
  setPenWidth,
  setShape,
} from "../actions/actionCreators";

export interface EditorState {
  color: string;
  width: number;
  background: string;
  canvas: HTMLCanvasElement | null;
  shape: string;
  erase: boolean;
}

const initialState: EditorState = {
  color: "#000000",
  width: 1,
  background: "#ffffff",
  canvas: null,
  shape: "",
  erase: false,
};

const canvasReducer = createReducer<EditorState, CreatorsType>(initialState)
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
  .handleAction(saveImg, (state: EditorState, action: AnyAction) => ({
    ...state,
    canvas: action.payload.canvas,
  }))
  .handleAction(saveImgFailed, (state: EditorState) => ({
    ...state,
    canvas: null,
  }));

export default canvasReducer;
