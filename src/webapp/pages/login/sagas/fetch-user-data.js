import {
  all,
  call,
  put,
  takeEvery,
  fork
} from 'redux-saga/effects';
import { 
  fetchUserDataFailure,
  fetchUserDataSuccess
 } from 'actions';
import { FETCH_USER_DATA_REQUEST } from 'constants';
import { push } from 'connected-react-router'

const getUserData = (payload) => {
  return fetch(
    '/api/user',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    }).then(response => response.json());
}

export function* fetchUserData({ payload }) {
  try {
    const userData = yield call(getUserData, payload);

    yield put(fetchUserDataSuccess(userData));
    yield put(push('/calendar'));
  } catch (error) {
    yield put(fetchUserDataFailure(error));
  }
}

function* watchFetchUserData() {
  yield takeEvery(FETCH_USER_DATA_REQUEST, fetchUserData);
}

export default function* () {
  yield all([
    fork(watchFetchUserData)
  ]);
}