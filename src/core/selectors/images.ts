import { State } from '../../pages/NewPage/components/Canvas/types';
import { createSelector } from 'reselect';

const imagesState = (state: State) => state.images.images;
export const imagesStateSelector = createSelector(
  imagesState,
  (images) => images
);

const imagesRecentState = (state: State) => state.images.recentImages;
export const imagesRecentStateSelector = createSelector(
  imagesRecentState,
  (images) => images
);

const imagesUserState = (state: State) => state.images.userImages;
export const imagesUserStateSelector = createSelector(
  imagesUserState,
  (images) => images
);
