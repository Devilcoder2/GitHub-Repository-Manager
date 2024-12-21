import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { countReducer } from './reducers/index';
import { CountState } from './interfaces/index';

export interface RootState {
    count: CountState;
}

const rootReducer = combineReducers({
    count: countReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export default store;
