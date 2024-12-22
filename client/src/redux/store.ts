import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import {
    changeSortingOrderReducer,
    toggleDarkModeReducer,
    toggleRepoSizeReducer,
    toggleShowTagReducer,
} from './reducers/index';

export interface RootState {
    isRepoSizeVisible: boolean;
    isDarkModeOn: boolean;
    isTagsVisible: boolean;
    sortingOrder: number;
}

const rootReducer = combineReducers({
    isRepoSizeVisible: toggleRepoSizeReducer,
    isDarkModeOn: toggleDarkModeReducer,
    isTagsVisible: toggleShowTagReducer,
    sortingOrder: changeSortingOrderReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export default store;
