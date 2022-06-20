import { takeEvery, put, call, all } from '@redux-saga/core/effects';
import { signInUser, signOutUser } from '../service/firebaseAuth';
import { doAuth, doSignOut } from '../actions/actionCreators';

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

export function* signOutWatcher(): Generator {
  yield takeEvery(doSignOut.request, signOutWorker);
}

export function* signInWatcher(): Generator {
  yield takeEvery(doAuth.request, signInWorker);
}

export default function* authSaga(): Generator {
  yield all([call(signInWatcher), call(signOutWatcher)]);
}
