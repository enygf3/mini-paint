import { createSelector } from 'reselect';
import { AuthState } from '../../pages/ProfilePage/types';

export const userProfileStateSelector = createSelector(
  (state: AuthState) => state.auth.user,
  (images) => images
);
