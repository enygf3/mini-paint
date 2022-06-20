import { Dispatch } from 'react';

export interface Props {
  width: number;
  height: number;
  func: Dispatch<string>;
}

export interface State {
  canvas: {
    width: number;
    height: number;
    shape: string;
    canvas: string;
    erase: boolean;
    color: string;
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
  x1: number;
  y1: number;
  x2: number;
  y2: number;
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
