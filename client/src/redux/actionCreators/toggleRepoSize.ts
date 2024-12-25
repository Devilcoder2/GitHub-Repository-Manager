import { TOGGLE_REPO_SIZE } from '../actions';

const toggleRepoSize = (payload: boolean) => {
    return {
        type: TOGGLE_REPO_SIZE,
        payload,
    };
};

export { toggleRepoSize };
