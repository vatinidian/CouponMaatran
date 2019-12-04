import {combineReducers} from 'redux';
import header from './header';
import userPreference from './userPreference';

export default combineReducers({
    header,
    userPreference
});