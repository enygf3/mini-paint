import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';

export enum CanvasTemplates {
  SAVE_IMG = 'SAVE_IMG',
  SAVE_IMG_FAILED = 'SAVE_IMG_FAILED',
  GET_IMAGE_DATA = 'GET_IMAGE_DATA',
  DELETE_IMAGE_DATA = 'DELETE_IMAGE_DATA',
  SET_PEN_WIDTH = 'SET_PEN_WIDTH',
  SET_PEN_COLOR = 'SET_PEN_COLOR',
  SET_SHAPE = 'SET_SHAPE',
  ERASE = 'ERASE',
}

export const getImage = createAsyncAction(
  CanvasTemplates.GET_IMAGE_DATA,
  CanvasTemplates.SAVE_IMG,
  CanvasTemplates.SAVE_IMG_FAILED
)<{ payload: string }>();

export const deleteImg = createAction(CanvasTemplates.DELETE_IMAGE_DATA)();
export const setPenWidth = createAction(CanvasTemplates.SET_PEN_WIDTH)<{
  width: number;
}>();
export const setPenColor = createAction(CanvasTemplates.SET_PEN_COLOR)<{
  color: string;
}>();
export const setShape = createAction(CanvasTemplates.SET_SHAPE)<{
  shape: string;
}>();
export const erase = createAction(CanvasTemplates.ERASE)<void>();

export type CanvasType = ActionType<
  | typeof deleteImg
  | typeof setPenWidth
  | typeof setPenColor
  | typeof setShape
  | typeof erase
  | typeof getImage
>;
