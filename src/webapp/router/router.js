import React from 'react';
import { Provider } from 'react-redux';
import {  
  Route,
  Switch,
  Redirect
} from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { Calendar } from 'pages/calendar';
import { Login } from 'pages/login';
import { NotFoundPage } from 'pages/not-found';

export const Root = ({ store, history }) => (
  <Provider store={ store }>
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Redirect exact from='/' to='/login' />
          <Route path='/login' component={ Login } />
          <Route path='/calendar' component={ Calendar } />
          <Route component={ NotFoundPage } />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>
)

// export const Root = ({ store, history }) => (
//   <Provider store={ store }>
//     <Router history={ history }>
//       <Switch>
//         <Redirect exact from='/' to='/login' />
//         <Route path='/login' component={ Login } />
//         <Route path='/calendar' component={ Calendar } />
//         <Route component={ NotFoundPage } />
//       </Switch>
//     </Router>
//   </Provider>
// )
