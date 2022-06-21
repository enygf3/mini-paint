import { takeEvery, put } from '@redux-saga/core/effects';
import { signInUser, signOutUser } from '../service/auth';
import { doAuth, doSignOut } from '../actions/auth';

export function* signInWorker(): Generator {
  const User: { user: object } = {
    user: {},
  };

  try {
    yield signInUser().then((user) => {
      User.user = user;
    });
    yield put(doAuth.success({ payload: User.user }, null));
  } catch (error) {
    console.log('authsaga', error);
    yield put(doAuth.failure(null, null));
  }
}

export function* signOutWorker(): Generator {
  try {
    yield signOutUser();
    yield put(doSignOut.success(null, null));
  } catch (error) {
    console.log(error);
    yield put(doSignOut.failure(null, null));
  }
}

export default function* auth(): Generator {
  yield takeEvery(doAuth.request, signInWorker);
  yield takeEvery(doSignOut.request, signOutWorker);
}
