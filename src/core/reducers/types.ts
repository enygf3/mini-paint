export interface AuthState {
  isLoggedIn: boolean;
  user: object | null;
}

export interface EditorState {
  color: string;
  width: number;
  background: string;
  canvas: HTMLCanvasElement | null;
  shape: string;
  erase: boolean;
}

export interface ImageState {
  images: Array<string>;
  userImages: Array<string>;
  recentImages: Array<string>;
  loading: boolean;
  recentLoading: boolean;
  start: number;
}
