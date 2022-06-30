import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';

export enum CanvasTemplates {
  SaveImgSucceed = 'SAVE_IMG_SUCCEED',
  SaveImgFailed = 'SAVE_IMG_FAILED',
  SaveImg = 'SAVE_IMG',
  DeleteImageData = 'DELETE_IMAGE_DATA',
  SetPenWidth = 'SET_PEN_WIDTH',
  SetPenColor = 'SET_PEN_COLOR',
  SetShape = 'SET_SHAPE',
  Erase = 'ERASE',
}

export const getImage = createAsyncAction(
  CanvasTemplates.SaveImg,
  CanvasTemplates.SaveImgSucceed,
  CanvasTemplates.SaveImgFailed
)<{ payload: string }>();

export const deleteImg = createAction(CanvasTemplates.DeleteImageData)();

export type CanvasType = ActionType<typeof deleteImg | typeof getImage>;
