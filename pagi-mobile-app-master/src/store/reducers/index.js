import { combineReducers } from 'redux';
import Other from './other';
import User from './user';

export default combineReducers({ user: User, other: Other });
