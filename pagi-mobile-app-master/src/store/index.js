import { createStore, applyMiddleware } from 'redux';
import { thunk } from './middlewares/thunk';
import reducers from './reducers/index';

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
