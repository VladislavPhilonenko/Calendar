import { 
  fork, 
  all 
} from 'redux-saga/effects';
import fetchUserData from 'pages/login/sagas/fetch-user-data';
import addUserTask from 'pages/calendar/sagas/add-user-task';
import deleteUserTask from 'pages/calendar/sagas/delete-user-task';


export function* rootSaga() {
  yield all([
    fork(fetchUserData),
    fork(addUserTask),
    fork(deleteUserTask)
  ]);
}
