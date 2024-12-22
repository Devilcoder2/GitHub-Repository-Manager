import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import {
    toggleDarkModeReducer,
    toggleRepoSizeReducer,
    toggleShowTagReducer,
} from './reducers/index';

export interface RootState {
    isRepoSizeVisible: boolean;
    isDarkModeOn: boolean;
    isTagsVisible: boolean;
}

const rootReducer = combineReducers({
    isRepoSizeVisible: toggleRepoSizeReducer,
    isDarkModeOn: toggleDarkModeReducer,
    isTagsVisible: toggleShowTagReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export default store;
