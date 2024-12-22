import { TOGGLE_REPO_SIZE } from '../actions';

const repoSizeInitialState = true;

const toggleRepoSizeReducer = (
    initialState: boolean = repoSizeInitialState,
    action: { type: string; payload: boolean }
) => {
    console.log('IN REDUCER', action.payload);
    switch (action.type) {
        case TOGGLE_REPO_SIZE:
            return !action.payload;

        default:
            return initialState;
    }
};

export { toggleRepoSizeReducer };
