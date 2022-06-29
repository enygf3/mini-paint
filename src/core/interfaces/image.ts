export interface ImageState {
  images: Array<string>;
  userImages: Array<string>;
  recentImages: Array<string>;
  loading: boolean;
  recentLoading: boolean;
  start: number;
}
