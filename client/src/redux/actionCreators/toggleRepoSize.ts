import { TOGGLE_REPO_SIZE } from '../actions';

const toggleRepoSize = (payload: boolean) => {
    console.log('IN ACTION CREATOR', payload);
    return {
        type: TOGGLE_REPO_SIZE,
        payload,
    };
};

export { toggleRepoSize };
