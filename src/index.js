import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'react-popper';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import history from './history';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers';
import { loadAllProducts } from './actions/products';
// import { createLogger } from 'redux-logger';

import Auth from './AuthService/Auth';

const middleware = [thunk];
if (process.env.NODE_ENV === 'development') {
  // middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));
Auth.checkAndInitializeLoginStatus(store.dispatch);
store.dispatch(loadAllProducts());
// store.dispatch(loadAllOrders());

const app = (
  <Router history={history}>
    <App />
  </Router>
);
ReactDOM.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'));
registerServiceWorker();
