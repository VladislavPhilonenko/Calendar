import {
  all,
  call,
  put,
  takeEvery,
  fork
} from 'redux-saga/effects';
import { 
  fetchUserDataByIdFailure,
  fetchUserDataByIdSuccess
 } from 'actions';
import { FETCH_USER_DATA_BY_ID_REQUEST } from 'constants';
import { push } from 'connected-react-router';

const getUserDataById = userId => 
  fetch(
    '/api/user-by-id',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId })
    })
  .then(response => response.json());

export function* fetchUserDataById({ payload }) {
  try {
    const userData = yield call(getUserDataById, payload);

    yield put(fetchUserDataByIdSuccess(userData));
    yield put(push('/calendar'));
  } catch (error) {
    yield put(fetchUserDataByIdFailure(error));
  }
}

function* watchFetchUserDataById() {
  yield takeEvery(FETCH_USER_DATA_BY_ID_REQUEST, fetchUserDataById);
}

export default function* () {
  yield all([
    fork(watchFetchUserDataById)
  ]);
}
