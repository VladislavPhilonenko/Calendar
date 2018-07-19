import { 
  fork, 
  all 
} from 'redux-saga/effects';
import fetchUserData from 'pages/login/sagas/fetch-user-data';
import addUserTask from 'pages/calendar/sagas/add-user-task';
import deleteUserTask from 'pages/calendar/sagas/delete-user-task';
import watchFetchUserDataById from 'pages/calendar/sagas/fetch-user-data-by-id';

export function* rootSaga() {
  yield all([
    fork(fetchUserData),
    fork(addUserTask),
    fork(deleteUserTask),
    fork(watchFetchUserDataById)
  ]);
}
