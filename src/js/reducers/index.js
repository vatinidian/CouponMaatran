import {combineReducers} from 'redux';
import dataStore from './dataStore';
import userPreference from './userPreference';

export default combineReducers({
    dataStore,
    userPreference
});