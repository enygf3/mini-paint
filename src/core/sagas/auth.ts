import { takeEvery, put } from '@redux-saga/core/effects';
import { toast } from 'react-hot-toast';
import { signInUser, signOutUser } from '../service/auth';
import { doAuthAction, doSignOutAction } from '../actions/auth';

export function* signInWorker(): Generator {
  const User: { user: object } = {
    user: {},
  };

  try {
    yield signInUser().then((user) => {
      User.user = user;
    });
    yield put(doAuthAction.success({ payload: User.user }, null));
  } catch (error) {
    yield toast.error('Something is went wrong. Please, try again');
    yield put(doAuthAction.failure(null, null));
  }
}

export function* signOutWorker(): Generator {
  try {
    yield signOutUser();
    yield put(doSignOutAction.success(null, null));
  } catch (error) {
    yield toast.error('Something is went wrong. Please, try again');
    yield put(doSignOutAction.failure(null, null));
  }
}

export default function* auth(): Generator {
  yield takeEvery(doAuthAction.request, signInWorker);
  yield takeEvery(doSignOutAction.request, signOutWorker);
}
