import {Map, List} from 'immutable';
import auth from './auth';
import dashboard from './dashboard';
import {combineReducers} from 'redux';

export default combineReducers({auth, dashboard});
