import {Map, List} from 'immutable';
import auth from './auth';
import dashboard from './dashboard';
import explore from './explore';
import {combineReducers} from 'redux';

export default combineReducers({auth, dashboard, explore});
