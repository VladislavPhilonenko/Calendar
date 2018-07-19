import { combineReducers } from 'redux';
import { userData } from './fetch-user-data';
import { routerReducer } from 'react-router-redux';

export const rootReducer = combineReducers({
  userData,
  routing: routerReducer
});
