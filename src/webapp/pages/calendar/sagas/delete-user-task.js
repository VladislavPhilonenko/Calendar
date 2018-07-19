import {
  all,
  call,
  put,
  takeEvery,
  fork
} from 'redux-saga/effects';
import { 
  deleteTaskFailure,
  deleteTaskSuccess
 } from 'actions';
import { DELETE_TASK } from 'constants';

const deleteUserTask = payload => 
  fetch(
    '/api/delete-task',
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  .then(response => response.json());

export function* getUserTasks({ payload }) {
  try {
    const taskData = yield call(deleteUserTask, payload);
    const tasks = taskData.filter(item => item !== null);

    yield put(deleteTaskSuccess(tasks));
  } catch (error) {
    yield put(deleteTaskFailure(error));
  }
}

function* watchFetchUserData() {
  yield takeEvery(DELETE_TASK, getUserTasks);
}

export default function* () {
  yield all([
    fork(watchFetchUserData)
  ]);
}
