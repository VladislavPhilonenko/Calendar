import { 
  createStore, 
  applyMiddleware, 
  compose 
} from 'redux';
import { 
  connectRouter, 
  routerMiddleware 
} from 'connected-react-router';
import createSageMiddleware from 'redux-saga';
import { history } from './router/history';
import { rootReducer } from './reducers/reducers';
import { rootSaga } from './sagas';

const sagaMiddleware = createSageMiddleware();
const initialState = {};

export const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
    )
  )
);

window.store = store;
sagaMiddleware.run(rootSaga);
