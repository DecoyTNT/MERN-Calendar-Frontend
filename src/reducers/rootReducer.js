import { combineReducers } from "redux";
import { uiReducer } from './uiReducer';
import { calendarReducer } from './calendarReducer';

export const rootReducers = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer
    // TODO: AuthReducer
    // TODO: Calendarreducer
});