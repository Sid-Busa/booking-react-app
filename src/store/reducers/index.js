import {combineReducers} from 'redux';
import flight from './flight.reducer';

const createReducer = (asyncReducers) =>
    combineReducers({
        flight,
        ...asyncReducers
    });

export default createReducer;