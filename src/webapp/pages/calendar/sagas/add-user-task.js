import {
  all,
  call,
  put,
  takeEvery,
  fork
} from 'redux-saga/effects';
import { 
  addTaskFailure,
  addTaskSuccess
 } from 'actions';
import { ADD_TASK } from 'constants';

const addUserTask = payload => 
  fetch(
    '/api/add-task',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  .then(response => response.json());


export function* getUserTasks({ payload }) {
  try {
    const taskData = yield call(addUserTask, payload);
    const tasks = taskData.filter(item => item !== null);

    yield put(addTaskSuccess(tasks));
  } catch (error) {
    yield put(addTaskFailure(error));
  }
}

function* watchFetchUserData() {
  yield takeEvery(ADD_TASK, getUserTasks);
}

export default function* () {
  yield all([
    fork(watchFetchUserData)
  ]);
}
