import { TOGGLE_DARK_MODE } from '../actions';

const darkModeInitialState = false;

const toggleDarkModeReducer = (
    initialState: boolean = darkModeInitialState,
    action: { type: string; payload: boolean }
) => {
    switch (action.type) {
        case TOGGLE_DARK_MODE:
            return !action.payload;

        default:
            return initialState;
    }
};

export { toggleDarkModeReducer };
