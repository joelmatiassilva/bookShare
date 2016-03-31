import {Map, List} from 'immutable';
import auth from './auth';
import myLibrary from './myLibrary';
import friends from './friends';
import explore from './explore';
import {combineReducers} from 'redux';
import {reducer as notifReducer} from 're-notif';

export default combineReducers({auth, friends, myLibrary, explore, notifs: notifReducer});
