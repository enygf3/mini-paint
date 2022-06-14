import { Dispatch } from "react";

export interface existShapeTypes {
  shape: string;
}

export interface props {
  width: number;
  height: number;
  func: Dispatch<string>;
}
