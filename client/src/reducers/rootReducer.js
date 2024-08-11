//this file combines both reducers into one reducer called root, which is then used in universal store.js file

import {combineReducers} from "@reduxjs/toolkit"

import questionReducer from '../features/questionReducer';
import resultReducer from '../features/resultReducer';

export const rootReducer = combineReducers({
    question: questionReducer,
    result: resultReducer,
});
