import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import App from './App.js';
import KanbanPage from './components/KanbanPage';
import NewCard from './components/NewCard';
import NoMatch from './components/static/NoMatch';

const reducer = combineReducers(reducers);
const store = createStore(reducer);
const initialState = store.getState();

ReactDOM.render(
  <Provider store = { store }>
    <Router history= {hashHistory}>
      <Route path='/' component={ App } >
        <IndexRoute component={ KanbanPage } />
        <Route path='/new' component={ NewCard } />
        <Route path='/*' component={ NoMatch } />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
