import { Dispatch } from 'react';
import { CanvasType } from '../../types';

export interface Props {
  width: number;
  height: number;
  saveDataToState: Dispatch<string>;
  state: CanvasType;
}

export interface State {
  canvas: {
    canvas: string;
  };
  images: {
    images: Array<Images>;
    recentImages: Array<Images>;
    userImages: Array<Images>;
  };
}

export interface Shapes {
  shape: string;
  pos: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
}

export interface Position {
  x: number;
  y: number;
}

export interface Images {
  user: string;
  createdAt: number;
  data: string;
}

export enum ShapesEnum {
  CIRCLE = 'fa-circle',
  RECTANGLE = 'fa-square',
  LINE = 'fa-grip-lines',
}
