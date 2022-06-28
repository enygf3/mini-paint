import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';

export enum CanvasTemplates {
  SaveImg = 'SAVE_IMG',
  SaveImgFailed = 'SAVE_IMG_FAILED',
  GetImageData = 'GET_IMAGE_DATA',
  DeleteImageData = 'DELETE_IMAGE_DATA',
  SetPenWidth = 'SET_PEN_WIDTH',
  SetPenColor = 'SET_PEN_COLOR',
  SetShape = 'SET_SHAPE',
  Erase = 'ERASE',
}

export const getImage = createAsyncAction(
  CanvasTemplates.GetImageData,
  CanvasTemplates.SaveImg,
  CanvasTemplates.SaveImgFailed
)<{ payload: string }>();

export const deleteImg = createAction(CanvasTemplates.DeleteImageData)();
export const setPenWidth = createAction(CanvasTemplates.SetPenWidth)<{
  width: number;
}>();
export const setPenColor = createAction(CanvasTemplates.SetPenColor)<{
  color: string;
}>();
export const setShape = createAction(CanvasTemplates.SetShape)<{
  shape: string;
}>();
export const erase = createAction(CanvasTemplates.Erase as string)<void>();

export type CanvasType = ActionType<
  | typeof deleteImg
  | typeof setPenWidth
  | typeof setPenColor
  | typeof setShape
  | typeof erase
  | typeof getImage
>;
