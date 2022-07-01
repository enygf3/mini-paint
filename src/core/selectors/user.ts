import { createSelector } from 'reselect';
import { AuthState } from '../../pages/ProfilePage/types';

const userProfileState = (state: AuthState) => state.auth.user;
export const userProfileStateSelector = createSelector(
  userProfileState,
  (images) => images
);
