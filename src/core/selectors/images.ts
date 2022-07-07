import { State } from '../../pages/NewPage/components/Canvas/types';
import { createSelector } from 'reselect';

export const imagesStateSelector = createSelector(
  (state: State) => state.images.images,
  (images) => images
);

export const imagesRecentStateSelector = createSelector(
  (state: State) => state.images.recentImages,
  (images) => images
);

export const imagesUserStateSelector = createSelector(
  (state: State) => state.images.userImages,
  (images) => images
);
