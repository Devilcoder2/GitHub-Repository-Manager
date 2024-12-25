import { TOGGLE_SHOW_TAGS } from '../actions';

const showTagInitialState = true;

const toggleShowTagReducer = (
    initialState: boolean = showTagInitialState,
    action: { type: string; payload: boolean }
) => {
    switch (action.type) {
        case TOGGLE_SHOW_TAGS:
            return !action.payload;

        default:
            return initialState;
    }
};

export { toggleShowTagReducer };
